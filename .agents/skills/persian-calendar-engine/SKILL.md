---
name: persian-calendar-engine
description: High-precision Jalali (Persian Solar Hijri) date algorithms, Gregorian-Persian bidirectional conversions, leap year rules (Birashk 33-year and 2820-year cycles), and localized calendar math.
---

# Persian Calendar Engine Skill

This universal skill enables AI agents to accurately calculate, convert, validate, and format Jalali (Solar Hijri / شمسی) and Gregorian (میلادی) dates without common leap year or offset bugs.

## Core Capabilities

1. **Bidirectional Conversion**:
   - Gregorian $\leftrightarrow$ Jalali (Persian)
   - Accurate astronomical & arithmetic leap year handling.
2. **Leap Year Determination**:
   - 33-year cycle (Khayyam / Birashk algorithm).
   - Accurately identifies 29-day vs 30-day Esfand (اسفند).
3. **Persian Date Formatting**:
   - Persian month names: `فروردین`, `اردیبهشت`, `خرداد`, `تیر`, `مرداد`, `شهریور`, `مهر`, `آبان`, `آذر`, `دی`, `بهمن`, `اسفند`.
   - Persian weekdays: `شنبه`, `یکشنبه`, `دوشنبه`, `سه‌شنبه`, `چهارشنبه`, `پنج‌شنبه`, `جمعه`.
   - Persian / Farsi digits conversion (`۰-۹`).
4. **Timezone & Epoch Calculations**:
   - Iran Standard Time (IRST) / Daylight Saving Time transitions.
   - Unix timestamp $\leftrightarrow$ Persian Date math.

## Algorithm Reference

### Gregorian to Jalali (Persian) Conversion Algorithm

```typescript
export function gregorianToPersian(gYear: number, gMonth: number, gDay: number): [number, number, number] {
  const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  const gy = gYear - 1600;
  const gm = gMonth - 1;
  const gd = gDay - 1;

  let gDayNo = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);

  for (let i = 0; i < gm; ++i) {
    gDayNo += gDaysInMonth[i];
  }
  if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0))) {
    gDayNo++;
  }
  gDayNo += gd;

  let jDayNo = gDayNo - 79;
  const jNp = Math.floor(jDayNo / 12053);
  jDayNo %= 12053;

  let jy = 979 + 33 * jNp + 4 * Math.floor(jDayNo / 1461);
  jDayNo %= 1461;

  if (jDayNo >= 366) {
    jy += Math.floor((jDayNo - 1) / 365);
    jDayNo = (jDayNo - 1) % 365;
  }

  let jm = 0;
  for (let i = 0; i < 11 && jDayNo >= jDaysInMonth[i]; ++i) {
    jDayNo -= jDaysInMonth[i];
    jm++;
  }
  const jd = jDayNo + 1;

  return [jy, jm + 1, jd];
}
```

### Jalali Leap Year Verification Rule

A Jalali year $Y$ is a leap year if:
$$\text{remainder} = (Y - (Y > 0 ? 474 : 473)) \pmod{2820}$$
$$\text{isLeap} = ((((\text{remainder} + 38) \times 682) \pmod{2816}) < 682)$$

## Agent Guidelines When Generating Calendar Code

1. **Never use standard JavaScript `Date` constructor for Persian dates directly**; always use a dedicated conversion layer.
2. **Handle Esfand 29 vs 30**: Month 12 has 29 days in normal years and 30 days in leap years.
3. **Persian digit normalization**: When formatting strings for Iranian UI/UX, replace ASCII `0-9` with `۰-۹` (`\u06F0` through `\u06F9`).
