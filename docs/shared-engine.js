/**
 * persian-date-native — Universal Client Engine & Fallback Core
 * 100% Zero-Dependency Standalone Runtime for Documentation & Live Apps
 */
(function(global) {
  'use strict';

  const G_D_M = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const P_DAYS_MONTH = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  const MONTH_NAMES_FA = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];
  const MONTH_NAMES_EN = [
    "Farvardin", "Ordibehesht", "Khordad", "Tir", "Mordad", "Shahrivar",
    "Mehr", "Aban", "Azar", "Dey", "Bahman", "Esfand"
  ];
  const WEEKDAY_NAMES_FA = ["شنبه", "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];
  const WEEKDAY_NAMES_EN = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  function isPersianLeapYear(jy) {
    const y = jy - 979;
    const a = 365 * y + 8 * Math.floor(y / 33) + Math.floor(((y % 33) + 3) / 4);
    const b = 365 * (y + 1) + 8 * Math.floor((y + 1) / 33) + Math.floor((((y + 1) % 33) + 3) / 4);
    return (b - a) === 366;
  }

  function gregorianToPersian(gy, gm, gd) {
    if (gy < 0) throw new Error("Invalid Date");
    const gy2 = gm > 2 ? gy + 1 : gy;
    let days = 355666 + 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + G_D_M[gm - 1];
    let jy = -1595 + 33 * Math.floor(days / 12053);
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
      jy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
    const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
    return [jy, jm, jd];
  }

  function persianToGregorian(jy, jm, jd) {
    if (jy < 0) throw new Error("Invalid Date");
    const y = jy - 979;
    let days = 365 * y + 8 * Math.floor(y / 33) + Math.floor(((y % 33) + 3) / 4) +
      (jm < 7 ? 31 * (jm - 1) : 30 * (jm - 7) + 186) + jd - 1 + 79;
    let gy = 1600 + 400 * Math.floor(days / 146097);
    days %= 146097;
    let leap = true;
    if (days >= 36525) {
      days--;
      gy += 100 * Math.floor(days / 36524);
      days %= 36524;
      if (days >= 365) days++;
      else leap = false;
    }
    gy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days >= 366) {
      leap = false;
      days--;
      gy += Math.floor(days / 365);
      days %= 365;
    }
    const sal = [31, (leap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let gm = 0;
    while (days >= sal[gm]) {
      days -= sal[gm];
      gm++;
    }
    return [gy, gm + 1, days + 1];
  }

  function toGregorianDate(jy, jm, jd) {
    const [gy, gm, gd] = persianToGregorian(jy, jm, jd);
    return new Date(gy, gm - 1, gd);
  }

  function toPersianDate(input) {
    const d = input instanceof Date ? input : new Date(input || Date.now());
    if (isNaN(d.getTime())) return { year: NaN, month: NaN, day: NaN };
    const [year, month, day] = gregorianToPersian(d.getFullYear(), d.getMonth() + 1, d.getDate());
    return { year, month, day };
  }

  function toPersianDigits(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[0-9]/g, function(w) {
      return String.fromCharCode(w.charCodeAt(0) + 1728);
    });
  }

  function replacePersianNumbers(str) {
    if (!str) return '';
    return String(str).replace(/[\u06f0-\u06f9]/g, function(w) {
      return String.fromCharCode(w.charCodeAt(0) - 1728);
    });
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  class PersianDate extends Date {
    constructor(...args) {
      if (args.length === 0) {
        super();
      } else if (args.length === 1) {
        super(args[0]);
      } else {
        const [jy, jm = 1, jd = 1, h = 0, min = 0, s = 0, ms = 0] = args;
        const [gy, gm, gd] = persianToGregorian(jy, jm, jd);
        super(gy, gm - 1, gd, h, min, s, ms);
      }
    }

    getFullYear() {
      return toPersianDate(this).year;
    }
    getMonth() {
      return toPersianDate(this).month;
    }
    getDate() {
      return toPersianDate(this).day;
    }
    getDayOfWeek() {
      return (super.getDay() + 1) % 7;
    }
    isWeekend() {
      return this.getDayOfWeek() === 6;
    }
    isLeapYear() {
      return isPersianLeapYear(this.getFullYear());
    }
    daysInMonth() {
      const m = this.getMonth();
      if (m <= 6) return 31;
      if (m <= 11) return 30;
      return this.isLeapYear() ? 30 : 29;
    }

    format(template = "YYYY/MM/DD") {
      const { year, month, day } = toPersianDate(this);
      const h = this.getHours();
      const min = this.getMinutes();
      const s = this.getSeconds();
      const dow = this.getDayOfWeek();
      const h12 = h % 12 || 12;

      const map = {
        'YYYY': String(year),
        'YY': String(year).slice(-2),
        'MMMM': MONTH_NAMES_EN[month - 1] || '',
        'MMM': MONTH_NAMES_EN[month - 1] || '',
        'MM': pad(month),
        'M': String(month),
        'DD': pad(day),
        'D': String(day),
        'dddd': WEEKDAY_NAMES_EN[dow],
        'ddd': WEEKDAY_NAMES_EN[dow].slice(0, 3),
        'HH': pad(h),
        'H': String(h),
        'hh': pad(h12),
        'h': String(h12),
        'mm': pad(min),
        'm': String(min),
        'ss': pad(s),
        's': String(s),
        'A': h < 12 ? 'AM' : 'PM',
        'a': h < 12 ? 'am' : 'pm'
      };

      return template.replace(/YYYY|YY|MMMM|MMM|MM|M|DD|D|dddd|ddd|HH|H|hh|h|mm|m|ss|s|A|a/g, (match) => map[match] !== undefined ? map[match] : match);
    }

    formatFa(template = "YYYY/MM/DD") {
      const { year, month, day } = toPersianDate(this);
      const h = this.getHours();
      const min = this.getMinutes();
      const s = this.getSeconds();
      const dow = this.getDayOfWeek();
      const h12 = h % 12 || 12;

      const map = {
        'YYYY': toPersianDigits(year),
        'YY': toPersianDigits(String(year).slice(-2)),
        'MMMM': MONTH_NAMES_FA[month - 1] || '',
        'MMM': MONTH_NAMES_FA[month - 1] || '',
        'MM': toPersianDigits(pad(month)),
        'M': toPersianDigits(month),
        'DD': toPersianDigits(pad(day)),
        'D': toPersianDigits(day),
        'dddd': WEEKDAY_NAMES_FA[dow],
        'ddd': WEEKDAY_NAMES_FA[dow],
        'HH': toPersianDigits(pad(h)),
        'H': toPersianDigits(h),
        'hh': toPersianDigits(pad(h12)),
        'h': toPersianDigits(h12),
        'mm': toPersianDigits(pad(min)),
        'm': toPersianDigits(min),
        'ss': toPersianDigits(pad(s)),
        's': toPersianDigits(s),
        'A': h < 12 ? 'ق.ظ' : 'ب.ظ',
        'a': h < 12 ? 'ق.ظ' : 'ب.ظ'
      };

      return template.replace(/YYYY|YY|MMMM|MMM|MM|M|DD|D|dddd|ddd|HH|H|hh|h|mm|m|ss|s|A|a/g, (match) => map[match] !== undefined ? map[match] : match);
    }

    fromNow(withoutSuffix = false) {
      const diffSec = Math.round((Date.now() - this.getTime()) / 1000);
      const isPast = diffSec >= 0;
      const abs = Math.abs(diffSec);

      let text = "";
      if (abs < 45) text = "چند ثانیه";
      else if (abs < 90) text = "یک دقیقه";
      else if (abs < 2700) text = Math.round(abs / 60) + " دقیقه";
      else if (abs < 5400) text = "یک ساعت";
      else if (abs < 79200) text = Math.round(abs / 3600) + " ساعت";
      else if (abs < 129600) text = "یک روز";
      else if (abs < 2246400) text = Math.round(abs / 86400) + " روز";
      else if (abs < 3974400) text = "یک ماه";
      else if (abs < 27648000) text = Math.round(abs / 2592000) + " ماه";
      else if (abs < 47347200) text = "یک سال";
      else text = Math.round(abs / 31536000) + " سال";

      if (withoutSuffix) return toPersianDigits(text);
      return toPersianDigits(isPast ? (text + " پیش") : ("در " + text));
    }

    add(amount, unit = "days") {
      const u = unit.toLowerCase();
      const res = new PersianDate(this);
      if (u.startsWith("day")) res.setDate(super.getDate() + amount);
      else if (u.startsWith("month")) {
        const { year, month, day } = toPersianDate(this);
        const totalMonths = year * 12 + (month - 1) + amount;
        const newYear = Math.floor(totalMonths / 12);
        const newMonth = (totalMonths % 12 + 12) % 12 + 1;
        const maxDays = (newMonth <= 6) ? 31 : (newMonth <= 11 || isPersianLeapYear(newYear)) ? 30 : 29;
        const newDay = Math.min(day, maxDays);
        const [gy, gm, gd] = persianToGregorian(newYear, newMonth, newDay);
        res.setFullYear(gy, gm - 1, gd);
      }
      else if (u.startsWith("year")) {
        const { year, month, day } = toPersianDate(this);
        const newYear = year + amount;
        const maxDays = (month <= 6) ? 31 : (month <= 11 || isPersianLeapYear(newYear)) ? 30 : 29;
        const newDay = Math.min(day, maxDays);
        const [gy, gm, gd] = persianToGregorian(newYear, month, newDay);
        res.setFullYear(gy, gm - 1, gd);
      }
      else if (u.startsWith("week")) res.setDate(super.getDate() + amount * 7);
      return res;
    }

    subtract(amount, unit) {
      return this.add(-amount, unit);
    }
  }

  function persianDate(...args) {
    return new PersianDate(...args);
  }

  const exportObj = {
    PersianDate,
    persianDate,
    gregorianToPersian,
    persianToGregorian,
    toPersianDate,
    toGregorianDate,
    isPersianLeapYear,
    toPersianDigits,
    replacePersianNumbers,
    toPersian: gregorianToPersian,
    toGregorian: persianToGregorian,
    isLeapPersianYear: isPersianLeapYear
  };

  global.PersianDateNative = Object.assign(global.PersianDateNative || {}, exportObj);
  global._PD = exportObj;
})(typeof window !== 'undefined' ? window : globalThis);
