import Calendar from "../../types/Calendar";
import DateUint from "../../types/DateUnit";
import TimeZone from "../../types/TimeZone";
import { PERSIAN_MONTHS_DAYS } from "../../constants/persianCalendar";
import {
  MILLISECONDS_PER_HOUR,
  MILLISECONDS_PER_MINUTE,
  MILLISECONDS_PER_SECOND,
} from "../../constants/timeConstants";
import isPersianLeapYear from "../persian/isPersianLeapYear";
import gregorianToPersian from "../gregorian/gregorianToPersian";
import persianToGregorian from "../gregorian/persianToGregorian";
import { fromWallClock, toWallClock, WallClock } from "./zonedTime";

const EXACT_UNIT_MILLISECONDS: Partial<Record<DateUint, number>> = {
  hours: MILLISECONDS_PER_HOUR,
  minutes: MILLISECONDS_PER_MINUTE,
  seconds: MILLISECONDS_PER_SECOND,
};

function addPersianMonths(wallClock: WallClock, months: number): WallClock {
  const [year, month, day] = gregorianToPersian(
    wallClock.year,
    wallClock.month,
    wallClock.day
  );
  const totalMonths = year * 12 + (month - 1) + months;
  const newYear = Math.floor(totalMonths / 12);
  const newMonth = (((totalMonths % 12) + 12) % 12) + 1;

  let maxDays = PERSIAN_MONTHS_DAYS[newMonth - 1];
  if (newMonth === 12 && isPersianLeapYear(newYear)) {
    maxDays = 30;
  }
  const [gYear, gMonth, gDay] = persianToGregorian(
    newYear,
    newMonth,
    Math.min(day, maxDays)
  );
  return { ...wallClock, year: gYear, month: gMonth, day: gDay };
}

function addGregorianMonths(wallClock: WallClock, months: number): WallClock {
  // Native Date semantics: Jan 31 + 1 month rolls over into March.
  return { ...wallClock, month: wallClock.month + months };
}

/**
 * Modifies a given timestamp by adding a specified value in the given time unit.
 *
 * Hours, minutes, and seconds move by exact milliseconds. Days, weeks, months,
 * and years move on the calendar in `timeZone` and keep the wall-clock time,
 * so adding a day across a daylight saving change keeps the same clock time.
 * Persian month and year steps clamp the day to the target month's length.
 *
 * @param {number} time - The timestamp (in milliseconds) to be modified.
 * @param {number} value - The amount to add in the specified time unit.
 * @param {DateUint} unit - The unit of time for modification.
 * @param {Calendar} [calendar="gregorian"] - The calendar system to use.
 * @param {TimeZone} [timeZone] - The time zone of the calendar; the runtime's local zone when omitted.
 * @returns {number} The new timestamp (in milliseconds) after modification.
 */
export default function modifyTime(
  time: number,
  value: number,
  unit: DateUint,
  calendar: Calendar = "gregorian",
  timeZone?: TimeZone
): number {
  if (isNaN(time)) return NaN;

  const normalizedUnit = unit.endsWith("s")
    ? unit
    : (`${unit}s` as DateUint);

  const exactMilliseconds = EXACT_UNIT_MILLISECONDS[normalizedUnit];
  if (exactMilliseconds) {
    return time + value * exactMilliseconds;
  }

  const wallClock = toWallClock(time, timeZone);
  const isPersian = calendar === "persian";
  let target: WallClock;

  switch (normalizedUnit) {
    case "days":
      target = { ...wallClock, day: wallClock.day + value };
      break;
    case "weeks":
      target = { ...wallClock, day: wallClock.day + value * 7 };
      break;
    case "months":
      target = isPersian
        ? addPersianMonths(wallClock, value)
        : addGregorianMonths(wallClock, value);
      break;
    case "years":
      target = isPersian
        ? addPersianMonths(wallClock, value * 12)
        : { ...wallClock, year: wallClock.year + value };
      break;
    default:
      throw new Error("Invalid unit");
  }

  return fromWallClock(target, timeZone);
}
