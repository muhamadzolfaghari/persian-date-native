# Migrating from moment-jalaali to persian-date-native

> `moment-jalaali` is in maintenance mode and adds over 70KB to bundle sizes. Learn how to migrate to `persian-date-native` with 0 dependencies and a 5.7KB Gzipped bundle.

## Comparison Table
| Feature | `moment-jalaali` | `persian-date-native` |
| :--- | :--- | :--- |
| **Active Maintenance** | ⚠️ Maintenance Mode | ✅ Active, Modern |
| **Dependencies** | `moment` (~70 KB) | **0 Dependencies** |
| **Bundle Size (Gzip)** | ~72 KB | **5.7 KB** |
| **Inherits `Date`** | ❌ No | ✅ Yes (`instanceof Date`) |
| **Speed** | Slow (~120K ops/s) | **Ultra-Fast (89M+ ops/s)** |
| **1403 Leap Year** | Requires manual config | **Built-in astronomical rule** |

## API Replacement Guide

### 1. Formatting
```typescript
// Old
import moment from "moment-jalaali";
moment.loadPersian();
const dateStr = moment().format("jYYYY/jMM/jDD");

// New
import { persianDate } from "persian-date-native";
const dateStr = persianDate().format("YYYY/MM/DD");
const dateStrFa = persianDate().formatFa("YYYY/MM/DD");
```

### 2. Relative Time (`fromNow`)
```typescript
// Old
const rel = moment("1403/01/01", "jYYYY/jMM/jDD").fromNow();

// New
const rel = persianDate(1403, 1, 1).fromNow();
const relFa = persianDate(1403, 1, 1).fromNowFa();
```

### 3. Leap Year Check
```typescript
// Old
const isLeap = moment.jIsLeapYear(1403);

// New
import { isPersianLeapYear } from "persian-date-native";
const isLeap = isPersianLeapYear(1403); // true (1403 is leap)
```
