# Persian Date Native vs moment-jalaali

Why modern JavaScript and TypeScript applications are moving away from `moment-jalaali` to `persian-date-native`.

---

## 1. Bundle Size & Performance

- **Bundle Size**: `moment-jalaali` requires the entire legacy Moment.js engine (~72 KB gzipped), causing large bundle sizes and slow mobile load times. `persian-date-native` is **5.70 KB gzipped**, cutting bundle footprint by over **92%**.
- **Execution Speed**: `persian-date-native` achieves **3.8M ops/sec** in instantiation and **38.8M ops/sec** in integer conversions.

---

## 2. API Simplicity & Native Date Inheritance

With `moment-jalaali`, you must learn custom methods and handle separate date wrappers.
With `persian-date-native`:

```typescript
import { persianDate } from "persian-date-native";

const date = persianDate();
console.log(date instanceof Date); // true!
console.log(JSON.stringify({ date })); // Automatically serializes as ISO string!
```
