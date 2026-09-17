# Migrating from dayjs (jalaliday) to persian-date-native

`persian-date-native` can either be used as a drop-in Day.js plugin (`dayjs.extend(jalaliPlugin)`) or directly as a standalone engine without needing Day.js at all!

---

## ⚡ Direct Standalone Migration (Drop Day.js entirely)

```diff
- import dayjs from 'dayjs';
- import jalaliday from 'jalaliday';
- dayjs.extend(jalaliday);
- const d = dayjs().calendar('jalali').format('YYYY/MM/DD');

+ import { persianDate } from 'persian-date-native';
+ const d = persianDate().format('YYYY/MM/DD');
```

---

## 🔌 Or Use as Day.js Plugin

If your codebase heavily relies on Day.js:

```typescript
import dayjs from "dayjs";
import { jalaliPlugin } from "persian-date-native";

dayjs.extend(jalaliPlugin);

const d = dayjs().calendar("jalali");
console.log(d.format("YYYY/MM/DD")); // 1403/06/12
```
