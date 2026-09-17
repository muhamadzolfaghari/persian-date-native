# Getting Started with Persian Date Native

`persian-date-native` is a high-performance, zero-dependency Persian (Jalali / Solar Hijri / Shamsi) date engine for JavaScript and TypeScript. It inherits directly from native JavaScript `Date`, making it universally compatible across all JavaScript runtimes and UI frameworks.

---

## 📦 Installation

### npm / pnpm / yarn / bun
```bash
npm install persian-date-native
# or
pnpm add persian-date-native
# or
yarn add persian-date-native
# or
bun add persian-date-native
```

### CDN & Browser Script Tag (No Build Step)
```html
<!-- unpkg -->
<script src="https://unpkg.com/persian-date-native"></script>

<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/persian-date-native"></script>
```

---

## ⚡ Quick Start

### 1. Modern ESM / TypeScript
```typescript
import { persianDate, gregorianToPersian, toPersianDate } from "persian-date-native";

// Format current date in Persian
const now = persianDate();
console.log(now.format("YYYY/MM/DD"));   // e.g. "1403/06/12"
console.log(now.formatFa("YYYY/MM/DD")); // e.g. "۱۴۰۳/۰۶/۱۲"

// Zero-allocation pure integer conversion
const [jy, jm, jd] = gregorianToPersian(2024, 9, 2);
console.log(jy, jm, jd); // 1403, 6, 12

// Unpack Persian date object
const { year, month, day } = toPersianDate(new Date());
console.log(year, month, day);
```

### 2. CommonJS (Node.js)
```javascript
const { persianDate, gregorianToPersian } = require("persian-date-native");

const date = persianDate("1403/06/12");
console.log(date.toISOString());
```

### 3. Browser Script Tag (`window.PersianDateNative`)
```html
<script src="https://unpkg.com/persian-date-native"></script>
<script>
  const { persianDate, toPersianDigits } = window.PersianDateNative;
  const today = persianDate();
  document.getElementById("output").innerText = today.formatFa("dddd D MMMM YYYY");
</script>
```

---

## 🗺 Documentation Map

- [Browser & CDN Usage](browser-cdn.md)
- [React Guide](react.md)
- [Next.js Guide](nextjs.md)
- [Vue Guide](vue.md)
- [Angular Guide](angular.md)
- [Svelte Guide](svelte.md)
- [jQuery Guide](jquery.md)
- [Node.js Guide](node.md)
- [Laravel Guide](laravel.md)
- [WordPress Guide](wordpress.md)
- [PHP Websites](php.md)
- [AI Coding Assistants Guide](ai-agents.md)
- [Migration Guides](migration/moment-jalaali.md)
- [Comparison Matrix](comparison/best-jalali-library.md)
