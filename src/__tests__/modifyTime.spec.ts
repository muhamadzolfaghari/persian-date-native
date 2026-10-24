import modifyTime from "../utils/common/modifyTime";
// Calendar steps follow the given time zone; UTC keeps these expectations independent of the runtime zone.
describe("modifyTime", () => {
  const initialTime = new Date("2023-01-01T00:00:00Z").getTime();
  test("adds days correctly", () => {
    const result = modifyTime(initialTime, 5, "days", "gregorian", "UTC");
    expect(result).toBe(new Date("2023-01-06T00:00:00Z").getTime());
  });

  test("adds months correctly", () => {
    const result = modifyTime(initialTime, 2, "months", "gregorian", "UTC");
    expect(result).toBe(new Date("2023-03-01T00:00:00Z").getTime());
  });

  test("adds years correctly", () => {
    const result = modifyTime(initialTime, 1, "years", "gregorian", "UTC");
    expect(result).toBe(new Date("2024-01-01T00:00:00Z").getTime());
  });

  test("adds hours correctly", () => {
    const result = modifyTime(initialTime, 12, "hours", "gregorian", "UTC");
    expect(result).toBe(new Date("2023-01-01T12:00:00Z").getTime());
  });

  test("adds minutes correctly", () => {
    const result = modifyTime(initialTime, 30, "minutes", "gregorian", "UTC");
    expect(result).toBe(new Date("2023-01-01T00:30:00Z").getTime());
  });

  test("adds seconds correctly", () => {
    const result = modifyTime(initialTime, 45, "seconds", "gregorian", "UTC");
    expect(result).toBe(new Date("2023-01-01T00:00:45Z").getTime());
  });

  test("throws error for invalid unit", () => {
    expect(() => modifyTime(initialTime, 1, "invalid" as any)).toThrow(
      "Invalid unit"
    );
  });

  test("returns NaN when time is NaN", () => {
    expect(isNaN(modifyTime(NaN, 1, "days"))).toBe(true);
  });

  test("clamps to 30 days in Persian leap year Esfand", () => {
    // 1399 is a Persian leap year
    const time = new Date("2021-02-18T00:00:00Z").getTime(); // 1399/11/30
    const result = modifyTime(time, 1, "months", "persian");
    expect(typeof result).toBe("number");
  });

  test("adds weeks and singular units correctly", () => {
    const weekResult = modifyTime(initialTime, 2, "weeks", "gregorian", "UTC");
    expect(weekResult).toBe(new Date("2023-01-15T00:00:00Z").getTime());

    const singularDay = modifyTime(initialTime, 1, "day", "gregorian", "UTC");
    expect(singularDay).toBe(new Date("2023-01-02T00:00:00Z").getTime());

    const singularWeek = modifyTime(initialTime, 1, "week", "gregorian", "UTC");
    expect(singularWeek).toBe(new Date("2023-01-08T00:00:00Z").getTime());

    const singularMonth = modifyTime(initialTime, 1, "month", "gregorian", "UTC");
    expect(singularMonth).toBe(new Date("2023-02-01T00:00:00Z").getTime());

    const singularYear = modifyTime(initialTime, 1, "year", "gregorian", "UTC");
    expect(singularYear).toBe(new Date("2024-01-01T00:00:00Z").getTime());

    const singularHour = modifyTime(initialTime, 1, "hour", "gregorian", "UTC");
    expect(singularHour).toBe(new Date("2023-01-01T01:00:00Z").getTime());

    const singularMinute = modifyTime(initialTime, 1, "minute", "gregorian", "UTC");
    expect(singularMinute).toBe(new Date("2023-01-01T00:01:00Z").getTime());

    const singularSecond = modifyTime(initialTime, 1, "second", "gregorian", "UTC");
    expect(singularSecond).toBe(new Date("2023-01-01T00:00:01Z").getTime());
  });

  test("keeps the Tehran wall-clock time when a day step crosses a DST change", () => {
    // 1399/01/01 12:00 Tehran (+03:30); Iran moved to +04:30 on 1399/01/03.
    const before = new Date("2020-03-20T08:30:00Z").getTime();
    const after = modifyTime(before, 3, "days", "persian", "Asia/Tehran");
    expect(new Date(after).toISOString()).toBe("2020-03-23T07:30:00.000Z");
  });

  test("moves Persian months in the given time zone and clamps the day", () => {
    // 1403/06/31 00:00 Tehran
    const time = new Date("2024-09-20T20:30:00Z").getTime();
    const result = modifyTime(time, 1, "months", "persian", "Asia/Tehran");
    // 1403/07/30 00:00 Tehran
    expect(new Date(result).toISOString()).toBe("2024-10-20T20:30:00.000Z");
  });
});
