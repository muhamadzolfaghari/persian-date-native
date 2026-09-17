# Changelog

All notable changes to `persian-date-native` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.3] - 2026-09-18

### 🚀 Performance & Packaging
- **Universal Runtime Architecture**: Replaced Node.js `util` dependency with standard `Symbol.for('nodejs.util.inspect.custom')`, enabling seamless execution across browsers, Cloudflare Workers, Deno, Bun, and Node.js without polyfills.
- **Rollup & Terser Compression**: Enhanced Rollup pipeline with 3-pass Terser compression, pure getter annotations, and dead-code elimination (esm: **5.70 KB** gzip / **5.22 KB** brotli).
- **Package Configuration**: Added `"sideEffects": false` and modern `"exports"` map for optimal tree-shaking in Webpack 5, Vite, Turbopack, and Rollup.
- **Automated Verification Suite**: Added `npm run verify:build` (`scripts/verify-build.ts`) to programmatically validate bundle size budgets, TypeScript typings, CJS/ESM dual exports, and runtime behavior.
- **CI/CD Automation**: Configured GitHub Actions for tag-triggered automated OIDC npm publishing (`publish.yml`) and GitHub Packages publishing (`github-package-publish.yml`).

---

## [1.2.2] - 2026-09-17

### ⚡ Added & Enhanced
- **High-Throughput Conversion Benchmarks**: Added section 9 micro-benchmarks demonstrating:
  - `gregorianToPersian`: **38.8M ops/sec**
  - `persianToGregorian`: **22.5M ops/sec**
  - Bidirectional round-trip: **13.7M ops/sec**
- **Documentation Expansion**: Added comprehensive bidirectional conversion guides, ISO 8601 string generation patterns, and JSON serialization documentation.

---

## [1.2.1] - 2026-09-17

### 🛠 Added
- **`hh` Format Token**: Added padded 12-hour format token (`01`–`12`) in addition to `h` (`1`–`12`), `HH` (`00`–`23`), and `H` (`0`–`23`).
- **Migration Guides**: Added comprehensive step-by-step migration guides from `moment-jalaali`, `dayjs + jalaliday`, and `date-fns-jalali`.
- **Ecosystem Comparison Table**: Added detailed feature and bundle-size comparison matrix with competing libraries.

---

## [1.2.0] - 2026-09-16

### 🌟 Added
- **Pure Integer Converters**: Added zero-allocation pure math converters:
  - `gregorianToPersian(gYear, gMonth, gDay)` -> `[pYear, pMonth, pDay]`
  - `persianToGregorian(pYear, pMonth, pDay)` -> `[gYear, gMonth, gDay]`
- **Persian Digits & Typography**:
  - `toPersianDigits(input)` / `toPersian(input)`: Converts English numerals to Persian (`۰-۹`).
  - `replacePersianNumbers(input)`: Converts Persian numerals to English (`0-9`).
- **Relative Time Generator**: Added `fromNow()`, `toNow()`, `from()`, `to()`, and standalone `relativeTime()`.
- **Calendar Boundaries & Arithmetic**:
  - Added `startOf()`, `endOf()`, `add()`, `subtract()`.
  - Added `daysInMonth()`, `quarter()`, `isWeekend()`, `getDayOfWeek()`.
- **Date Comparisons**: Added `isBefore()`, `isAfter()`, `isSame()`, and `diff()`.

---

## [1.1.0] - 2026-09-16

### ✨ Added
- **Day.js Plugin Architecture**: Seamless `dayjs.extend(jalaliPlugin)` integration enabling `.calendar('jalali')` on Day.js instances.
- **Astronomical Leap Year Accuracy**: Fixed civil calendar 33-year cycle leap year validation (correctly marking **1403 as leap** with 30 days in Esfand, and 1404 as normal with 29 days).
- **Test Suite**: Built comprehensive 17-suite Jest test harness with **100% code coverage** across statements, branches, functions, and lines.

---

## [1.0.0] - 2026-09-15

### 🎉 Initial Release
- **Core Native Engine**: `PersianDate` class directly subclassing JavaScript `Date`.
- Zero required runtime dependencies.
- Dual CJS and ESM bundle distribution.
- TypeScript first-class support with exported type definitions.
