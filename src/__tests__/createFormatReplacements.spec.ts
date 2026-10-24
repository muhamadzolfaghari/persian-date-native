import createFormatters from "../utils/formatters/createFormatters";
import createFormatReplacements from "../utils/formatters/createFormatReplacements";

describe("createFormatReplacements", () => {
  // 2023-03-31 16:30 in New York (Friday, 11 Farvardin 1402), independent of the runtime zone.
  const date = new Date(Date.UTC(2023, 2, 31, 20, 30));
  const formatters = createFormatters({
    timeZone: "America/New_York",
    calendar: "persian",
  });
  const replacements = createFormatReplacements(date.getTime(), formatters);

  it("should create replacements for the given", () => {
    expect(replacements.D).toBe("11");
  });

  it("should create replacements have correct day name", () => {
    expect(replacements.dddd).toBe("جمعه");
    expect(replacements.ddd).toBeDefined();
    expect(replacements.jMMMM).toBeDefined();
    expect(replacements.jMMM).toBeDefined();
  });

  it("should expose hh (padded 12-hour) token", () => {
    expect(replacements.hh).toMatch(/^\d{2}$/);
    expect(replacements.h).toBeDefined();
  });

  it("creates and reuses runtime-local formatters when no time zone is given", () => {
    const local = createFormatters({ calendar: "persian" });
    expect(createFormatters({ calendar: "persian" })).toBe(local);
    expect(local[0].resolvedOptions().timeZone).toBe(
      new Intl.DateTimeFormat().resolvedOptions().timeZone
    );
  });
});
