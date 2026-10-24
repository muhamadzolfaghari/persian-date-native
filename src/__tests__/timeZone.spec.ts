import PersianDate from "../PersianDate";
import { persianDate } from "../index";

// Every expectation here must hold under any runtime time zone (try TZ=UTC npx jest).
// 2024-08-01T21:00:00Z is 1403/05/12 00:30 in Asia/Tehran.
const INSTANT = "2024-08-01T21:00:00Z";

describe("default Asia/Tehran time zone", () => {
  it("formats in Asia/Tehran when no time zone is given", () => {
    expect(persianDate(INSTANT).format("YYYY-MM-DD HH:mm")).toBe("1403-05-12 00:30");
  });

  it("reads Jalali and Gregorian date strings as Asia/Tehran wall-clock time", () => {
    expect(persianDate("1403-05-12").toISOString()).toBe("2024-08-01T20:30:00.000Z");
    expect(persianDate("1403-05-12 14:30").toISOString()).toBe("2024-08-02T11:00:00.000Z");
    expect(persianDate(1403, 5, 12).toISOString()).toBe("2024-08-01T20:30:00.000Z");
  });

  it("honors Iran's historical daylight saving offset", () => {
    expect(persianDate("1399-03-13 00:15").toISOString()).toBe("2020-06-01T19:45:00.000Z");
  });

  it("returns wall-clock getters in Asia/Tehran", () => {
    const date = persianDate(INSTANT);
    expect(date.toArray()).toEqual([1403, 5, 12, 0, 30, 0, 0]);
    expect(date.getDay()).toBe(5);
    expect(date.getDayOfWeek()).toBe(6);
    expect(date.isWeekend()).toBe(true);
  });

  it("returns Gregorian getters in Asia/Tehran for the gregorian calendar", () => {
    const date = persianDate(INSTANT, { calendar: "gregorian" });
    expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([2024, 8, 2]);
    expect(date.daysInMonth()).toBe(31);
  });
});

describe("timeZone option", () => {
  it("formats an instant in the given zone without shifting it", () => {
    for (const [timeZone, expected] of [
      ["UTC", "1403-05-11 21:00"],
      ["Europe/Istanbul", "1403-05-12 00:00"],
      ["Asia/Dubai", "1403-05-12 01:00"],
    ]) {
      const date = persianDate(INSTANT, { timeZone });
      expect(date.toISOString()).toBe("2024-08-01T21:00:00.000Z");
      expect(date.format("YYYY-MM-DD HH:mm")).toBe(expected);
    }
  });

  it("reads wall-clock input in the given zone", () => {
    expect(persianDate("1403-05-12", { timeZone: "UTC" }).toISOString()).toBe(
      "2024-08-02T00:00:00.000Z"
    );
  });

  it("keeps the same result as setTimeZone", () => {
    const date = persianDate(INSTANT);
    date.setTimeZone("UTC");
    expect(date.format("HH:mm")).toBe(persianDate(INSTANT, { timeZone: "UTC" }).format("HH:mm"));
  });
});

describe("calendar boundaries in the instance's time zone", () => {
  it("starts and ends days at Asia/Tehran midnight", () => {
    expect(persianDate("1403-05-12 15:00").startOf("day").toISOString()).toBe(
      "2024-08-01T20:30:00.000Z"
    );
    expect(persianDate("1403-05-12 08:00").endOf("day").toISOString()).toBe(
      "2024-08-02T20:29:59.999Z"
    );
  });

  it("starts weeks on Saturday and ends them on Friday", () => {
    expect(persianDate("1403-06-14 15:00").startOf("week").format("dddd YYYY-MM-DD HH:mm")).toBe(
      "شنبه 1403-06-10 00:00"
    );
    expect(persianDate("1403-06-14 15:00").endOf("week").format("dddd YYYY-MM-DD HH:mm:ss")).toBe(
      "جمعه 1403-06-16 23:59:59"
    );
  });

  it("ends Persian months and years on their last day", () => {
    expect(persianDate("1403-12-05").endOf("month").format("YYYY-MM-DD HH:mm:ss")).toBe(
      "1403-12-30 23:59:59"
    );
    expect(persianDate("1404-05-05").endOf("year").format("YYYY-MM-DD")).toBe("1404-12-29");
    expect(persianDate("1403-07-15").startOf("year").toISOString()).toBe(
      "2024-03-19T20:30:00.000Z"
    );
  });

  it("sets wall-clock time fields in the instance's time zone", () => {
    const date = persianDate("1403-05-12 15:00");
    date.setHours(9, 15);
    expect(date.format("YYYY-MM-DD HH:mm")).toBe("1403-05-12 09:15");
    date.setDate(31);
    expect(date.format("YYYY-MM-DD HH:mm")).toBe("1403-05-31 09:15");
  });

  it("keeps the Asia/Tehran wall-clock time when adding days across a DST change", () => {
    const date = persianDate("1399-01-01 12:00").add(3, "days");
    expect(date.format("YYYY-MM-DD HH:mm")).toBe("1399-01-04 12:00");
    expect(date.toISOString()).toBe("2020-03-23T07:30:00.000Z");
  });
});

