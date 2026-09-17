# Migrating from `moment-jalaali` to `persian-date-native`

## 1. Problem
`moment-jalaali` is built on top of `moment.js` (now declared a legacy, maintenance-only project by its authors). It weighs ~72 KB, lacks modern tree-shaking, uses mutable date objects, and causes significant bundle bloat in modern web applications.

## 2. Installation
```bash
# Uninstall heavy legacy moment
npm uninstall moment moment-jalaali

# Install zero-dependency native engine
npm install persian-date-native
```

## 3. Example
```javascript
import { persianDate, PersianDate, gregorianToPersian } from "persian-date-native";

// 1. Current Persian date
const now = persianDate();
console.log(now.formatFa("dddd D MMMM YYYY"));

// 2. Specific date
const specific = new PersianDate(1403, 6, 12);
console.log(specific.format("YYYY/MM/DD")); // "1403/06/12"

// 3. Zero-allocation integer conversion
const [jy, jm, jd] = gregorianToPersian(2024, 9, 2);
console.log(jy, jm, jd); // 1403, 6, 12
```

## 4. Why Use `persian-date-native`?
- **92% Smaller**: 5.7 KB Gzipped vs 72 KB for Moment + Jalaali.
- **Zero Dependencies**: 0 runtime dependencies.
- **Subclasses Native `Date`**: Inherits standard JavaScript `Date` methods.
- **Immutable Arithmetic**: `.add()` and `.subtract()` return fresh instances, eliminating mutation bugs.

## 5. Migration Guide

| Action | Before (`moment-jalaali`) | After (`persian-date-native`) |
| :--- | :--- | :--- |
| **Instantiate Now** | `moment()` | `persianDate()` |
| **Specific Date** | `moment('1403/06/12', 'jYYYY/jMM/jDD')` | `new PersianDate(1403, 6, 12)` |
| **Persian Format** | `m.format('jYYYY/jMM/jDD')` | `p.formatFa('YYYY/MM/DD')` |
| **Add Time** | `m.add(7, 'days')` (mutates) | `p.add(7, 'days')` (immutable) |
| **From Now** | `m.fromNow()` | `p.fromNow()` |
| **Leap Year** | `m.isLeapYear()` | `p.isLeapYear()` |
