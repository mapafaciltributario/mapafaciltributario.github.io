import { describe, expect, it } from "vitest";
import { BONUSES, GUARANTEE_DAYS, PLANS, bonusTotal, savings, upgradeDiff, validDocument, validPhone } from "@/lib/plans";

describe("offers", () => {
  it("Plano Básico costs R$ 27,90 (from R$ 57,90)", () => {
    expect(PLANS.basico.price).toBe(27.9);
    expect(PLANS.basico.fromPrice).toBe(57.9);
    expect(savings(PLANS.basico)).toBe(30);
  });

  it("Plano Completo costs R$ 37,90 (from R$ 77,90)", () => {
    expect(PLANS.completo.price).toBe(37.9);
    expect(PLANS.completo.fromPrice).toBe(77.9);
    expect(savings(PLANS.completo)).toBe(40);
  });

  it("upgrading Básico to Completo costs R$ 10,00 more", () => {
    expect(upgradeDiff()).toBe(10);
  });

  it("8 bonuses worth R$ 264,70 in total, free with Plano Completo", () => {
    expect(BONUSES).toHaveLength(8);
    expect(bonusTotal()).toBe(264.7);
  });

  it("guarantee is 7 days", () => {
    expect(GUARANTEE_DAYS).toBe(7);
  });
});

describe("checkout validation", () => {
  it("accepts a valid CPF and CNPJ, rejects repeated digits", () => {
    expect(validDocument("529.982.247-25")).toBe(true);
    expect(validDocument("11.222.333/0001-81")).toBe(true);
    expect(validDocument("111.111.111-11")).toBe(false);
  });

  it("requires WhatsApp with DDD (10 or 11 digits)", () => {
    expect(validPhone("(11) 99999-9999")).toBe(true);
    expect(validPhone("99999-9999")).toBe(false);
  });
});
