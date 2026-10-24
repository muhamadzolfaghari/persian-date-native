import DateType from "../../types/DateType";
import FormatOptions from "../../types/FormatOptions";
import gregorianToPersian from "../gregorian/gregorianToPersian";
import { toWallClock } from "../common/zonedTime";

/**
 * Converts a Gregorian date to Persian date (year, month, day).
 *
 * @param value - Gregorian date as timestamp or Date object.
 * @param options - Formatting options including timeZone; the runtime's local zone when omitted.
 * @returns An object containing Persian year, month, and day.
 */
export const toPersianDate = (
  value: number | Date,
  { timeZone }: FormatOptions = {}
): DateType => {
  const time = typeof value === "number" ? value : value.getTime();
  if (isNaN(time)) {
    return { year: NaN, month: NaN, day: NaN };
  }

  try {
    // Pure integer conversion of the wall-clock date; zone offsets are cached per day.
    const { year, month, day } = toWallClock(time, timeZone);
    const [pYear, pMonth, pDay] = gregorianToPersian(year, month, day);
    return { year: pYear, month: pMonth, day: pDay };
  } catch {
    return { year: NaN, month: NaN, day: NaN };
  }
};
