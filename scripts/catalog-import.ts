import * as fs from "fs";
import * as path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CsvRow {
  slug: string;
  name: string;
  categorySlug: string;
  priceCents: number;
  discountable?: boolean;
  priceIsFrom?: boolean;
  durationMin?: number | null;
  vagaroServiceId?: string;
  vagaroUrl?: string;
}

function parseCsv(content: string): CsvRow[] {
  const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const rows: CsvRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    if (values.length < 3) continue;

    const rowObj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      rowObj[h] = values[idx] ?? "";
    });

    const slug = rowObj["slug"] || rowObj["id"] || "";
    const name = rowObj["name"] || rowObj["service"] || "";
    const categorySlug = rowObj["category"] || rowObj["categoryslug"] || "threading";

    let priceCents = 0;
    if (rowObj["pricecents"]) {
      priceCents = parseInt(rowObj["pricecents"], 10);
    } else if (rowObj["price"]) {
      const cleaned = rowObj["price"].replace(/[^\d.]/g, "");
      priceCents = Math.round(parseFloat(cleaned) * 100);
    }

    if (!slug || !name || isNaN(priceCents) || priceCents <= 0) {
      console.warn(`[SKIP] Invalid row ${i + 1}: slug="${slug}", name="${name}", price=${priceCents}`);
      continue;
    }

    const discountable =
      rowObj["discountable"] !== undefined
        ? rowObj["discountable"].toLowerCase() !== "false"
        : slug !== "thread-eyebrow";

    const priceIsFrom = rowObj["priceisfrom"]?.toLowerCase() === "true";
    const durationMin = rowObj["durationmin"] ? parseInt(rowObj["durationmin"], 10) : null;

    rows.push({
      slug,
      name,
      categorySlug,
      priceCents,
      discountable,
      priceIsFrom,
      durationMin,
      vagaroServiceId: rowObj["vagaroserviceid"] || undefined,
      vagaroUrl: rowObj["vagarourl"] || undefined,
    });
  }

  return rows;
}

export async function importCatalog(csvPath: string) {
  if (!fs.existsSync(csvPath)) {
    console.error(`File not found: ${csvPath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(csvPath, "utf-8");
  const rows = parseCsv(content);

  console.log(`Parsed ${rows.length} valid rows from ${path.basename(csvPath)}. Importing...`);

  let added = 0;
  let updated = 0;
  let diffs = 0;

  for (const row of rows) {
    // Ensure category exists
    let category = await prisma.serviceCategory.findUnique({
      where: { slug: row.categorySlug },
    });

    if (!category) {
      category = await prisma.serviceCategory.create({
        data: {
          slug: row.categorySlug,
          name: row.categorySlug.charAt(0).toUpperCase() + row.categorySlug.slice(1),
        },
      });
    }

    const existing = await prisma.service.findUnique({
      where: { slug: row.slug },
    });

    if (existing) {
      const priceDiff = existing.listPriceCents !== row.priceCents;
      if (priceDiff) {
        diffs++;
        console.log(
          `[PRICE DIFF] ${row.slug}: $${(existing.listPriceCents / 100).toFixed(2)} → $${(row.priceCents / 100).toFixed(2)}`
        );
        await prisma.priceAudit.create({
          data: {
            entity: "service",
            entityId: existing.id,
            field: "listPriceCents",
            oldValue: String(existing.listPriceCents),
            newValue: String(row.priceCents),
            changedBy: "csv-import",
          },
        });
      }

      await prisma.service.update({
        where: { slug: row.slug },
        data: {
          name: row.name,
          categoryId: category.id,
          listPriceCents: row.priceCents,
          discountable: row.discountable,
          priceIsFrom: row.priceIsFrom,
          durationMin: row.durationMin,
          vagaroServiceId: row.vagaroServiceId ?? existing.vagaroServiceId,
          vagaroUrl: row.vagaroUrl ?? existing.vagaroUrl,
          priceVerified: true,
        },
      });
      updated++;
    } else {
      const created = await prisma.service.create({
        data: {
          slug: row.slug,
          name: row.name,
          categoryId: category.id,
          listPriceCents: row.priceCents,
          discountable: row.discountable,
          priceIsFrom: row.priceIsFrom,
          durationMin: row.durationMin,
          vagaroServiceId: row.vagaroServiceId,
          vagaroUrl: row.vagaroUrl,
          isActive: true,
          priceVerified: true,
        },
      });

      await prisma.priceAudit.create({
        data: {
          entity: "service",
          entityId: created.id,
          field: "created",
          oldValue: null,
          newValue: String(row.priceCents),
          changedBy: "csv-import",
        },
      });

      console.log(`[NEW] Added service "${row.slug}" ($${(row.priceCents / 100).toFixed(2)})`);
      added++;
    }
  }

  console.log(
    `Import summary: ${rows.length} processed, ${added} added, ${updated} updated (${diffs} price changes audited).`
  );
}

if (require.main === module || process.argv[1]?.endsWith("catalog-import.ts")) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: npm run catalog:import -- <path-to-csv>");
    process.exit(1);
  }
  importCatalog(filePath)
    .catch((err) => {
      console.error(err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

