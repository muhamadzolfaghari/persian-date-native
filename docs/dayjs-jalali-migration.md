# Migrating from Day.js Jalali Plugins to `persian-date-native`

## 1. Problem
Traditional Day.js Jalali plugins often suffer from incomplete leap year calculation cycles, plugin configuration boilerplate, or inconsistent bundle setups between client and server.

## 2. Installation
```bash
npm install persian-date-native
```

## 3. Example
```javascript
// Standalone Usage (No Day.js required!)
import { persianDate, gregorianToPersian } from "persian-date-native";

const date = persianDate();
console.log(date.formatFa("dddd D MMMM YYYY"));

// If you still want to use Day.js, persian-date-native also provides a Day.js plugin!
import dayjs from "dayjs";
import { dayjsJalaliPlugin } from "persian-date-native";

dayjs.extend(dayjsJalaliPlugin);
const d = dayjs().calendar("jalali");
console.log(d.format("YYYY/MM/DD"));
```

## 4. Why Use `persian-date-native`?
- **Universal Zero-Dependency Mode**: Use standalone without requiring Day.js or any other date core.
- **Optional Day.js Plugin**: Keep Day.js syntax if desired, or switch entirely to the native subclass.
- **Astronomical Precision**: Fully verified leap year algorithm.
- **Fast Execution**: 89M+ ops/sec throughput.

## 5. Migration Guide

### Before (`jalaliday` or custom dayjs plugin):
```javascript
import dayjs from "dayjs";
import jalaliday from "jalaliday";
dayjs.extend(jalaliday);

const d = dayjs().calendar("jalali").format("YYYY/MM/DD");
```

### After (`persian-date-native`):
```javascript
import { persianDate } from "persian-date-native";

const d = persianDate().formatFa("YYYY/MM/DD");
```
