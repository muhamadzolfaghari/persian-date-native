import dffDates from "../utils/common/diffDates";

describe("diffDates", () => {
  const start = Date.UTC(2024, 0, 31);
  const later = Date.UTC(2024, 2, 1);

  it("returns signed days by default", () => {
    expect(dffDates(later, start)).toBe(30);
    expect(dffDates(start, later)).toBe(-30);
  });

  it("uses the Gregorian calendar for months by default", () => {
    // Jan 31 + 1 month rolls over to Mar 2 (native Date semantics), so Mar 1 is not a full month yet.
    expect(dffDates(later, start, "months", undefined, "UTC")).toBe(0);
    expect(dffDates(Date.UTC(2024, 2, 2), start, "months", undefined, "UTC")).toBe(1);
  });

  it("throws for an unknown unit", () => {
    expect(() => dffDates(later, start, "decades" as never)).toThrow("Invalid unit");
  });
});