describe("gregorian calendar in the instance's time zone", () => {
  const options = { calendar: "gregorian" as const };

  it("starts and ends Gregorian months and years at Asia/Tehran midnight", () => {
    expect(persianDate(INSTANT, options).startOf("year").toISOString()).toBe(
      "2023-12-31T20:30:00.000Z"
    );
    expect(persianDate(INSTANT, options).startOf("month").toISOString()).toBe(
      "2024-07-31T20:30:00.000Z"
    );
    expect(persianDate(INSTANT, options).endOf("month").toISOString()).toBe(
      "2024-08-31T20:29:59.999Z"
    );
  });

  it("counts completed Gregorian months in both directions", () => {
    expect(persianDate("2024-04-30", options).diff("2024-03-31", "months")).toBe(0);
    expect(persianDate("2024-05-01", options).diff("2024-03-31", "months")).toBe(1);
    expect(persianDate("2024-01-15", options).diff("2024-03-10", "months")).toBe(-1);
    expect(persianDate("2025-03-10", options).diff("2024-03-10", "years")).toBe(1);
  });
});

describe("parsing and validation", () => {
  it("parses Persian and Arabic-Indic digits", () => {
    expect(persianDate("۱۴۰۳/۰۵/۱۲").format("YYYY-MM-DD")).toBe("1403-05-12");
    expect(persianDate("١٤٠٣/٠٥/١٢").format("YYYY-MM-DD")).toBe("1403-05-12");
  });

  it.each([
    ["1404-12-30", "30 Esfand in a non-leap year"],
    ["1403-07-31", "31 Mehr"],
    ["2024-02-30", "an impossible Gregorian day"],
    ["1403-05-12 24:00", "hour 24"],
    ["abc", "text"],
    ["", "an empty string"],
  ])("marks %s (%s) as invalid instead of rolling over", (input) => {
    const date = persianDate(input);
    expect(date.isValid()).toBe(false);
    expect(date.format()).toBe("Invalid Date");
    expect(() => new PersianDate(input, { invalidDateSeverity: "error" })).toThrow("Invalid date");
  });

  it("marks valid input as valid", () => {
    expect(persianDate("1403-12-30").isValid()).toBe(true);
    expect(persianDate("2024-02-29").isValid()).toBe(true);
    expect(persianDate(INSTANT).isValid()).toBe(true);
  });

  it("throws for invalid instants when invalidDateSeverity is error", () => {
    expect(() => new PersianDate(NaN, { invalidDateSeverity: "error" })).toThrow("Invalid date");
    expect(() => new PersianDate(new Date("x"), { invalidDateSeverity: "error" })).toThrow(
      "Invalid date"
    );
    expect(() => new PersianDate("2024-13-01T00:00:00Z", { invalidDateSeverity: "error" })).toThrow(
      "Invalid date"
    );
  });

  it("returns NaN getters for invalid dates instead of throwing", () => {
    const date = persianDate("abc");
    expect(date.getHours()).toBeNaN();
    expect(date.getDayOfWeek()).toBeNaN();
  });
});
