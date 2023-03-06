import { pounds, round } from "./numbers";

describe("round", () => {
  it("rounds a number to n decimal places", () => {
    expect(round(2.35, 0)).toBe(2);
    expect(round(2.35, 1)).toBe(2.4);
    expect(round(2.35, 2)).toBe(2.35);
    expect(round(2.35, 3)).toBe(2.35);
  });
});

describe("pounds", () => {
  it("parses a pounds currency string literal", () => {
    expect(pounds("£0.00")).toBe(0);
    expect(pounds("£1.00")).toBe(1);
    expect(pounds("£0.50")).toBe(0.5);
  });

  it("parses a number string literal", () => {
    expect(pounds("0")).toBe(0);
    expect(pounds("0.")).toBe(0);
    expect(pounds("0.0")).toBe(0);
    expect(pounds("1.5")).toBe(1.5);
    expect(pounds("0.5")).toBe(0.5);
    expect(pounds("0.50")).toBe(0.5);
  });

  it("parses a negative values", () => {
    expect(pounds("-0.50")).toBe(-0.5);
    expect(pounds("-£0.50")).toBe(-0.5);
  });
});
