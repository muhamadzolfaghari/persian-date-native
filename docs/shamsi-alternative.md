# Replacing shamsi with persian-date-native

> The legacy `shamsi` package is unmaintained, returns plain object structures without helper methods, and does not inherit from JavaScript's native `Date`.

## Comparison
| Feature | `shamsi` | `persian-date-native` |
| :--- | :--- | :--- |
| **Object Type** | Plain Object `{year, month, date}` | **Subclasses `Date` (`instanceof Date`)** |
| **Methods** | Only 2 conversion functions | **format, formatFa, add, subtract, fromNow, etc.** |
| **Integer Tuples** | ❌ No | **✅ Yes: `[jy, jm, jd]` (89M+ ops/sec)** |
| **TypeScript** | Community types | **First-party types included** |

## Migration
```typescript
// Old (shamsi)
import shamsi from "shamsi";
const j = shamsi.gregorianToJalali(2024, 9, 2);

// New (persian-date-native)
import { gregorianToPersian, toPersianDate, persianDate } from "persian-date-native";

// 1. Fast tuple
const [jy, jm, jd] = gregorianToPersian(2024, 9, 2); // [1403, 6, 12]

// 2. Object format
const { year, month, day } = toPersianDate(new Date(2024, 8, 2));

// 3. Full instance with formatters
const p = persianDate(new Date(2024, 8, 2));
console.log(p.formatFa("D MMMM YYYY"));
```
