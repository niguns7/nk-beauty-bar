import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function handleAdminRequest(req: NextRequest, actionParam?: string) {
  const token = req.headers.get("x-admin-token");
  const expectedToken = process.env.ADMIN_TOKEN;

  if (!expectedToken || token !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const action = actionParam || body.action;

    let auditEntity = "unknown";
    let auditEntityId = "unknown";
    let auditField = "unknown";
    let auditOldValue: string | null = null;
    let auditNewValue = "";

    if (action === "update-service-price" || action === "service/price") {
      const { slug, listPriceCents } = body;
      if (!slug || typeof listPriceCents !== "number" || listPriceCents <= 0) {
        return NextResponse.json({ error: "Valid slug and positive listPriceCents required" }, { status: 400 });
      }

      const existing = await prisma.service.findUnique({ where: { slug } });
      if (!existing) {
        return NextResponse.json({ error: `Service not found: ${slug}` }, { status: 404 });
      }

      auditEntity = "service";
      auditEntityId = existing.id;
      auditField = "listPriceCents";
      auditOldValue = String(existing.listPriceCents);
      auditNewValue = String(listPriceCents);

      await prisma.service.update({
        where: { slug },
        data: { listPriceCents, priceVerified: true },
      });
    } else if (action === "toggle-active" || action === "service/toggle" || action === "toggle") {
      const { entity, slug, isActive } = body;
      const targetEntity = entity || "service";

      if (targetEntity === "service") {
        const existing = await prisma.service.findUnique({ where: { slug } });
        if (!existing) return NextResponse.json({ error: "Service not found" }, { status: 404 });
        auditEntity = "service";
        auditEntityId = existing.id;
        auditField = "isActive";
        auditOldValue = String(existing.isActive);
        auditNewValue = String(isActive);
        await prisma.service.update({ where: { slug }, data: { isActive } });
      } else if (targetEntity === "bundle") {
        const existing = await prisma.bundle.findUnique({ where: { slug } });
        if (!existing) return NextResponse.json({ error: "Bundle not found" }, { status: 404 });
        auditEntity = "bundle";
        auditEntityId = existing.id;
        auditField = "isActive";
        auditOldValue = String(existing.isActive);
        auditNewValue = String(isActive);
        await prisma.bundle.update({ where: { slug }, data: { isActive } });
      } else if (targetEntity === "offer") {
        const code = body.code || slug;
        const existing = await prisma.offer.findUnique({ where: { code } });
        if (!existing) return NextResponse.json({ error: "Offer not found" }, { status: 404 });
        auditEntity = "offer";
        auditEntityId = existing.id;
        auditField = "isActive";
        auditOldValue = String(existing.isActive);
        auditNewValue = String(isActive);
        await prisma.offer.update({ where: { code }, data: { isActive } });
      }
    } else if (action === "edit-bundle" || action === "bundle") {
      const { slug, discountPct, isActive, featured } = body;
      const existing = await prisma.bundle.findUnique({ where: { slug } });
      if (!existing) return NextResponse.json({ error: "Bundle not found" }, { status: 404 });

      auditEntity = "bundle";
      auditEntityId = existing.id;
      auditField = "config";
      auditOldValue = JSON.stringify({ discountPct: existing.discountPct, isActive: existing.isActive, featured: existing.featured });
      auditNewValue = JSON.stringify({ discountPct, isActive, featured });

      await prisma.bundle.update({
        where: { slug },
        data: {
          ...(typeof discountPct === "number" ? { discountPct } : {}),
          ...(typeof isActive === "boolean" ? { isActive } : {}),
          ...(typeof featured === "boolean" ? { featured } : {}),
        },
      });
    } else if (action === "edit-offer" || action === "offer") {
      const { code, percentOff, isActive } = body;
      const existing = await prisma.offer.findUnique({ where: { code } });
      if (!existing) return NextResponse.json({ error: "Offer not found" }, { status: 404 });

      auditEntity = "offer";
      auditEntityId = existing.id;
      auditField = "config";
      auditOldValue = JSON.stringify({ percentOff: existing.percentOff, isActive: existing.isActive });
      auditNewValue = JSON.stringify({ percentOff, isActive });

      await prisma.offer.update({
        where: { code },
        data: {
          ...(typeof percentOff === "number" ? { percentOff } : {}),
          ...(typeof isActive === "boolean" ? { isActive } : {}),
        },
      });
    } else {
      return NextResponse.json({ error: `Unknown admin action: ${action}` }, { status: 400 });
    }

    // Write audit record
    await prisma.priceAudit.create({
      data: {
        entity: auditEntity,
        entityId: auditEntityId,
        field: auditField,
        oldValue: auditOldValue,
        newValue: auditNewValue,
        changedBy: "admin",
      },
    });

    // Revalidate catalog cache
    try {
      (revalidateTag as any)("catalog", "max");
    } catch {
      // ignore outside request lifecycle
    }

    return NextResponse.json({ success: true, entity: auditEntity, entityId: auditEntityId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Admin update failed" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  context: { params?: Promise<{ action?: string[] }> }
) {
  let actionString: string | undefined;
  if (context?.params) {
    const resolved = await context.params;
    if (resolved?.action) {
      actionString = resolved.action.join("/");
    }
  }
  return handleAdminRequest(req, actionString);
}
