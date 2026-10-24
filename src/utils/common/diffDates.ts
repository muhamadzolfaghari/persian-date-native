import {
  MILLISECONDS_PER_DAY,
  MILLISECONDS_PER_HOUR,
  MILLISECONDS_PER_MINUTE,
  MILLISECONDS_PER_SECOND,
} from "../../constants/timeConstants";
import Calendar from "../../types/Calendar";
import DateUint from "../../types/DateUnit";
import TimeZone from "../../types/TimeZone";
import gregorianToPersian from "../gregorian/gregorianToPersian";
import modifyTime from "./modifyTime";
import { toWallClock } from "./zonedTime";

function calendarMonthIndex(time: number, calendar: Calendar, timeZone?: TimeZone): number {
  const { year, month, day } = toWallClock(time, timeZone);
  if (calendar === "persian") {
    const [pYear, pMonth] = gregorianToPersian(year, month, day);
    return pYear * 12 + pMonth;
  }
  return year * 12 + month;
}

/**
 * Completed calendar months from `time2` to `time1`, signed. A month is
 * complete when adding it to `time2` (with the same day clamping as `add`)
 * does not pass `time1`.
 */
function completedMonths(
  time1: number,
  time2: number,
  calendar: Calendar,
  timeZone?: TimeZone
): number {
  let months =
    calendarMonthIndex(time1, calendar, timeZone) -
    calendarMonthIndex(time2, calendar, timeZone);
  const shift = (count: number) => modifyTime(time2, count, "months", calendar, timeZone);
  // Gregorian steps roll over like native Date (Jan 31 + 1 month = Mar 2), so one
  // correction may not be enough; at most two are ever needed.
  while (months > 0 && shift(months) > time1) months -= 1;
  while (months < 0 && shift(months) < time1) months += 1;
  return months;
}

/**
 * Calculates the signed difference `time1 - time2` in the specified unit.
 * The result is positive when `time1` is later than `time2`.
 *
 * Seconds through weeks are exact (fractional) amounts. Months and years are
 * whole completed calendar periods, so a birthday counts as a full year.
 *
 * @param {number} time1 - The timestamp of the first date
 * @param {number} time2 - The timestamp of the second date
 * @param {DateUint} unit - The unit for the difference calculation ("seconds",
 * "minutes", "hours", "days", "weeks", "months", "years"). @default 'days'
 * @param {Calendar} [calendar="gregorian"] - Calendar for month and year differences.
 * @param {TimeZone} [timeZone] - Time zone for month and year differences; the runtime's local zone when omitted.
 * @returns {number} The difference between the dates in the specified unit.
 */
export default function dffDates(
  time1: number,
  time2: number,
  unit: DateUint = "days",
  calendar: Calendar = "gregorian",
  timeZone?: TimeZone
): number {
  const diffInMs = time1 - time2;

  const normalizedUnit = unit.endsWith("s")
    ? unit
    : (`${unit}s` as DateUint);

  switch (normalizedUnit) {
    case "seconds":
      return diffInMs / MILLISECONDS_PER_SECOND;
    case "minutes":
      return diffInMs / MILLISECONDS_PER_MINUTE;
    case "hours":
      return diffInMs / MILLISECONDS_PER_HOUR;
    case "days":
      return diffInMs / MILLISECONDS_PER_DAY;
    case "weeks":
      return diffInMs / (MILLISECONDS_PER_DAY * 7);
    case "months":
      return completedMonths(time1, time2, calendar, timeZone);
    case "years":
      return Math.trunc(completedMonths(time1, time2, calendar, timeZone) / 12);
    default:
      throw new Error("Invalid unit");
  }
}
