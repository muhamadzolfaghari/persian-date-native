# Migrating from moment-jalaali to persian-date-native

`moment-jalaali` is large (~70 KB+ minified), heavily stateful, and bundled with obsolete architectures. `persian-date-native` is **zero-dependency (< 5.7 KB gzip)**, faster, and extends native `Date`.

---

## 🔄 API Comparison

| Feature | `moment-jalaali` | `persian-date-native` |
|---|---|---|
| Zero dependencies | ❌ Depends on `moment` | ✅ **Yes (0 dependencies)** |
| Native `Date` inheritance | ❌ Custom wrapper | ✅ **`instanceof Date === true`** |
| Bundle size (Gzip) | ~72 KB | **5.7 KB** (12x lighter) |
| Performance | ~500k ops/sec | **3.8M+ ops/sec** (7x faster) |

---

## 🛠 Step-by-Step Code Migration

### 1. Formatting
```diff
- import moment from 'moment-jalaali';
- moment.loadPersian({ dialect: 'persian-modern' });
- const formatted = moment('2024-09-02').format('jYYYY/jMM/jDD');
+ import { persianDate } from 'persian-date-native';
+ const formatted = persianDate('2024-09-02').format('YYYY/MM/DD');
```

### 2. Relative Time
```diff
- const rel = moment('2024-01-01').fromNow();
+ const rel = persianDate('2024-01-01').fromNow();
```

### 3. Date Arithmetic
```diff
- const nextMonth = moment().add(1, 'jMonth');
+ const nextMonth = persianDate().add(1, 'month');
```
