# Changelog

All notable changes to `persian-date-native` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.2] - 2026-09-18

### ✨ Showcase & Release Quality
- **Professional README positioning**: Curated the first screen around installation, live demo, verified compatibility, engineering differentiators, and reproducible evidence.
- **Evidence-backed quality badge**: Added a dedicated source-quality GitHub Actions workflow covering unit tests with coverage, documentation E2E, framework-example health, build verification, and package dry-run validation.
- **Release synchronization**: Added an idempotent release workflow that validates a version bump, creates the matching Git tag and GitHub Release, and then relies on tag-triggered npm and GitHub Packages publishing.
- **Release pipeline fix**: Ensured `ts-node` is available before script-based E2E/example checks in the npm publish workflow, fixing the failure that blocked v1.3.1 publication.
- **Documentation hygiene**: Removed keyword-stuffing from the public README, softened non-reproducible marketing language, and documented benchmark variability more clearly.

---

## [1.3.1] - 2026-09-18

### 📚 Documentation & Ecosystem Guides
- **Framework Integration Matrix**: Embedded dedicated direct guides into README for React, Next.js App Router (RSC), Vue 3, Angular, Svelte 5, jQuery, WordPress, Laravel Blade, and vanilla HTML/CDN.
- **Production Readiness Deliverables**: Added full suite of release reports (`docs/final-readiness-report.md`, `docs/examples-health-report.md`, `docs/seo-audit.md`, `docs/ai-discovery-report.md`).

---

## [1.3.0] - 2026-09-18

### 🌟 Enterprise Documentation & Modular Asset Architecture
- **Modular Static Assets**: Completely decoupled documentation HTML files into modular `docs/assets/css/` and `docs/assets/js/` bundles for Core Web Vitals performance, browser caching, and Google/Bing crawl optimization.
- **Out-of-the-Box Syntax Highlighter**: Built an ultra-fast, zero-dependency token highlighter in `docs/assets/js/highlighter.js` with light & dark theme token styling in `docs/assets/css/syntax.css`.
- **Framework Interactive Playground**: Overhauled `docs/examples.html` with real-time reactive date state controls for 9 ecosystems (React, Next.js App Router RSC, Vue 3, Angular, Svelte 5, jQuery, Laravel Blade, WordPress Theme, Vanilla HTML/CDN).
- **Infinite Recursion Fix**: Fixed `PersianDate` method inheritance bug when converting `PersianDate` instances within `toPersianDate()`.

### 🩺 Quality Gates & Automated Validation
- **Documentation E2E Test Suite**: Added `npm run test:e2e` (`scripts/test-pages-e2e.ts`) verifying all 6 documentation pages (HTML structure, schema.org, syntax highlighter, and interactive DOM changes).
- **Examples Health Check Suite**: Added `npm run check:examples` (`scripts/verify-examples-health.ts`) validating that all 9 example files exist, import correctly, and execute without runtime errors.
- **Post-Publish CDN Pipeline**: Enhanced GitHub Actions release pipeline (`publish.yml`) with automated post-publish validation testing unpkg, jsDelivr, and browser globals.

### 🔍 Dedicated SEO & AI Discovery Pages
- Added 11 search-intent targeted markdown guides (`docs/react-persian-date.md`, `docs/nextjs-jalali-date.md`, `docs/vue-persian-date.md`, `docs/angular-persian-date.md`, `docs/svelte-persian-date.md`, `docs/jquery-persian-date.md`, `docs/wordpress-persian-date.md`, `docs/laravel-jalali-date.md`, `docs/vanilla-javascript-persian-date.md`, `docs/moment-jalaali-migration.md`, `docs/dayjs-jalali-migration.md`).
- Added comprehensive audit deliverables: `docs/final-readiness-report.md`, `docs/examples-health-report.md`, `docs/seo-audit.md`, and `docs/ai-discovery-report.md`.

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
