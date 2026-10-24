import normalizeArguments from "../utils/common/normalizeArguments";

describe("normalizeArguments", () => {
  it("should read date strings as Asia/Tehran wall-clock time by default", () => {
    expect(new Date(normalizeArguments(["2023/01/01"])[0]).toISOString()).toBe(
      "2022-12-31T20:30:00.000Z"
    );
  });

  it("should read date strings in the configured time zone", () => {
    expect(
      new Date(normalizeArguments(["2023/01/01", { timeZone: "UTC" }])[0]).toISOString()
    ).toBe("2023-01-01T00:00:00.000Z");
  });

  it("should keep instants unchanged when a time zone is configured", () => {
    const instant = Date.UTC(2024, 7, 1, 21);
    expect(normalizeArguments([instant, { timeZone: "UTC" }])[0]).toBe(instant);
    expect(normalizeArguments([new Date(instant), { timeZone: "Europe/Istanbul" }])[0]).toBe(instant);
    expect(normalizeArguments(["2024-08-01T21:00:00Z", { timeZone: "Asia/Tehran" }])[0]).toBe(instant);
  });

  it("should return today date when date is not provided", () => {
    const result = normalizeArguments([]);
    const date = new Date(result[0]);
    const today = new Date();
    expect(date.getMonth()).toEqual(today.getMonth());
  });

  it("should return props with empty array and options", () => {
    const result = normalizeArguments([undefined]);
    const date = new Date(result[0]).toLocaleDateString();
    const today = new Date().toLocaleDateString();
    expect(date).toEqual(today);
  });
});
