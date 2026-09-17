# Migrating from `moment-jalaali` to `persian-date-native`

> Lightweight, zero-dependency, modern ES Modules & TypeScript migration guide.

## Why Migrate?

| Feature | `moment-jalaali` | `persian-date-native` |
| :--- | :--- | :--- |
| **Gzip Bundle Size** | ~72 KB (Moment + Jalaali) | **5.7 KB** (92% smaller) |
| **Dependencies** | Requires heavy `moment` runtime | **Zero dependencies** |
| **Native Date Inheritance** | Custom wrapper object | Subclasses native JavaScript `Date` |
| **Tree-Shaking** | ❌ No | ✅ Full ESM tree-shaking |
| **Performance** | ~450K ops/sec | **89M+ ops/sec** |

---

## Migration Cheatsheet

### 1. Installation
```bash
# Remove heavy legacy moment
npm uninstall moment moment-jalaali

# Install zero-dependency native engine
npm install persian-date-native
```

### 2. Creation & Instantiation
```javascript
// BEFORE (moment-jalaali)
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });
const m = moment("1403/06/12", "jYYYY/jMM/jDD");

// AFTER (persian-date-native)
import { persianDate, PersianDate } from "persian-date-native";
const p = new PersianDate(1403, 6, 12);
// or factory:
const p2 = persianDate(1403, 6, 12);
```

### 3. Formatting
```javascript
// BEFORE
m.format("jYYYY/jMM/jDD"); // "1403/06/12"
m.format("jD jMMMM jYYYY"); // "12 شهریور 1403"

// AFTER
p.format("YYYY/MM/DD");     // "1403/06/12" (English digits)
p.formatFa("YYYY/MM/DD");   // "۱۴۰۳/۰۶/۱۲" (Persian digits)
p.formatFa("D MMMM YYYY");  // "۱۲ شهریور ۱۴۰۳"
```

### 4. Date Arithmetic
```javascript
// BEFORE (Mutable)
m.add(7, "days");
m.subtract(1, "months");

// AFTER (Immutable)
const nextWeek = p.add(7, "days");
const prevMonth = p.subtract(1, "months");
```

### 5. Conversion (Pure Integers)
```javascript
// BEFORE
const m = moment("2024-09-02");
const jy = m.jYear();
const jm = m.jMonth() + 1;
const jd = m.jDate();

// AFTER (0-allocation pure array destructuring)
import { gregorianToPersian, persianToGregorian } from "persian-date-native";

const [jy, jm, jd] = gregorianToPersian(2024, 9, 2); // [1403, 6, 12]
const [gy, gm, gd] = persianToGregorian(1403, 6, 12); // [2024, 9, 2]
```
