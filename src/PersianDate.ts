import { DEFAULT_CALENDAR } from "./constants/defaultOptions";
import Calendar from "./types/Calendar";
import DateFormatTemplate from "./types/DateFormatTemplate";
import DateType from "./types/DateType";
import DateUint from "./types/DateUnit";
import DateValue from "./types/DateValue";
import FormatOptions from "./types/FormatOptions";
import Formatters from "./types/Formatters";
import Options from "./types/Options";
import PersianDateOptions from "./types/PersianDateOptions";
import TimeZone from "./types/TimeZone";
import dffDates from "./utils/common/diffDates";
import getTime from "./utils/common/getTime";
import isLeapYear from "./utils/common/isLeapYear";
import modifyTime from "./utils/common/modifyTime";
import normalizeArguments from "./utils/common/normalizeArguments";
import persianToGregorian from "./utils/gregorian/persianToGregorian";
import createFormatters from "./utils/formatters/createFormatters";
import formatTime, { FormatOptionsConfig } from "./utils/formatters/formatTime";
import overrideDisplayDateInstance from "./utils/formatters/overrideDisplayDateInstance";
import relativeTime, { RelativeTimeOptions } from "./utils/common/fromNow";
import { toPersianDate } from "./utils/persian/toPersianDate";
import {
  fromWallClock,
  getGregorianMonthLength,
  getGregorianWeekday,
  toWallClock,
  WallClock,
} from "./utils/common/zonedTime";

/**
 * Represents a Persian date and time, extending the native JavaScript Date object.
 * This class allows for the manipulation and formatting of dates in both the
 * Persian and Gregorian calendars.
 *
 * @extends Date
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
 *
 * @example
 * const persianDate = new PersianDate();
 * console.log(persianDate.format('YYYY/MM/DD'));
 * console.log(persianDate.format('YYYY/MM/DD HH:mm:ss'));
 */
export default class PersianDate extends Date {
  private options: Options;
  private formatters?: Formatters;
  private formatOptions: FormatOptions;
  private persianDateCache?: DateType;

  /**
   * Multiple constructor overloads to support various input types
   * for initializing PersianDate instances.
   */
  constructor(options?: PersianDateOptions);
  constructor(value: DateValue, options?: PersianDateOptions);
  constructor(value: Date, options?: PersianDateOptions);
  constructor(value: number, options?: PersianDateOptions);
  constructor(value: string, options?: PersianDateOptions);
  constructor(year: number, month: number, options?: PersianDateOptions);
  constructor(
    year: number,
    month: number,
    date: number,
    options?: PersianDateOptions
  );
  constructor(
    year: number,
    month: number,
    date: number,
    hours: number,
    options?: PersianDateOptions
  );
  constructor(
    year: number,
    month: number,
    date: number,
    hours: number,
    minutes: number,
    options?: PersianDateOptions
  );
  constructor(
    year: number,
    month: number,
    date: number,
    hours: number,
    minutes: number,
    seconds: number,
    options?: PersianDateOptions
  );
  constructor(
    year: number,
    month: number,
    date: number,
    hours: number,
    minutes: number,
    seconds: number,
    ms: number,
    options?: PersianDateOptions
  );
  constructor(...args: unknown[]) {
    const [time, options, formatOptions] = normalizeArguments(args);
    super(time);
    this.options = options;
    this.formatOptions = formatOptions;
    this.update();
  }

  /**
   * Updates the internal state by recalculating the Persian date components.
   * Formatters are lazily instantiated only when needed for formatting.
   *
   * @private
   */
  private update() {
    this.formatters = undefined;
    this.persianDateCache = undefined;
  }

  /** Persian year, month, and day in the instance's time zone, computed on first use. */
  private get persianDate(): DateType {
    if (!this.persianDateCache) {
      this.persianDateCache = toPersianDate(this.getTime(), this.formatOptions);
    }
    return this.persianDateCache;
  }

