# Angular Persian (Jalali) Date Guide

## 1. Problem
How do you format and calculate Persian dates in Angular Standalone Components and custom Pipes with full TypeScript type safety?

## 2. Installation
```bash
npm install persian-date-native
```

## 3. Example
```typescript
import { Component, Pipe, PipeTransform } from "@angular/core";
import { persianDate, PersianDate } from "persian-date-native";

@Pipe({
  name: "persianDate",
  standalone: true
})
export class PersianDatePipe implements PipeTransform {
  transform(value: Date | string | number | null, format = "YYYY/MM/DD"): string {
    if (!value) return "";
    return persianDate(value).formatFa(format);
  }
}

@Component({
  selector: "app-persian-demo",
  standalone: true,
  imports: [PersianDatePipe],
  template: `
    <div dir="rtl" class="angular-box">
      <h2>تاریخ: {{ today | persianDate:'dddd D MMMM YYYY' }}</h2>
      <p>کبیسه: {{ today.isLeapYear() ? 'بله' : 'خیر' }}</p>
    </div>
  `
})
export class PersianDemoComponent {
  today: PersianDate = persianDate();
}
```

## 4. Why Use `persian-date-native`?
- **Zero Dependencies**: Keeps Angular enterprise bundles free of heavy legacy wrappers.
- **Native Date Inheritance**: Works seamlessly with Angular pipes, reactive forms, and validators.
- **Strict TypeScript Types**: Ships `.d.ts` declaration files out of the box.
- **Blazing Speed**: 89M+ ops/sec throughput guarantees zero UI bottlenecks.

## 5. Migration Guide

### Before (`moment-jalaali`):
```typescript
import * as moment from "moment-jalaali";
const formatted = moment(val).format("jYYYY/jMM/jDD");
```

### After (`persian-date-native`):
```typescript
import { persianDate } from "persian-date-native";
const formatted = persianDate(val).formatFa("YYYY/MM/DD");
```
