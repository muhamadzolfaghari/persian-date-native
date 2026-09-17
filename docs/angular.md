# Using with Angular

`persian-date-native` provides TypeScript type definitions for Angular services, pipes, and components.

---

## 🚀 Installation

```bash
npm install persian-date-native
```

---

## 🅰️ Angular Custom Pipe (`persian-date.pipe.ts`)

```typescript
import { Pipe, PipeTransform } from "@angular/core";
import { persianDate } from "persian-date-native";

@Pipe({
  name: "persianDate",
  standalone: true
})
export class PersianDatePipe implements PipeTransform {
  transform(value: string | number | Date, formatStr: string = "YYYY/MM/DD", digits: "en" | "fa" = "fa"): string {
    if (!value) return "";
    const pDate = persianDate(value);
    return digits === "fa" ? pDate.formatFa(formatStr) : pDate.format(formatStr);
  }
}
```

### In Template:
```html
<p>تاریخ امروز: {{ today | persianDate:'dddd D MMMM YYYY':'fa' }}</p>
```
