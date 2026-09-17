# React Persian (Jalali / Shamsi) Date Guide

> Complete guide to formatting, calculating, and managing Persian dates in React applications using `persian-date-native`.

## Why `persian-date-native` for React?
- **Subclasses native `Date`**: Seamlessly compatible with React state, props, date pickers, and chart libraries.
- **Zero Dependencies**: Keeps React production bundle lightweight (~5.7 KB Gzipped).
- **Ultra-Fast Re-renders**: Sub-microsecond execution prevents UI lag during frequent state updates.

## Installation
```bash
npm install persian-date-native
```

## Basic React Component
```tsx
import React, { useState } from "react";
import { persianDate } from "persian-date-native";

export function PersianCalendarCard() {
  const [date, setDate] = useState(() => persianDate());

  return (
    <div dir="rtl" className="p-4 border rounded-xl shadow-lg">
      <h2 className="text-xl font-bold">{date.formatFa("dddd D MMMM YYYY")}</h2>
      <p className="text-gray-500">روزهای این ماه: {date.daysInMonth()} روز</p>
      <div className="flex gap-2 mt-4">
        <button onClick={() => setDate(persianDate(date).subtract(1, "month"))}>ماه قبل</button>
        <button onClick={() => setDate(persianDate(date).add(1, "month"))}>ماه بعد</button>
      </div>
    </div>
  );
}
```

## Custom React Hook for Live Persian Clock
```tsx
import { useState, useEffect } from "react";
import { persianDate, PersianDate } from "persian-date-native";

export function useLivePersianDate(intervalMs = 1000): PersianDate {
  const [currentDate, setCurrentDate] = useState<PersianDate>(() => persianDate());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(persianDate());
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  return currentDate;
}
```

## Interactive Playground
Try and test live React code in the [Interactive Framework Playground](https://muhamadzolfaghari.github.io/persian-date-native/examples.html).
