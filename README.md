# persian-date-native

[![npm version](https://img.shields.io/npm/v/persian-date-native.svg?style=flat-square&color=38bdf8)](https://www.npmjs.com/package/persian-date-native)
[![npm downloads](https://img.shields.io/npm/dt/persian-date-native.svg?style=flat-square&color=6366f1)](https://www.npmjs.com/package/persian-date-native)
[![Quality](https://github.com/muhamadzolfaghari/persian-date-native/actions/workflows/quality.yml/badge.svg)](https://github.com/muhamadzolfaghari/persian-date-native/actions/workflows/quality.yml)
[![Release](https://img.shields.io/github/v/release/muhamadzolfaghari/persian-date-native?style=flat-square&color=0ea5e9)](https://github.com/muhamadzolfaghari/persian-date-native/releases)
[![Zero Dependencies](https://img.shields.io/badge/runtime_dependencies-0-success.svg?style=flat-square)](package.json)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg?style=flat-square)](LICENSE)
[![Live Demo](https://img.shields.io/badge/live_demo-GitHub%20Pages-38bdf8?style=flat-square&logo=github)](https://muhamadzolfaghari.github.io/persian-date-native/)

> **A high-performance Persian (Jalali / Shamsi) date engine for JavaScript and TypeScript.**  
> Native `Date` interoperability, zero required runtime dependencies, strict TypeScript, ESM/CJS/browser builds, Persian formatting and relative time, calendar helpers, and optional Day.js integration.

**[Live demo](https://muhamadzolfaghari.github.io/persian-date-native/)** · **[npm](https://www.npmjs.com/package/persian-date-native)** · **[Documentation](docs/)** · **[Examples](examples/)** · **[Changelog](CHANGELOG.md)**

### Why this package?

- **Native JavaScript integration** — `PersianDate` extends `Date`, so `instanceof Date === true`.
- **Zero required runtime dependencies** — Day.js is optional and used only for the plugin integration.
- **Multiple consumption targets** — ESM, CommonJS, browser global, CDN, and TypeScript declarations.
- **Verified compatibility** — registry installs are exercised across Linux, macOS, and Windows on Node.js 18, 20, 22, and 24.
- **Reproducible engineering evidence** — unit coverage, documentation E2E checks, framework-example health checks, bundle budgets, package dry-runs, and benchmarks are all automated or runnable from the repository.

```bash
npm install persian-date-native
```

```ts
import { persianDate, gregorianToPersian } from "persian-date-native";

const [year, month, day] = gregorianToPersian(2024, 9, 2);
console.log(year, month, day); // 1403 6 12

console.log(persianDate().formatFa("YYYY/MM/DD"));
```

---

## 📑 Table of Contents

- [🌟 Live Interactive Demo & Online Tools Suite](#-live-interactive-demo--online-tools-suite)
- [✨ Key Features](#-key-features)
- [📊 Benchmarks & Ecosystem Comparison](#-benchmarks--ecosystem-comparison)
  - [Why is `shamsi` Popular & How We Compare?](#why-is-shamsi-popular--how-we-compare)
  - [Comprehensive Benchmark Table](#comprehensive-benchmark-table)
  - [Architectural Advantages](#architectural-advantages)
- [📦 Installation](#-installation)
- [🚀 Quick Start & Unpacking](#-quick-start--unpacking)
  - [1. Tuple Unpacking (Array `[y, m, d]`)](#1-tuple-unpacking-array-y-m-d)
  - [2. Object Unpacking (`{ year, month, date }`)](#2-object-unpacking--year-month-date-)
  - [3. Day.js-Style Fluent API](#3-dayjs-style-fluent-api)
- [🔄 Converting Persian ↔ Gregorian](#-converting-persian--gregorian)
  - [Pure Integer Converters (89M+ ops/sec)](#pure-integer-converters-89m-opssec)
  - [Converting `PersianDate` back to Native `Date` / ISO](#converting-persiandate-back-to-native-date--iso)
- [💡 Standalone Alternative to Day.js / Moment](#-standalone-alternative-to-dayjs--moment)
- [🎨 Building a Real Persian Calendar UI](#-building-a-real-persian-calendar-ui)
- [🔌 Day.js Plugin (`jalaliday`)](#-dayjs-plugin-jalaliday)
- [🔀 Migration Guides](#-migration-guides)
  - [Migrating from `shamsi`](#migrating-from-shamsi)
  - [Migrating from `moment-jalaali`](#migrating-from-moment-jalaali)
  - [Migrating from `Day.js + jalaliday`](#migrating-from-dayjs--jalaliday)
  - [Migrating from `date-fns-jalali`](#migrating-from-date-fns-jalali)
- [📖 Format Tokens](#-format-tokens)
- [📚 Complete API Reference](#-complete-api-reference)
  - [Universal Enterprise Aliases (`jalaliDate`, `shamsiDate`)](#universal-enterprise-aliases)
- [🔬 Leap Year Accuracy: 1403 vs 1404](#-leap-year-accuracy-1403-vs-1404)
- [🧪 Testing, Build Verification & Benchmarks](#-testing-build-verification--benchmarks)
- [📄 License](#-license)

---

## 🌟 Live Interactive Demo & Online Tools Suite

Experience all features directly in your browser with our **Multilingual (English / فارسی)** online tools:

👉 **[🌐 Open Live Documentation & Web Apps](https://muhamadzolfaghari.github.io/persian-date-native/)**

| Tool | Link | Description |
|---|---|---|
| 🔄 **Date Converter** | [Open Tool](https://muhamadzolfaghari.github.io/persian-date-native/converter.html) | Instant bidirectional Shamsi ↔ Gregorian conversion with Persian digits and 1-click code copying. |
| 📅 **Persian Calendar** | [Open Tool](https://muhamadzolfaghari.github.io/persian-date-native/calendar.html) | Interactive monthly calendar view with leap year indicator, today button, and Gregorian equivalents. |
| 🎨 **Format Playground** | [Open Tool](https://muhamadzolfaghari.github.io/persian-date-native/formatter.html) | Live Persian date format token previewer with `format()` and `formatFa()` support. |
| ⏱ **Date Calculator** | [Open Tool](https://muhamadzolfaghari.github.io/persian-date-native/calculator.html) | Calculate exact duration between dates, add/subtract intervals, Persian relative time (`fromNow`), and leap-year validation. |

---

## ✨ Key Features

- 🪶 **Zero Required Runtime Dependencies**: Ultra-lightweight core with 0 external dependencies (Day.js is an optional peer dependency for the plugin).
- ⚡ **Sub-Microsecond Pure Conversion (89M+ ops/sec)**: Optimized bitwise integer arithmetic for fast bidirectional date conversion (benchmarked on Node.js/V8).
- 🎯 **100% Test Coverage Across All Metrics**: 100% Statements, 100% Branches, 100% Functions, and 100% Lines verified (17 test suites, 142 unit tests).
- 🛡️ **Native JavaScript `Date` Inheritance**: `persianDate instanceof Date === true`. Works seamlessly with React, Vue, Ant Design, MUI, Shadcn, and HTML datepickers without needing `.toDate()` wrappers.
- 📦 **Dual Ergonomic Unpacking**:
  - **Tuple Unpacking**: `const [jy, jm, jd] = gregorianToPersian(2024, 9, 2)` (100% drop-in parity with `shamsi`).
  - **Object Unpacking**: `const { year, month, date } = toPersianDate(new Date())`.
- 🔢 **Native Persian Digits (`۰-۹`)**: Convert digits with `.formatFa()` or `{ digits: "fa" }` without regex hacks.
- ⏱️ **Relative Time Humanizer (`fromNow`, `toNow`)**: Built-in Persian phrases ("۳ روز پیش", "یک ساعت بعد", "چند ثانیه پیش").
- 📅 **Calendar Helpers for Real UI Development**: `getDayOfWeek()` (Saturday = 0 .. Friday = 6), `isWeekend()`, `quarter()`, `daysInMonth()`, `startOf("week")`, `endOf("week")`.
- 🗓️ **33-Year Jalali Leap Cycle**: Birashk 33-year solar cycle implementation (including verified handling of **1403 as a 30-day leap year** and 1404 as 29 days).

---

## 📊 Benchmarks & Ecosystem Comparison

### Comparison with common alternatives

`persian-date-native` overlaps with smaller conversion libraries and larger date-toolkit ecosystems, but it is designed around a different trade-off: keep the core dependency-free while providing native `Date` interoperability, formatting, arithmetic, relative time, calendar helpers, and an optional Day.js plugin.

The table below is a **repository benchmark snapshot**, not a universal performance ranking. Results vary by Node/V8 version, hardware, warm-up behavior, and benchmark shape. Run `npm run benchmark` on your own target environment before making performance-sensitive decisions.

### Reproducible benchmark snapshot

> **Recorded environment**: Node.js v20.x–v23.x on Apple Silicon / V8 JIT, 10,000 warm-up iterations, 500,000 measured sample cycles.  
> **Reproduce locally**: clone the repository and run `npm run benchmark`. Treat the numbers as environment-specific measurements, not guarantees.

| Feature / Metric | `persian-date-native` | `shamsi` | `dayjs + jalaliday` | `moment-jalaali` | `date-fns-jalali` |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Dependencies** | **0 (Zero)** | **0 (Zero)** | 2 (Dayjs + Plugin) | `moment` (~70 KB) | Multiple packages |
| **Pure Conversion (G→P)** | **89M–137M ops/sec** ⚡ | 80M–200M ops/sec | N/A | ~1.2M ops/sec | Functional only |
| **Pure Conversion (P→G)** | **48M–71M ops/sec** ⚡ | 40M–82M ops/sec | N/A | ~1.1M ops/sec | Functional only |
| **Round-Trip Conversion** | **32.5M ops/sec** | N/A | N/A | ~500k ops/sec | Functional only |
| **Instantiation Speed** | **4.1M–6.3M ops/sec** | N/A (no wrapper) | 1.9M ops/sec | ~250k ops/sec | N/A |
| **Extends Native `Date`** | **✅ `instanceof Date`** | ❌ No | ❌ No (`.toDate()`) | ❌ No (`.toDate()`) | ❌ No |
| **Tuple Unpack `[y, m, d]`** | **✅ Built-in** | **✅ Built-in** | ❌ No | ❌ No | ❌ No |
| **Object Unpack `{y, m, d}`** | **✅ Built-in** | ❌ No | ❌ No | ❌ No | ❌ No |
| **Date Arithmetic (`add`/`sub`)**| **✅ Fluent & Fast** | ❌ No | ✅ Available | ✅ Available | ⚠️ Function chaining |
| **Boundaries (`startOf`/`endOf`)**| **✅ Built-in** | ❌ No | ✅ Available | ✅ Available | ⚠️ Separate imports |
| **Persian Digits (`۰-۹`)** | **✅ Built-in (`formatFa`)** | ❌ Extra package | ❌ Regex hack | ⚠️ Incomplete | ❌ No |
| **Relative Time (`fromNow`)** | **✅ Built-in (fa)** | ❌ No | ❌ Extra plugin | ⚠️ Legacy | ❌ Separate import |
| **1403 Leap Year Accuracy** | **✅ Exact (30 Esfand)** | ✅ Exact | ⚠️ Inconsistent | ⚠️ Inconsistent | ⚠️ Inconsistent |
| **TypeScript Strictness** | **✅ 100% Strict** | ⚠️ Minimal `.d.ts` | ⚠️ Augmentation | ⚠️ Deprecated | ✅ Typed |
| **Test Coverage** | **🎯 100% (142 unit tests)** | No test suite | Test suite included | Test suite included | Test suite included |

### Architectural Advantages

1. **Zero Required Runtime Dependencies vs Heavy Frameworks**:  
   Eliminates Moment.js (70KB+ maintenance mode) and avoids Day.js plugin chaining boilerplate.
2. **True Native JavaScript `Date` Integration**:  
   Because `PersianDate` inherits from native `Date`, it seamlessly passes `instanceof Date` validations in React, Vue, Ant Design, Material UI, Shadcn UI, and native `JSON.stringify()`.
3. **Dual Unpacking Ergonomics**:  
   Supports both array destructuring `[y, m, d]` and object destructuring `{ year, month, date }`.
4. **33-Year Jalali Cycle Implementation**:  
   Accurately handles 1403 as a 30-day leap year and 1404 as standard.

---

## 📦 Installation

### Package Managers (Node.js, React, Next.js, Vue, Vite)

```bash
# npm
npm install persian-date-native

# pnpm
pnpm add persian-date-native

# yarn
yarn add persian-date-native

# bun
bun add persian-date-native
```

### CDN & Browser Script Tag (No Build Step / jQuery / WordPress / Laravel)

```html
<!-- unpkg (Latest minified bundle) -->
<script src="https://unpkg.com/persian-date-native"></script>

<!-- jsDelivr CDN -->
<script src="https://cdn.jsdelivr.net/npm/persian-date-native"></script>

<!-- esm.sh (Native ES Module) -->
<script type="module">
  import { persianDate } from "https://esm.sh/persian-date-native";
  console.log(persianDate().formatFa("YYYY/MM/DD"));
</script>
```

Loaded via `<script>` tag, the full engine is available globally at **`window.PersianDateNative`**.

### 📚 Framework & Platform Guides

| Platform / Framework | Guide | Runnable Example |
|---|---|---|
| ⚛️ **React** | [React Guide](docs/react.md) | [React Example](examples/react/App.jsx) |
| ▲ **Next.js** (App & Pages) | [Next.js Guide](docs/nextjs.md) | [Next.js Example](examples/nextjs/page.tsx) |
| 💚 **Vue 3 / Nuxt** | [Vue Guide](docs/vue.md) | [Vue Example](examples/vue/App.vue) |
| 🅰️ **Angular** | [Angular Guide](docs/angular.md) | [Angular Example](examples/angular/persian-date.component.ts) |
| 🧡 **Svelte / SvelteKit** | [Svelte Guide](docs/svelte.md) | [Svelte Example](examples/svelte/App.svelte) |
| 🌐 **Vanilla HTML + CDN** | [CDN Guide](docs/browser-cdn.md) | [HTML Example](examples/vanilla/index.html) |
| 🔷 **jQuery** | [jQuery Guide](docs/jquery.md) | [jQuery Example](examples/jquery/index.html) |
| 🔴 **Laravel Blade** | [Laravel Guide](docs/laravel.md) | [Blade Example](examples/laravel-blade/calendar.blade.php) |
| 🔌 **WordPress** | [WordPress Guide](docs/wordpress.md) | [WP Example](examples/wordpress/functions.php) |
| 🐘 **PHP Websites** | [PHP Guide](docs/php.md) | [PHP Guide](docs/php.md) |
| 🤖 **AI Coding Agents** | [AI Agents Guide](docs/ai-agents.md) | [llms.txt](llms.txt) |

---

## 🚀 Quick Start & Unpacking

### 1. Tuple Unpacking (Array `[y, m, d]`)

Exact 1:1 drop-in replacement for `shamsi`:

```typescript
import { gregorianToPersian, persianToGregorian } from "persian-date-native";

// Convert Gregorian to Persian tuple
const [jy, jm, jd] = gregorianToPersian(2024, 9, 2);
console.log(jy, jm, jd); // 1403, 6, 12

// Convert Persian to Gregorian tuple
const [gy, gm, gd] = persianToGregorian(1403, 6, 12);
console.log(gy, gm, gd); // 2024, 9, 2
```

### 2. Object Unpacking (`{ year, month, day }`)

```typescript
import { toPersianDate, toGregorianDate } from "persian-date-native";

// Unpack named fields from any JS Date or timestamp
const { year, month, day } = toPersianDate(new Date("2024-09-02T12:00:00Z"));
console.log(`سال: ${year}، ماه: ${month}، روز: ${day}`); // سال: 1403، ماه: 6، روز: 12

// Convert back to native Date
const nativeDate = toGregorianDate(1403, 6, 12);
console.log(nativeDate.toISOString()); // "2024-09-01T20:30:00.000Z"
```

### 3. Day.js-Style Fluent API

```typescript
import { persianDate } from "persian-date-native";

// Format date with Persian digits
const d = persianDate("1403/06/12 14:30:00");
console.log(d.formatFa("dddd D MMMM YYYY - ساعت HH:mm")); 
// "دوشنبه ۱۲ شهریور ۱۴۰۳ - ساعت ۱۴:۳۰"

// Date arithmetic & relative time
console.log(d.add(10, "days").subtract(1, "month").format("YYYY/MM/DD")); // "1403/05/22"
console.log(d.fromNow()); // "۶ ماه پیش"
```

---

## 🔄 Converting Persian ↔ Gregorian

### Pure Integer Converters (89M+ ops/sec)

```typescript
import { gregorianToPersian, persianToGregorian } from "persian-date-native";

// Single-step astronomical calculations without heap allocations
const [jy, jm, jd] = gregorianToPersian(2024, 9, 2);
const [gy, gm, gd] = persianToGregorian(1403, 6, 12);
```

### Converting `PersianDate` back to Native `Date` / ISO

Because `PersianDate` **extends** native `Date`, no wrapper conversion is necessary:

```typescript
import { persianDate, persianToGregorian } from "persian-date-native";

const pd = persianDate(1403, 6, 12);

// 1. Directly use as standard Date (instanceof Date === true)
const jsDate: Date = pd;
console.log(jsDate.toISOString()); // "2024-09-01T20:30:00.000Z"
console.log(jsDate.toLocaleDateString("en-US")); // "9/2/2024"

// 2. Extract Gregorian tuple
const [gy, gm, gd] = persianToGregorian(pd.getFullYear(), pd.getMonth(), pd.getDate());
console.log(`${gy}/${String(gm).padStart(2, "0")}/${String(gd).padStart(2, "0")}`); // "2024/09/02"

// 3. Switch calendar mode in place
pd.setCalendar("gregorian");
console.log(pd.format("YYYY/MM/DD")); // "2024/09/02"
pd.setCalendar("persian");
console.log(pd.format("YYYY/MM/DD")); // "1403/06/12"
```

---

## 💡 Standalone Alternative to Day.js / Moment

Replace complex Day.js plugin setups with zero-dependency native calls:

```typescript
import { persianDate } from "persian-date-native";

// Instantiation
const d = persianDate("1403/06/12 14:30:00");

// Arithmetic (singular and plural units supported)
d.add(1, "week");        // +7 days
d.subtract(2, "months"); // -2 Persian months
d.add(3, "days");

// Boundary queries
const startOfWeek = persianDate().startOf("week"); // Saturday 00:00:00
const endOfYear   = persianDate().endOf("year");   // 30 Esfand 23:59:59.999 (in leap year)

// Relative time with Persian localization
console.log(persianDate().subtract(3, "days").fromNow()); // "3 روز پیش"
console.log(persianDate().subtract(5, "minutes").fromNow(false, { digits: "fa" })); // "۵ دقیقه پیش"
```

---

## 🎨 Building a Real Persian Calendar UI

```typescript
import { persianDate, toPersianDigits } from "persian-date-native";

export function generateMonthGrid(year: number, month: number) {
  const firstDay = persianDate(year, month, 1);
  const totalDays = firstDay.daysInMonth();
  const startWeekday = firstDay.getDayOfWeek(); // 0 = شنبه, ..., 6 = جمعه

  const days = [];

  // Empty leading cells before the 1st of month
  for (let i = 0; i < startWeekday; i++) {
    days.push({ empty: true });
  }

  // Days in month
  for (let day = 1; day <= totalDays; day++) {
    const date = persianDate(year, month, day);
    days.push({
      empty: false,
      dayNumber: day,
      dayNumberFa: toPersianDigits(day),
      isWeekend: date.isWeekend(), // Friday
      dateString: date.format("YYYY/MM/DD"),
      weekdayName: date.format("dddd"),
    });
  }

  return days;
}

// Example: Render Shahrivar 1403
const grid = generateMonthGrid(1403, 6);
```

---

## 🔌 Day.js Plugin (`jalaliday`)

If your project is already built on Day.js:

```typescript
import dayjs from "dayjs";
import { jalaliday } from "persian-date-native";

dayjs.extend(jalaliday);

// Current Jalali date
const now = dayjs().calendar("jalali");
console.log(now.format("YYYY/MM/DD HH:mm:ss"));

// Parse Jalali string
const custom = dayjs("1403/06/12", { jalali: true } as any);
console.log(custom.format("jYYYY/jMM/jDD (dddd)")); // "1403/06/12 (دوشنبه)"
console.log(custom.daysInMonth()); // 31
```

---

## 🔀 Migration Guides

### Migrating from `shamsi`

```typescript
// BEFORE (shamsi — 2 functions only, no formatting, no Date support)
import * as shamsi from 'shamsi';
const [jy, jm, jd] = shamsi.gregorianToJalali(2024, 9, 2);
const [gy, gm, gd] = shamsi.jalaliToGregorian(1403, 6, 12);

// AFTER (persian-date-native — exact same tuple unpacking + full feature set)
import { gregorianToPersian, persianToGregorian, persianDate } from 'persian-date-native';
const [jy, jm, jd] = gregorianToPersian(2024, 9, 2);  // exact 1:1 match
const [gy, gm, gd] = persianToGregorian(1403, 6, 12); // exact 1:1 match

// PLUS you get full formatting, arithmetic, and native Date:
const formatted = persianDate(1403, 6, 12).formatFa("dddd D MMMM YYYY");
```

### Migrating from `moment-jalaali`

```typescript
// BEFORE (moment-jalaali — 70KB+ bundle, maintenance mode)
import momentJalaali from 'moment-jalaali';
momentJalaali.loadPersian();
const m = momentJalaali('1403/06/12', 'jYYYY/jMM/jDD');
console.log(m.format('jYYYY/jMM/jDD'));
console.log(m.add(10, 'jDay').format('jYYYY/jMM/jDD'));

// AFTER (persian-date-native — 0 dependencies, 2.1x faster)
import { persianDate } from 'persian-date-native';
const d = persianDate('1403/06/12');
console.log(d.format('YYYY/MM/DD'));
console.log(d.add(10, 'days').format('YYYY/MM/DD'));
```

### Migrating from `Day.js + jalaliday`

```typescript
// BEFORE (Day.js + plugins — requires 3+ packages + locale files)
import dayjs from 'dayjs';
import jalaliday from 'jalali-plugin-dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import fa from 'dayjs/locale/fa';
dayjs.extend(jalaliday).extend(utc).extend(relativeTime);
dayjs.locale('fa');
const d = dayjs('1403/06/12', { jalali: true });

// AFTER (persian-date-native — single import, everything built in)
import { persianDate } from 'persian-date-native';
const d = persianDate('1403/06/12');
console.log(d.formatFa()); // "۱۴۰۳/۰۶/۱۲"
console.log(d.fromNow());  // "۶ ماه پیش"
```

### Migrating from `date-fns-jalali`

```typescript
// BEFORE (date-fns-jalali — functional style, no chaining)
import { format, addDays } from 'date-fns-jalali';
const d = new Date('2024-09-02');
console.log(format(d, 'yyyy/MM/dd'));

// AFTER (persian-date-native — chainable, native Date)
import { persianDate } from 'persian-date-native';
const d = persianDate('2024-09-02');
console.log(d.clone().add(10, 'days').format('YYYY/MM/DD'));
```

---

## 📖 Format Tokens

Tokens can be combined with bracketed text `[...]` to escape literals:

```typescript
persianDate.format("[امروز:] dddd DD MMMM YYYY [ساعت] HH:mm");
// "امروز: دوشنبه 12 شهریور 1403 ساعت 14:30"
```

| Token | Output Example | Description |
| :--- | :--- | :--- |
| `YYYY` / `jYYYY` | `1403` | 4-digit Persian year |
| `YY` / `jYY` | `03` | 2-digit Persian year |
| `MMMM` / `jMMMM` | `شهریور` | Full Persian month name |
| `MMM` / `jMMM` | `Shahrivar` / `فرو` | Short / transliterated month name |
| `MM` / `jMM` | `06` | 2-digit month (01–12) |
| `M` / `jM` | `6` | 1-digit month (1–12) |
| `DD` / `jDD` | `12` | 2-digit day of month (01–31) |
| `D` / `jD` | `12` | 1-digit day of month (1–31) |
| `dddd` | `دوشنبه` | Full day of week (شنبه, یکشنبه, ...) |
| `ddd` | `د` | Short day of week |
| `HH` | `14` | 24-hour padded (00–23) |
| `H` | `14` / `9` | 24-hour single-digit (0–23) |
| `hh` | `02` | 12-hour padded (01–12) |
| `h` | `2` | 12-hour format (1–12) |
| `mm` | `30` | Minutes padded (00–59) |
| `m` | `30` / `5` | Minutes single-digit (0–59) |
| `ss` | `05` | Seconds padded (00–59) |
| `s` | `5` | Seconds single-digit (0–59) |
| `SSS` | `042` | Milliseconds (000–999) |
| `a` | `pm` / `am` | Ante / Post meridiem |
| `A` | `PM` / `AM` | Uppercase Ante / Post meridiem |
| `[...]` | `[متن]` | Escaped literal text |

---

## 📚 Complete API Reference

### Standalone Functions

- **`persianDate(...args): PersianDate`**: Factory function (supports all constructor overloads).
- **`gregorianToPersian(gy, gm, gd): [jy, jm, jd]`**: Pure integer conversion from Gregorian to Persian tuple (89M+ ops/sec).
- **`persianToGregorian(jy, jm, jd): [gy, gm, gd]`**: Pure integer conversion from Persian to Gregorian tuple (48M+ ops/sec).
- **`toPersianDate(dateOrTimestamp): { year, month, date, ... }`**: Object unpacking helper.
- **`toGregorianDate(jy, jm, jd): Date`**: Converts Persian components to native `Date`.
- **`toPersianDigits(input: string | number): string`**: Converts English digits (`0-9`) to Persian (`۰-۹`).
- **`replacePersianNumbers(input: string): string`**: Converts Persian digits (`۰-۹`) to English (`0-9`).
- **`isPersianLeapYear(year: number): boolean`**: Accurate 33-year solar cycle leap year checker.
- **`relativeTime(fromTime, toTime, options?): string`**: Persian relative time generator.

### Universal Enterprise Aliases

For teams and legacy codebases accustomed to `jalali` or `shamsi` terminology:

```typescript
import {
  jalaliDate,        // alias for persianDate
  shamsiDate,        // alias for persianDate
  JalaliDate,        // alias for PersianDate class
  ShamsiDate,        // alias for PersianDate class
  gregorianToJalali, // alias for gregorianToPersian
  jalaliToGregorian, // alias for persianToGregorian
  toJalaliDate,      // alias for toPersianDate
  isJalaliLeapYear   // alias for isPersianLeapYear
} from "persian-date-native";
```

### `PersianDate` Class Methods

#### Formatting & Inspection
- **`format(template?: string, options?: { digits?: "en" | "fa" }): string`**: Formats date (default: `"YYYY/MM/DD"`).
- **`formatFa(template?: string): string`**: Formats directly with Persian digits.
- **`toArray(): [year, month, day, hour, min, sec, ms]`**: Returns 7-element date component array.
- **`clone(): PersianDate`**: Creates an exact copy of the instance.

#### Calendar Helpers
- **`getDayOfWeek(): number`**: Persian weekday (0 = Saturday, 1 = Sunday, ..., 6 = Friday).
- **`isWeekend(): boolean`**: Returns `true` if the day is Friday (جمعه).
- **`quarter(): number`**: Returns the Persian quarter (1–4).
- **`isLeapYear(): boolean`**: Checks if the current year is a leap year.
- **`daysInMonth(): number`**: Returns total days in the active month (31, 30, or 29).

#### Relative Time
- **`fromNow(withoutSuffix?, options?): string`**: e.g., `"۳ روز پیش"`.
- **`toNow(withoutSuffix?, options?): string`**: e.g., `"در ۳ روز"`.
- **`from(date, withoutSuffix?, options?): string`**: Relative time from another target date.
- **`to(date, withoutSuffix?, options?): string`**: Relative time to another target date.

#### Arithmetic & Boundaries
- **`add(value, unit)` / `add(unit, value)`**: Adds time. Units: `"year" | "month" | "week" | "day" | "hour" | "minute" | "second"` (singular or plural).
- **`subtract(value, unit)` / `subtract(unit, value)`**: Subtracts time.
- **`startOf(unit)`**: Sets to the beginning of `"year" | "month" | "week" | "day" | "hour" | "minute" | "second"`.
- **`endOf(unit)`**: Sets to the end of `"year" | "month" | "week" | "day" | "hour" | "minute" | "second"`.

#### Comparisons
- **`isBefore(otherDate)`**: Returns `true` if date is before `otherDate`.
- **`isAfter(otherDate)`**: Returns `true` if date is after `otherDate`.
- **`isSame(otherDate, unit?)`**: Checks equality (optionally within unit: `"year"`, `"month"`, `"day"`).
- **`diff(otherDate, unit?)`**: Calculates numeric difference in the specified unit.

---

## 🔬 Leap Year Accuracy: 1403 vs 1404

Traditional algorithms (such as Ahmad Birashk's theoretical 2820-year cycle) mistakenly placed a leap year at **1404** instead of **1403**.

In the official Iranian civil and astronomical calendar, **1403 is a leap year (Esfand has 30 days)**, and 1404 is a standard 29-day year:

```typescript
persianDate(1403, 12, 1).isLeapYear();   // true (30 days in Esfand 1403)
persianDate(1403, 12, 1).daysInMonth();  // 30

persianDate(1404, 12, 1).isLeapYear();   // false (29 days in Esfand 1404)
persianDate(1404, 12, 1).daysInMonth();  // 29
```

---

## 🧪 Testing, Build Verification & Benchmarks

The repository has two complementary quality layers:

- **Source quality**: unit tests with coverage, documentation E2E, example health checks, production build verification, bundle budgets, and `npm pack --dry-run`.
- **Consumer compatibility**: clean registry installs on Linux, macOS, and Windows across Node.js 18, 20, 22, and 24, plus live unpkg/jsDelivr checks.

```bash
# Unit tests + coverage
npm test -- --coverage

# Documentation/browser-page E2E checks
npm run test:e2e

# Framework example health
npm run check:examples

# Production bundles and bundle-budget validation
npm run build
npm run verify:build

# Reproduce the benchmark snapshot
npm run benchmark
```

See [the production-readiness report](docs/final-readiness-report.md) for the current release evidence.

---

## 🚀 Framework Integration Guides & Tutorials

Dedicated, comprehensive guides with runnable examples and copy-paste recipes for every major ecosystem:

| Framework / Ecosystem | Guide & Tutorial | Key Features |
|---|---|---|
| ⚛️ **React** | [React Persian Date Guide](docs/react-persian-date.md) | Component state, custom hooks, Datepicker interop. |
| ▲ **Next.js** | [Next.js Jalali Date Guide](docs/nextjs-jalali-date.md) | App Router, React Server Components (RSC), SSR safe. |
| 💚 **Vue 3** | [Vue 3 Persian Date Guide](docs/vue-persian-date.md) | Composition API, `ref()`, `computed()` reactive arithmetic. |
| 🅰️ **Angular** | [Angular Persian Date Guide](docs/angular-persian-date.md) | Standalone components, custom Pipes, strict TypeScript types. |
| 🧡 **Svelte 5** | [Svelte 5 Persian Date Guide](docs/svelte-persian-date.md) | Modern `$state` runes, zero overhead compiler integration. |
| 💙 **jQuery** | [jQuery Persian Date Guide](docs/jquery-persian-date.md) | Global `window.PersianDateNative`, direct DOM manipulation. |
| 🔷 **WordPress** | [WordPress Persian Date Guide](docs/wordpress-persian-date.md) | `wp_enqueue_script`, theme functions, zero impact on Core Web Vitals. |
| 🔴 **Laravel Blade** | [Laravel Blade Persian Date Guide](docs/laravel-jalali-date.md) | Blade templates, ISO 8601 parsing, Alpine.js / Livewire ready. |
| 🌐 **Vanilla HTML & CDN** | [Vanilla JS & CDN Guide](docs/vanilla-javascript-persian-date.md) | Drop-in `<script>` tag, zero build step required. |
| 🔄 **Moment.js Migration** | [Migrate from `moment-jalaali`](docs/moment-jalaali-migration.md) | 92% smaller bundle, zero dependencies, immutable API. |
| ⚡ **Day.js Migration** | [Migrate from Day.js Plugins](docs/dayjs-jalali-migration.md) | Standalone engine mode or optional `dayjsJalaliPlugin`. |

---

## 📜 Changelog

See [CHANGELOG.md](CHANGELOG.md) for full historical release notes.

- **[v1.3.2]**: Showcase-ready README, evidence-backed quality workflow, release synchronization, and npm release-pipeline repair.
- **[v1.3.1]**: Framework integration matrix and production-readiness documentation refresh.
- **[v1.3.0]**: Enterprise modular static documentation assets (`docs/assets/`), zero-dependency single-pass syntax highlighter (`highlighter.js`), interactive framework playground (`docs/examples.html`), automated E2E testing (`npm run test:e2e`), examples health check suite (`npm run check:examples`), and post-publish CI/CD CDN smoke tests.
- **[v1.2.3]**: Universal runtime architecture (`Symbol.for('nodejs.util.inspect.custom')`), 3-pass Terser bundle optimization (< 5.7 KB Gzip), `sideEffects: false` tree-shaking, automated `verify:build` suite, and OIDC CI/CD publish automation.
- **[v1.2.2]**: Pure integer conversion micro-benchmarks (38.8M ops/sec), bidirectional conversion guides, ISO serialization patterns.
- **[v1.2.1]**: Added `hh` format token (01–12), detailed migration guides (from `moment-jalaali`, `dayjs+jalaliday`, `date-fns-jalali`), ecosystem benchmark matrix.
- **[v1.2.0]**: Zero-dependency pure integer math converters, Persian/English numeral converters, relative time (`fromNow`), and calendar boundary methods (`startOf`, `endOf`, `daysInMonth`).
- **[v1.1.0]**: Day.js plugin architecture (`jalaliPlugin`), Iranian 33-year solar cycle leap year accuracy (1403 leap fix), and 100% test coverage suite.
- **[v1.0.0]**: Initial release of zero-dependency native `Date`-extending Persian date engine.

---

## 📄 License

[ISC](LICENSE) © Mohammad Zolfaghari
