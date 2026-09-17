# Next.js Jalali (Persian) Date Guide — App Router & RSC

## 1. Problem
How do you render Persian (Shamsi / Jalali) dates across React Server Components (RSC), SSR pages, and client components in Next.js without hydration mismatches or heavy client bundle sizes?

## 2. Installation
```bash
npm install persian-date-native
```

## 3. Example
```tsx
// app/page.tsx (Next.js App Router Server Component)
import { persianDate, gregorianToPersian } from "persian-date-native";

export default function Page() {
  const serverTime = persianDate();
  const [jy, jm, jd] = gregorianToPersian(2024, 9, 2);

  return (
    <main dir="rtl" className="p-8 font-sans">
      <h1 className="text-2xl font-bold text-gray-900">
        تاریخ سرور: {serverTime.formatFa("dddd D MMMM YYYY - HH:mm")}
      </h1>
      <p className="text-gray-600 mt-2">
        تبدیل بدون تخصیص حافظه: {jy}/{jm}/{jd}
      </p>
    </main>
  );
}
```

## 4. Why Use `persian-date-native`?
- **Server & RSC Safe**: Pure deterministic mathematical algorithms with zero Node.js or browser environment bindings.
- **Zero Hydration Mismatches**: Calculates exact dates identically on both server and client.
- **Full Tree-Shaking**: Dual ESM/CJS exports with `"sideEffects": false`.
- **Zero Runtime Dependencies**: No hidden transitive packages in your deployment artifact.

## 5. Migration Guide

### Before (`moment-jalaali`):
```tsx
import moment from "moment-jalaali";
// Moment is not optimal for Server Components (large footprint, mutable state)
const serverDate = moment().format("jYYYY/jMM/jDD");
```

### After (`persian-date-native`):
```tsx
import { persianDate } from "persian-date-native";

const serverDate = persianDate().formatFa("YYYY/MM/DD");
```
