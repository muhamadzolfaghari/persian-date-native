# React Persian (Jalali / Shamsi) Date Guide

## 1. Problem
How do you reliably handle, format, and manipulate Persian (Solar Hijri / Jalali / Shamsi) dates in modern React (Vite, CRA, Next.js client components) without bloating your bundle with legacy libraries like `moment`?

## 2. Installation
```bash
npm install persian-date-native
```

## 3. Example
```tsx
import React, { useState } from "react";
import { persianDate, PersianDate } from "persian-date-native";

export function PersianCalendarCard() {
  const [current, setCurrent] = useState<PersianDate>(() => persianDate());

  return (
    <div dir="rtl" className="p-4 border rounded-xl shadow-lg font-sans">
      <h2 className="text-xl font-bold text-blue-600">
        {current.formatFa("dddd D MMMM YYYY")}
      </h2>
      <p className="text-gray-500 mt-1">
        روزهای این ماه: {current.daysInMonth()} روز | سال کبیسه: {current.isLeapYear() ? "بله" : "خیر"}
      </p>
      <div className="flex gap-2 mt-4">
        <button 
          onClick={() => setCurrent(persianDate(current).subtract(1, "month"))}
          className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          ماه قبل
        </button>
        <button 
          onClick={() => setCurrent(persianDate())}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          امروز
        </button>
        <button 
          onClick={() => setCurrent(persianDate(current).add(1, "month"))}
          className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          ماه بعد
        </button>
      </div>
    </div>
  );
}
```

## 4. Why Use `persian-date-native`?
- **Zero Dependencies**: Zero external dependencies — pure, self-contained algorithms.
- **Native `Date` Compatibility**: Subclasses JavaScript's native `Date`, so it integrates seamlessly with state, date pickers, and chart libraries.
- **First-Class TypeScript**: Comprehensive types built-in with zero configuration.
- **Ultra-Fast & Lightweight**: 89M+ ops/sec throughput and only 5.7 KB Gzipped.

## 5. Migration Guide

### Before (`moment-jalaali`):
```tsx
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });

const formatted = moment(date).format("jYYYY/jMM/jDD");
const nextMonth = moment(date).add(1, "jMonth");
```

### After (`persian-date-native`):
```tsx
import { persianDate } from "persian-date-native";

const formatted = persianDate(date).formatFa("YYYY/MM/DD");
const nextMonth = persianDate(date).add(1, "month");
```
