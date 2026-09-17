# Next.js Jalali (Persian) Date Guide — App Router & RSC

> High-performance Persian (Jalali / Shamsi) date handling for Next.js 13+, 14+, and 15+ with React Server Components (RSC) and Client Components.

## Why `persian-date-native` for Next.js?
- **RSC & SSR Safe**: Pure zero-dependency algorithm executes deterministically on Node.js/Edge servers and in the browser.
- **Zero Hydration Mismatches**: Matches date calculations identically on server and client.
- **Tree-Shakeable**: Exports individual functions for optimal bundle sizes.

## Installation
```bash
npm install persian-date-native
```

## Next.js App Router Server Component (`app/page.tsx`)
```tsx
import { persianDate, gregorianToPersian } from "persian-date-native";

export default function Page() {
  const serverTime = persianDate();
  const [jy, jm, jd] = gregorianToPersian(2024, 9, 2);

  return (
    <main dir="rtl" className="p-8 font-sans">
      <h1 className="text-2xl font-bold">
        تاریخ سرور: {serverTime.formatFa("dddd D MMMM YYYY - HH:mm")}
      </h1>
      <p className="text-gray-600 mt-2">
        تبدیل بدون وابستگی: {jy}/{jm}/{jd}
      </p>
    </main>
  );
}
```

## Next.js Client Component (`app/components/PersianPicker.tsx`)
```tsx
"use client";

import { useState } from "react";
import { persianDate } from "persian-date-native";

export function PersianPicker() {
  const [date, setDate] = useState(() => persianDate());

  return (
    <div dir="rtl" className="flex items-center gap-4">
      <span>{date.formatFa("YYYY/MM/DD")}</span>
      <button onClick={() => setDate(persianDate(date).add(1, "day"))}>
        روز بعد
      </button>
    </div>
  );
}
```

## Live Examples
Explore live runnable code in the [Framework Playground](https://muhamadzolfaghari.github.io/persian-date-native/examples.html).
