# React Persian (Jalali / Shamsi) Date Guide

> Complete guide to formatting, calculating, and managing Persian dates in React applications using `persian-date-native`.

## Why `persian-date-native` for React?
- **Subclasses native `Date`**: Compatible with React state, props, date pickers, and chart libraries.
- **Zero Dependencies**: Keeps React production bundle lightweight (5.7 KB Gzipped).
- **Fast Re-renders**: Sub-microsecond execution prevents UI lag during frequent state updates.

## Installation
```bash
npm install persian-date-native
```

## Basic React Component
```tsx
import React from "react";
import { persianDate } from "persian-date-native";

interface DateBadgeProps {
  date?: Date | string | number;
}

export function PersianDateBadge({ date }: DateBadgeProps) {
  const p = persianDate(date);

  return (
    <div className="persian-badge" dir="rtl">
      <span className="full-date">{p.formatFa("dddd D MMMM YYYY")}</span>
      <span className="relative-time">({p.fromNowFa()})</span>
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
Test and run live React examples in the [Interactive Framework Playground](https://muhamadzolfaghari.github.io/persian-date-native/examples.html).
