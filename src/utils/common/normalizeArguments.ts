import Calendar from "../../types/Calendar";
import DateValue from "../../types/DateValue";
import FormatOptions from "../../types/FormatOptions";
import InvalidDateSeverity from "../../types/InvalidDateSeverity";
import Options from "../../types/Options";
import PersianDateOptions from "../../types/PersianDateOptions";
import persianToGregorian from "../gregorian/persianToGregorian";
import createFormatOptions from "../options/createFormatOptions";
import createOptions from "../options/createOptions";
import isValidPersian, { isPersianYear } from "../persian/isValidPersian";
import replacePersianNumbers from "../persian/replacePersianNumbers";
import { fromWallClock, getGregorianMonthLength, WallClock } from "./zonedTime";

type NormalizeArguments = [
  time: number,
  options: Options,
  formatOptions: FormatOptions
];

/** A parsed input: either an exact instant or a wall-clock reading to place in the time zone. */
type ParsedDate = { time: number } | { wallClock: WallClock } | undefined;

const toIntegerArray = (values: (string | number)[]) =>
  values.map((value) => (typeof value === "number" ? value : parseInt(String(value), 10)));

function extractDateParts(arg: string): number[] | null {
  const result = arg.match(/(\d+)/g);
  return result ? toIntegerArray(result) : null;
}

type ExtractArguments = [
  newArguments: DateValue[],
  options: Options,
  formatOptions: FormatOptions
];

// Main function to extract options and clean arguments
function extractArguments(args: (DateValue | object)[]): ExtractArguments {
  const newArguments: DateValue[] = [];
  let persianDateOptions: PersianDateOptions | undefined;

  if (args.length > 8) {
    throw new Error("Invalid number of arguments");
  }

  for (const arg of args) {
    if (isOptions(arg)) {
      persianDateOptions = arg as PersianDateOptions;
      break;
    }
    newArguments.push(arg);
  }

  const options = createOptions(persianDateOptions);
  const formatOptions = createFormatOptions(persianDateOptions);

  return [newArguments, options, formatOptions];
}

function isValidGregorian(year: number, month: number, day: number): boolean {
  return (
    Number.isInteger(year) &&
    Number.isInteger(month) &&
    Number.isInteger(day) &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= getGregorianMonthLength(year, month)
  );
}

function isValidTime(timeParts: number[]): boolean {
  const [hours = 0, minutes = 0, seconds = 0, milliseconds = 0] = timeParts;
  return hours <= 23 && minutes <= 59 && seconds <= 59 && milliseconds <= 999;
}

function toWallClockParts(
  [year, month, day]: [number, number, number],
  timeParts: number[]
): WallClock {
  const [hours = 0, minutes = 0, seconds = 0, milliseconds = 0] = timeParts;
  return { year, month, day, hours, minutes, seconds, milliseconds };
}

function invalid(invalidDateSeverity: InvalidDateSeverity): undefined {
  if (invalidDateSeverity === "error") {
    throw new Error("Invalid date");
  }
  return undefined;
}

function fromPersianParts(
  [year, month, day]: number[],
  timeParts: number[],
  invalidDateSeverity: InvalidDateSeverity
): ParsedDate {
  if (!isValidPersian(year, month, day) || !isValidTime(timeParts)) {
    return invalid(invalidDateSeverity);
  }
  return { wallClock: toWallClockParts(persianToGregorian(year, month, day), timeParts) };
}

function fromGregorianParts(
  [year, month, day]: number[],
  timeParts: number[],
  invalidDateSeverity: InvalidDateSeverity
): ParsedDate {
  if (!isValidGregorian(year, month, day) || !isValidTime(timeParts)) {
    return invalid(invalidDateSeverity);
  }
  return { wallClock: toWallClockParts([year, month, day], timeParts) };
}

function parseString(
  value: string,
  calendar: Calendar,
  invalidDateSeverity: InvalidDateSeverity
): ParsedDate {
  const text = replacePersianNumbers(value).trim();

  if (text.endsWith("Z") || /[+-]\d{2}:\d{2}$/.test(text)) {
    const parsed = new Date(text).getTime();
    return isNaN(parsed) ? invalid(invalidDateSeverity) : { time: parsed };
  }

  const dateParts = extractDateParts(text);
  if (!dateParts || dateParts.length === 0) {
    return invalid(invalidDateSeverity);
  }

  const [year, month, day = 1, ...timeParts] = dateParts;

  if (calendar === "persian") {
    if (isPersianYear(year)) {
      return fromPersianParts([year, month, day], timeParts, invalidDateSeverity);
    }
    // Years outside the Persian range are read as Gregorian dates.
    return fromGregorianParts([year, month, day], timeParts, invalidDateSeverity);
  }

  // calendar === "gregorian": a valid Persian date is ambiguous and rejected.
  if (isValidPersian(year, month, day)) {
    return invalid(invalidDateSeverity);
  }
  return fromGregorianParts([year, month, day], timeParts, invalidDateSeverity);
}

function parseDate(
  args: DateValue[],
  calendar: Calendar,
  invalidDateSeverity: InvalidDateSeverity
): ParsedDate {
  if (args.length === 0 || (args.length === 1 && args[0] === undefined)) {
    return { time: Date.now() };
  }

  if (args.length === 1) {
    const singleArg = args[0];

    if (singleArg instanceof Date || typeof singleArg === "number") {
      const time = singleArg instanceof Date ? singleArg.getTime() : singleArg;
      return isNaN(time) ? invalid(invalidDateSeverity) : { time };
    }

    if (typeof singleArg === "string") {
      return parseString(singleArg, calendar, invalidDateSeverity);
    }
  }

  // args.length >= 2 (e.g. year, month, date?, hours?, minutes?, seconds?, ms?)
  const [year, month, day = 1, ...timeParts] = toIntegerArray(
    args as (string | number)[]
  );

  if (calendar === "persian") {
    return fromPersianParts([year, month, day], timeParts, invalidDateSeverity);
  }
  // Native Date semantics: numeric Gregorian parts may overflow (month 13 → next year).
  return { wallClock: toWallClockParts([year, month, day], timeParts) };
}

/**
 * Resolves constructor arguments to an epoch time. Instants (`Date`, epoch
 * milliseconds, ISO strings with an offset) are kept as they are; wall-clock
 * inputs (date strings and numeric parts) are read in the configured time zone.
 */
export default function normalizeArguments(
  args: unknown[]
): NormalizeArguments {
  const [newArguments, options, formatOptions] = extractArguments(
    args as (DateValue | object)[]
  );

  const parsed = parseDate(
    newArguments,
    options.calendar,
    options.invalidDateSeverity
  );

  let time = NaN;
  if (parsed && "time" in parsed) {
    time = parsed.time;
  } else if (parsed) {
    time = fromWallClock(parsed.wallClock, formatOptions.timeZone);
  }

  return [time, options, formatOptions];
}

const isOptions = (arg: unknown): arg is object =>
  typeof arg === "object" && arg !== null && !(arg instanceof Date);
