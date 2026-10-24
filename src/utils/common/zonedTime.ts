import TimeZone from "../../types/TimeZone";

/**
 * A Gregorian wall-clock reading: what a clock shows in a given time zone.
 * Months are 1-based.
 */
export interface WallClock {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const MILLISECONDS_PER_DAY = 86_400_000;
const MAX_CACHED_DAYS = 10_000;

const formatterCache = new Map<string, Intl.DateTimeFormat>();
// UTC offset in milliseconds per `${timeZone}|${utcDay}`, stored only for days
// with a single offset, so daylight saving transition days are always exact.
const offsetCache = new Map<string, number>();

function getFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = formatterCache.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    formatterCache.set(timeZone, formatter);
  }
  return formatter;
}

function toUtcWallClock(date: Date): WallClock {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    hours: date.getUTCHours(),
    minutes: date.getUTCMinutes(),
    seconds: date.getUTCSeconds(),
    milliseconds: date.getUTCMilliseconds(),
  };
}

function wallClockAsUtc(wallClock: WallClock): number {
  const date = new Date(0);
  date.setUTCFullYear(wallClock.year, wallClock.month - 1, wallClock.day);
  date.setUTCHours(
    wallClock.hours,
    wallClock.minutes,
    wallClock.seconds,
    wallClock.milliseconds
  );
  return date.getTime();
}

function readOffset(time: number, timeZone: string): number {
  const values: Record<string, number> = {};
  for (const part of getFormatter(timeZone).formatToParts(time)) {
    if (part.type !== "literal") values[part.type] = parseInt(part.value, 10);
  }
  const wallClock: WallClock = {
    year: values.year,
    month: values.month,
    day: values.day,
    hours: values.hour,
    minutes: values.minute,
    seconds: values.second,
    milliseconds: new Date(time).getUTCMilliseconds(),
  };
  return wallClockAsUtc(wallClock) - time;
}

/** UTC offset of `timeZone` at `time`, in milliseconds. */
function getOffset(time: number, timeZone: string): number {
  const utcDay = Math.floor(time / MILLISECONDS_PER_DAY);
  const key = `${timeZone}|${utcDay}`;
  const cached = offsetCache.get(key);
  if (cached !== undefined) return cached;

  const offset = readOffset(time, timeZone);
  const dayStart = utcDay * MILLISECONDS_PER_DAY;
  if (
    readOffset(dayStart, timeZone) === offset &&
    readOffset(dayStart + MILLISECONDS_PER_DAY - 1, timeZone) === offset
  ) {
    if (offsetCache.size >= MAX_CACHED_DAYS) offsetCache.clear();
    offsetCache.set(key, offset);
  }
  return offset;
}

/**
 * Reads the wall clock of `time` in `timeZone`. Without a time zone the
 * runtime's local zone is used, matching native `Date` getters.
 */
export function toWallClock(time: number, timeZone?: TimeZone): WallClock {
  if (isNaN(time)) {
    return { year: NaN, month: NaN, day: NaN, hours: NaN, minutes: NaN, seconds: NaN, milliseconds: NaN };
  }
  if (!timeZone) {
    const date = new Date(time);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      milliseconds: date.getMilliseconds(),
    };
  }
  if (timeZone === "UTC") return toUtcWallClock(new Date(time));
  return toUtcWallClock(new Date(time + getOffset(time, timeZone)));
}

/**
 * Converts a wall-clock reading in `timeZone` to an epoch time. Out-of-range
 * fields roll over like native `Date` setters. Historical offsets such as
 * Iran's daylight saving time before 2022 are honored. Without a time zone
 * the runtime's local zone is used.
 */
export function fromWallClock(wallClock: WallClock, timeZone?: TimeZone): number {
  if (!timeZone) {
    const date = new Date(0);
    date.setFullYear(wallClock.year, wallClock.month - 1, wallClock.day);
    date.setHours(
      wallClock.hours,
      wallClock.minutes,
      wallClock.seconds,
      wallClock.milliseconds
    );
    return date.getTime();
  }

  const asUtc = wallClockAsUtc(wallClock);
  if (timeZone === "UTC") return asUtc;

  const firstGuess = asUtc - getOffset(asUtc, timeZone);
  return asUtc - getOffset(firstGuess, timeZone);
}

/** Day of week of a Gregorian date, 0 = Sunday … 6 = Saturday. */
export function getGregorianWeekday(year: number, month: number, day: number): number {
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  return date.getUTCDay();
}

/** Number of days in a Gregorian month (1-based). */
export function getGregorianMonthLength(year: number, month: number): number {
  const date = new Date(0);
  date.setUTCFullYear(year, month, 0);
  return date.getUTCDate();
}
