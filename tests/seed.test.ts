import { describe, it, expect } from "vitest";
import { validateCatalog } from "../prisma/seed";
import * as fs from "fs";
import * as path from "path";

describe("Catalog Seed Validation", () => {
  const validCatalog = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../prisma/seed/catalog.json"), "utf-8")
  );

  it("passes validation with the production gold flyer catalog", () => {
    expect(() => validateCatalog(validCatalog)).not.toThrow();
  });

  it("fails with a clear list of errors when a service has a deliberately zeroed price", () => {
    const invalidCatalog = JSON.parse(JSON.stringify(validCatalog));
    // Zero out eyebrow threading price
    invalidCatalog.services.threading[0][2] = 0;
    // Set lips threading price to negative
    invalidCatalog.services.threading[2][2] = -100;

    expect(() => validateCatalog(invalidCatalog)).toThrowError(
      /Catalog validation failed with 2 error\(s\):[\s\S]*thread-eyebrow[\s\S]*thread-lips/
    );
  });

  it("fails when a bundle discountPct exceeds 15%", () => {
    const invalidCatalog = JSON.parse(JSON.stringify(validCatalog));
    invalidCatalog.bundles[0].discountPct = 20;

    expect(() => validateCatalog(invalidCatalog)).toThrowError(
      /Bundle "express-glow" discountPct \(20%\) exceeds allowed range 0\.\.15%/
    );
  });

  it("fails when a bundle references an unknown service slug", () => {
    const invalidCatalog = JSON.parse(JSON.stringify(validCatalog));
    invalidCatalog.bundles[0].items.push("non-existent-service");

    expect(() => validateCatalog(invalidCatalog)).toThrowError(
      /Bundle "express-glow" references unknown service slug: "non-existent-service"/
    );
  });

  it("fails when an offer percentOff exceeds 15%", () => {
    const invalidCatalog = JSON.parse(JSON.stringify(validCatalog));
    invalidCatalog.offers.find((o: any) => o.code === "NEIGHBOR10").percentOff = 25;

    expect(() => validateCatalog(invalidCatalog)).toThrowError(
      /Offer "NEIGHBOR10" percentOff \(25%\) exceeds allowed range 0\.\.15%/
    );
  });

  it("fails when duplicate slugs exist", () => {
    const invalidCatalog = JSON.parse(JSON.stringify(validCatalog));
    invalidCatalog.services.threading.push([
      "thread-eyebrow",
      "Duplicate Brow",
      700,
      "",
    ]);

    expect(() => validateCatalog(invalidCatalog)).toThrowError(
      /Duplicate service slug: "thread-eyebrow"/
    );
  });
});
