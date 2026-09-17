# Using with React

`persian-date-native` works out of the box in React 18, React 19, Vite, and Create React App.

---

## 🚀 Installation

```bash
npm install persian-date-native
```

---

## ⚛️ Basic React Component

```tsx
import React, { useState, useEffect } from "react";
import { persianDate } from "persian-date-native";

export const PersianClock: React.FC = () => {
  const [time, setTime] = useState(() => persianDate());

  useEffect(() => {
    const timer = setInterval(() => setTime(persianDate()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 border rounded shadow" dir="rtl">
      <h2 className="text-xl font-bold">{time.formatFa("dddd D MMMM YYYY")}</h2>
      <p className="text-gray-600">ساعت: {time.formatFa("HH:mm:ss")}</p>
    </div>
  );
};
```

---

## 🪝 Custom Hook: `usePersianDate`

```typescript
import { useState, useEffect } from "react";
import { persianDate, PersianDate } from "persian-date-native";

export function usePersianDate(dateInput?: string | number | Date) {
  const [date, setDate] = useState<PersianDate>(() => persianDate(dateInput));

  useEffect(() => {
    setDate(persianDate(dateInput));
  }, [dateInput]);

  return {
    date,
    formatted: date.format("YYYY/MM/DD"),
    formattedFa: date.formatFa("YYYY/MM/DD"),
    relative: date.fromNow(),
    isLeap: date.isLeapYear(),
  };
}
```