  private getFormatters(): Formatters {
    if (!this.formatters) {
      this.formatters = createFormatters(this.formatOptions);
    }
    return this.formatters;
  }

  /** The Gregorian wall clock of this instant in the instance's time zone. */
  private getWallClock(): WallClock {
    return toWallClock(this.getTime(), this.formatOptions.timeZone);
  }

  /** Moves this instance to a wall-clock reading in its time zone. */
  private setWallClock(wallClock: WallClock): number {
    return this.setTime(fromWallClock(wallClock, this.formatOptions.timeZone));
  }

  /** Moves this instance to one millisecond before a wall-clock reading. */
  private setBefore(wallClock: WallClock): number {
    return this.setTime(fromWallClock(wallClock, this.formatOptions.timeZone) - 1);
  }

  /** The Gregorian date of a Persian date at midnight, as a wall clock. */
  private persianMidnight(year: number, month: number, day: number): WallClock {
    const [gYear, gMonth, gDay] = persianToGregorian(year, month, day);
    return { year: gYear, month: gMonth, day: gDay, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
  }

  /**
   * Returns `false` when the instance holds an invalid date, such as one
   * created from an impossible date like 1404/12/30 or unparsable text.
   */
  isValid(): boolean {
    return !isNaN(this.getTime());
  }

  /**
   * Sets the time zone for the PersianDate instance.
   * Updates the time zone in the format options and re-calculates the date.
   *
   * @param {TimeZone} timeZone - The time zone to set (e.g., "UTC", "Asia/Tehran").
   * @returns {void}
   */
  setTimeZone(timeZone: TimeZone): void {
    this.formatOptions.timeZone = timeZone;
    this.update();
  }

  /**
   * Sets the calendar used by the PersianDate instance.
   * Updates the calendar option and re-calculates the date accordingly.
   *
   * @param {Calendar} calendar - The calendar to set (e.g., "gregorian" or "persian").
   * @returns {void}
   */
  setCalendar(calendar: Calendar): void {
    const normalized: "persian" | "gregorian" =
      calendar === "gregorian" ? "gregorian" : "persian";
    this.options.calendar = normalized;
    this.formatOptions.calendar =
      normalized === "gregorian" ? undefined : DEFAULT_CALENDAR;
    this.update();
  }


  /**
   * Formats the current PersianDate instance using the provided date format template.
   *
   * @param {DateFormatTemplate} template - The date format template to use.
   * @returns {string} The formatted date string.
   */
  format(
    template: DateFormatTemplate = "YYYY/MM/DD",
    options?: FormatOptionsConfig
  ): string {
    return formatTime(this.getTime(), template, this.getFormatters(), options);
  }

  /**
   * Formats the PersianDate instance using Persian digits (۰-۹).
   *
   * @param {DateFormatTemplate} [template="YYYY/MM/DD"] - The template to use.
   * @returns {string} The formatted date string with Persian digits.
   */
  formatFa(template: DateFormatTemplate = "YYYY/MM/DD"): string {
    return this.format(template, { digits: "fa" });
  }

  /**
   * Returns human-readable relative time string comparing this date to another date.
   *
   * @param {DateValue} value - Target date to compare from.
   * @param {boolean} [withoutSuffix=false] - Whether to omit the suffix ("پیش" / "بعد").
   * @param {RelativeTimeOptions} [options] - Additional formatting options.
   * @returns {string} Relative time string in Persian.
   */
  from(
    value: DateValue,
    withoutSuffix?: boolean,
    options?: RelativeTimeOptions
  ): string {
    return relativeTime(this.getTime(), getTime(value), {
      withoutSuffix,
      ...options,
    });
  }

  /**
   * Returns human-readable relative time string comparing this date to now.
   *
   * @param {boolean} [withoutSuffix=false] - Whether to omit the suffix ("پیش" / "بعد").
   * @param {RelativeTimeOptions} [options] - Additional formatting options.
   * @returns {string} Relative time string in Persian (e.g. "۳ روز پیش").
   */
  fromNow(
    withoutSuffix?: boolean,
    options?: RelativeTimeOptions
  ): string {
    return this.from(new Date(), withoutSuffix, options);
  }

  /**
   * Returns human-readable relative time string comparing another date to this date.
   *
   * @param {DateValue} value - Target date to compare to.
   * @param {boolean} [withoutSuffix=false] - Whether to omit the suffix.
   * @param {RelativeTimeOptions} [options] - Additional formatting options.
   * @returns {string} Relative time string in Persian.
   */
  to(
    value: DateValue,
    withoutSuffix?: boolean,
    options?: RelativeTimeOptions
  ): string {
    return relativeTime(getTime(value), this.getTime(), {
      withoutSuffix,
      ...options,
    });
  }

  /**
   * Returns human-readable relative time string comparing now to this date.
   *
   * @param {boolean} [withoutSuffix=false] - Whether to omit the suffix.
   * @param {RelativeTimeOptions} [options] - Additional formatting options.
   * @returns {string} Relative time string in Persian.
   */
  toNow(
    withoutSuffix?: boolean,
    options?: RelativeTimeOptions
  ): string {
    return this.to(new Date(), withoutSuffix, options);
  }

  /**
   * Calculates the signed difference between this instance and the provided date value:
   * positive when this instance is later. Seconds through weeks are exact (fractional);
   * months and years are completed calendar periods in the instance's calendar and time zone.
   *
   * @param {DateValue} value - The date value to compare against.
   * @param {DateUint} [unit="days"] - The time unit for the difference (e.g., "days", "months", "years").
   * @returns {number} The difference in the specified time unit (days when no unit is provided).
   */
  diff(value: DateValue, unit?: DateUint): number {
    return dffDates(
      this.getTime(),
      getTime(value),
      unit,
      this.options.calendar,
      this.formatOptions.timeZone
    );
  }

  /**
   * Checks if the current date is before another date.
   *
   * @param {DateValue} value - The date value to compare against.
   * @returns {boolean} `true` if this date is before the given date.
   */
  isBefore(value: DateValue): boolean {
    return this.getTime() < getTime(value);
  }

  /**
   * Checks if the current date is after another date.
   *
   * @param {DateValue} value - The date value to compare against.
   * @returns {boolean} `true` if this date is after the given date.
   */
  isAfter(value: DateValue): boolean {
    return this.getTime() > getTime(value);
  }

  /**
   * Checks if the current date is the same as another date, optionally matching a specific unit.
   *
   * @param {DateValue} value - The date value to compare against.
   * @param {DateUint | "year" | "month" | "day" | "hour" | "minute" | "second"} [unit] - Comparison unit.
   * @returns {boolean} `true` if the dates are the same.
   */
  isSame(
    value: DateValue,
    unit?: "year" | "month" | "day" | "hour" | "minute" | "second" | DateUint
  ): boolean {
    if (!unit) {
      return this.getTime() === getTime(value);
    }
    const other = new PersianDate(value as any, {
      calendar: this.options.calendar,
      timeZone: this.formatOptions.timeZone,
    });
    const u = unit.endsWith("s") ? unit.slice(0, -1) : unit;
    switch (u) {
      case "year":
        return this.getFullYear() === other.getFullYear();
      case "month":
        return (
          this.getFullYear() === other.getFullYear() &&
          this.getMonth() === other.getMonth()
        );
      case "day":
        return (
          this.getFullYear() === other.getFullYear() &&
          this.getMonth() === other.getMonth() &&
          this.getDate() === other.getDate()
        );
      default:
        return (
          this.clone().startOf(unit as any).getTime() ===
          other.startOf(unit as any).getTime()
        );
    }
  }

  /**
   * Adds the specified time unit and value to the current PersianDate instance.
   *
   * @param {number} value - The value to add (or unit if passing unit first).
   * @param {DateUint} unit - The time unit to add (or value if passing value second).
   * @returns {PersianDate} The updated PersianDate instance.
   */
  add(value: number, unit: DateUint): PersianDate;
  add(unit: DateUint, value: number): PersianDate;
  add(arg1: number | DateUint, arg2: DateUint | number): PersianDate {
    const value = typeof arg1 === "number" ? arg1 : (arg2 as number);
    const unit = typeof arg1 === "string" ? arg1 : (arg2 as DateUint);
    this.setTime(
      modifyTime(this.getTime(), value, unit, this.options.calendar, this.formatOptions.timeZone)
    );
    return this;
  }

  /**
   * Subtracts the specified time unit and value from the current PersianDate instance.
   *
   * @param {number} value - The value to subtract (or unit if passing unit first).
   * @param {DateUint} unit - The time unit to subtract (or value if passing value second).
   * @returns {PersianDate} The updated PersianDate instance.
   */
  subtract(value: number, unit: DateUint): PersianDate;
  subtract(unit: DateUint, value: number): PersianDate;
  subtract(arg1: number | DateUint, arg2: DateUint | number): PersianDate {
    const value = typeof arg1 === "number" ? arg1 : (arg2 as number);
    const unit = typeof arg1 === "string" ? arg1 : (arg2 as DateUint);
    this.setTime(
      modifyTime(this.getTime(), -value, unit, this.options.calendar, this.formatOptions.timeZone)
    );
    return this;
  }

  /**
   * Gets the full year of the current PersianDate instance.
   * For Persian calendar dates, it returns the year in the Persian calendar.
   * For Gregorian calendar dates, it returns the year in the Gregorian calendar.
   *
   * @returns {number} The year of the PersianDate instance.
   */
  override getFullYear(): number {
    if (this.options.calendar === "gregorian") {
      return this.getWallClock().year;
    }

    return this.persianDate.year;
  }

  /**
   * Gets the day of the month for the current PersianDate instance.
   * Returns the day in the Persian calendar (1-31) or the Gregorian calendar (1-31).
   *
   * @returns {number} The day of the PersianDate instance.
   */
  override getDate(): number {
    if (this.options.calendar === "gregorian") {
      return this.getWallClock().day;
    }

    return this.persianDate.day;
  }

  /**
   * Gets the month for the current PersianDate instance.
   * Returns the month (1-12) in the Persian calendar or the Gregorian calendar.
   *
   * @returns {number} The 1-based month of the PersianDate instance (1-12).
   */
  override getMonth(): number {
    if (this.options.calendar === "gregorian") {
      return this.getWallClock().month;
    }

    return this.persianDate.month;
  }

  /**
   * Sets the time of the PersianDate instance.
   *
   * @param {number} time - Number of milliseconds since January 1, 1970, 00:00:00 UTC.
   * @returns {number} The new timestamp.
   */
  override setTime(time: number): number {
    const result = super.setTime(time);
    this.update();
    return result;
  }

  /**
   * Sets the full year of the PersianDate instance.
   */
  override setFullYear(year: number, month?: number, date?: number): number {
    const wallClock = this.getWallClock();
    if (this.options.calendar === "gregorian") {
      return this.setWallClock({
        ...wallClock,
        year,
        month: month ?? wallClock.month,
        day: date ?? wallClock.day,
      });
    }

    return this.setPersianDate(
      year,
      month ?? this.persianDate.month,
      date ?? this.persianDate.day
    );
  }

  /** Moves to a Persian date in the instance's time zone, keeping the wall-clock time. */
  private setPersianDate(year: number, month: number, day: number): number {
    const [gYear, gMonth, gDay] = persianToGregorian(year, month, day);
    return this.setWallClock({
      ...this.getWallClock(),
      year: gYear,
      month: gMonth,
      day: gDay,
    });
  }

  /**
   * Sets the month of the PersianDate instance.
   */
  override setMonth(month: number, date?: number): number {
    if (this.options.calendar === "gregorian") {
      const wallClock = this.getWallClock();
      return this.setWallClock({ ...wallClock, month, day: date ?? wallClock.day });
    }

    return this.setPersianDate(
      this.persianDate.year,
      month,
      date ?? this.persianDate.day
    );
  }

  /**
   * Sets the date (day of month) of the PersianDate instance.
   */
  override setDate(date: number): number {
    if (this.options.calendar === "gregorian") {
      return this.setWallClock({ ...this.getWallClock(), day: date });
    }

    return this.setPersianDate(this.persianDate.year, this.persianDate.month, date);
  }

  /** Hours (0-23) of the wall clock in the instance's time zone. */
  override getHours(): number {
    return this.getWallClock().hours;
  }

  /** Minutes of the wall clock in the instance's time zone. */
  override getMinutes(): number {
    return this.getWallClock().minutes;
  }

  /** Seconds of the wall clock in the instance's time zone. */
  override getSeconds(): number {
    return this.getWallClock().seconds;
  }

  /** Day of week (0 = Sunday … 6 = Saturday) in the instance's time zone, like `Date#getDay`. */
  override getDay(): number {
    const { year, month, day } = this.getWallClock();
    return getGregorianWeekday(year, month, day);
  }

  override setHours(hours: number, min?: number, sec?: number, ms?: number): number {
    const wallClock = this.getWallClock();
    return this.setWallClock({
      ...wallClock,
      hours,
      minutes: min ?? wallClock.minutes,
      seconds: sec ?? wallClock.seconds,
      milliseconds: ms ?? wallClock.milliseconds,
    });
  }

  override setMinutes(min: number, sec?: number, ms?: number): number {
    const wallClock = this.getWallClock();
    return this.setWallClock({
      ...wallClock,
      minutes: min,
      seconds: sec ?? wallClock.seconds,
      milliseconds: ms ?? wallClock.milliseconds,
    });
  }

  override setSeconds(sec: number, ms?: number): number {
    const wallClock = this.getWallClock();
    return this.setWallClock({
      ...wallClock,
      seconds: sec,
      milliseconds: ms ?? wallClock.milliseconds,
    });
  }

  override setMilliseconds(ms: number): number {
    return this.setWallClock({ ...this.getWallClock(), milliseconds: ms });
  }

  /**
   * Determines if the current year is a leap year based on the selected calendar.
   *
   * @returns {boolean} `true` if the current year is a leap year, `false` otherwise.
   */
  isLeapYear(): boolean {
    return isLeapYear(this.getFullYear(), this.options.calendar);
  }

  /**
   * Returns a clone of the current PersianDate instance.
   */
  clone(): PersianDate {
    return new PersianDate(this.getTime(), {
      calendar: this.options.calendar,
      timeZone: this.formatOptions.timeZone,
      invalidDateSeverity: this.options.invalidDateSeverity,
    });
  }

  /**
   * Returns the number of days in the current month for the active calendar.
   */
  daysInMonth(): number {
    if (this.options.calendar === "gregorian") {
      const { year, month } = this.getWallClock();
      return getGregorianMonthLength(year, month);
    }
    const month = this.getMonth();
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    return this.isLeapYear() ? 30 : 29;
  }

  /**
   * Returns an array representation of the date: [year, month, date, hours, minutes, seconds, milliseconds].
   */
  toArray(): [number, number, number, number, number, number, number] {
    return [
      this.getFullYear(),
      this.getMonth(),
      this.getDate(),
      this.getHours(),
      this.getMinutes(),
      this.getSeconds(),
      this.getMilliseconds(),
    ];
  }

  /**
   * Returns the day of the week in the Persian calendar.
   * 0: Saturday (Shanbeh), 1: Sunday, 2: Monday, 3: Tuesday,
   * 4: Wednesday, 5: Thursday, 6: Friday (Jom'eh).
   *
   * @returns {number} The Persian day of week (0-6).
   */
  getDayOfWeek(): number {
    return (this.getDay() + 1) % 7;
  }

  /**
   * Checks if the date falls on the weekend in the Persian calendar (Friday / Jom'eh).
   *
   * @returns {boolean} `true` if the day is Friday.
   */
  isWeekend(): boolean {
    return this.getDayOfWeek() === 6;
  }

  /**
   * Returns the Persian quarter (1-4).
   * Q1: Farvardin-Khordad, Q2: Tir-Shahrivar, Q3: Mehr-Azar, Q4: Dey-Esfand.
   *
   * @returns {number} The quarter of the year (1-4).
   */
  quarter(): number {
    return Math.ceil(this.getMonth() / 3);
  }

  /**
   * Sets the date to the start of a specified unit of time.
   */
  startOf(
    unit: "year" | "month" | "week" | "day" | "hour" | "minute" | "second" | DateUint
  ): this {
    const u = unit.endsWith("s") ? unit.slice(0, -1) : unit;
    const wallClock = this.getWallClock();
    const midnight = { ...wallClock, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
    const isPersian = this.options.calendar === "persian";
    switch (u) {
      case "year":
        this.setWallClock(
          isPersian
            ? this.persianMidnight(this.persianDate.year, 1, 1)
            : { ...midnight, month: 1, day: 1 }
        );
        break;
      case "month":
        this.setWallClock(
          isPersian
            ? this.persianMidnight(this.persianDate.year, this.persianDate.month, 1)
            : { ...midnight, day: 1 }
        );
        break;
      case "week":
        this.setWallClock({ ...midnight, day: wallClock.day - this.getDayOfWeek() });
        break;
      case "day":
        this.setWallClock(midnight);
        break;
      case "hour":
        this.setWallClock({ ...wallClock, minutes: 0, seconds: 0, milliseconds: 0 });
        break;
      case "minute":
        this.setWallClock({ ...wallClock, seconds: 0, milliseconds: 0 });
        break;
      case "second":
        this.setWallClock({ ...wallClock, milliseconds: 0 });
        break;
    }
    return this;
  }

  /**
   * Sets the date to the end of a specified unit of time.
   */
  endOf(
    unit: "year" | "month" | "week" | "day" | "hour" | "minute" | "second" | DateUint
  ): this {
    const u = unit.endsWith("s") ? unit.slice(0, -1) : unit;
    const wallClock = this.getWallClock();
    const midnight = { ...wallClock, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
    const isPersian = this.options.calendar === "persian";
    const { year, month } = this.persianDate;
    switch (u) {
      case "year":
        this.setBefore(
          isPersian
            ? this.persianMidnight(year + 1, 1, 1)
            : { ...midnight, year: wallClock.year + 1, month: 1, day: 1 }
        );
        break;
      case "month":
        this.setBefore(
          isPersian
            ? this.persianMidnight(month === 12 ? year + 1 : year, (month % 12) + 1, 1)
            : { ...midnight, month: wallClock.month + 1, day: 1 }
        );
        break;
      case "week":
        this.setBefore({ ...midnight, day: wallClock.day - this.getDayOfWeek() + 7 });
        break;
      case "day":
        this.setBefore({ ...midnight, day: wallClock.day + 1 });
        break;
      case "hour":
        this.setWallClock({ ...wallClock, minutes: 59, seconds: 59, milliseconds: 999 });
        break;
      case "minute":
        this.setWallClock({ ...wallClock, seconds: 59, milliseconds: 999 });
        break;
      case "second":
        this.setWallClock({ ...wallClock, milliseconds: 999 });
        break;
    }
    return this;
  }

  /**
   * Formats the PersianDate instance for console inspection in Node.js and browsers.
   */
  [Symbol.for("nodejs.util.inspect.custom")](): string {
    return overrideDisplayDateInstance(this.getTime());
  }
}

