# Using with Node.js & Backend Services

`persian-date-native` works with Node.js, Express, Fastify, NestJS, Cloudflare Workers, Deno, and Bun.

---

## 🚀 Installation

```bash
npm install persian-date-native
```

---

## 🛠 CommonJS & ESM Usage

### CommonJS
```javascript
const { persianDate, gregorianToPersian, toGregorianDate } = require("persian-date-native");

const date = persianDate();
console.log("Jalali:", date.format("YYYY/MM/DD"));

// Convert user submitted Jalali date back to JS Date for database saving:
const dbDate = toGregorianDate(1403, 6, 12);
console.log("Save to DB:", dbDate.toISOString());
```

### ESM / TypeScript
```typescript
import { persianDate, toPersianDate } from "persian-date-native";

export function formatApiTimestamp(utcDate: Date): string {
  const pDate = persianDate(utcDate);
  return pDate.formatFa("YYYY/MM/DD HH:mm");
}
```
