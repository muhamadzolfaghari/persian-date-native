# Using with Next.js (App Router & Pages Router)

`persian-date-native` is fully compatible with Next.js 13, 14, and 15, supporting both React Server Components (RSC) and Client Components.

---

## 🚀 Installation

```bash
npm install persian-date-native
```

---

## ⚡ Server Component Example (App Router: `app/page.tsx`)

Because `persian-date-native` uses standard JavaScript and zero browser-only globals, it runs natively on the Node.js / Edge server:

```tsx
import { persianDate, gregorianToPersian } from "persian-date-native";

export default function ServerPage() {
  const serverTime = persianDate();
  const [jy, jm, jd] = gregorianToPersian(2024, 9, 2);

  return (
    <main dir="rtl" className="p-8">
      <h1 className="text-2xl font-bold">تاریخ امروز در سرور نکس‌جی‌اس</h1>
      <p className="mt-2 text-lg">{serverTime.formatFa("dddd D MMMM YYYY")}</p>
      <p className="text-sm text-gray-500">تاریخ تبدیل شده: {jy}/{jm}/{jd}</p>
    </main>
  );
}
```

---

## 💻 Client Component Example (`app/components/PersianPicker.tsx`)

```tsx
"use client";

import { useState } from "react";
import { persianDate } from "persian-date-native";

export function PersianPicker() {
  const [selected, setSelected] = useState(() => persianDate());

  return (
    <div className="flex gap-2">
      <button 
        onClick={() => setSelected((prev) => persianDate(prev).subtract(1, "day"))}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        روز قبل
      </button>
      <span className="font-semibold">{selected.formatFa("YYYY/MM/DD")}</span>
      <button 
        onClick={() => setSelected((prev) => persianDate(prev).add(1, "day"))}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        روز بعد
      </button>
    </div>
  );
}
```
