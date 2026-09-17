# Day.js Jalali Plugin Guide with persian-date-native

> `persian-date-native` includes a first-class plugin for Day.js: `jalaliPlugin`.

## Installation
```bash
npm install dayjs persian-date-native
```

## Setup & Usage
```typescript
import dayjs from "dayjs";
import { jalaliPlugin } from "persian-date-native";

// Extend Day.js with native Jalali engine
dayjs.extend(jalaliPlugin);

// Set Jalali calendar mode
const d = dayjs().calendar("jalali");

console.log(d.format("YYYY/MM/DD")); // e.g. "1403/06/15"
console.log(d.year());               // 1403
console.log(d.month());              // 6
console.log(d.date());               // 15
```

## Why use `persian-date-native` with Day.js?
- **Shared Engine**: Uses the exact same sub-microsecond integer converter.
- **Accurate Leap Years**: Automatically handles 1403 leap year calculations without desyncing from Gregorian time.
