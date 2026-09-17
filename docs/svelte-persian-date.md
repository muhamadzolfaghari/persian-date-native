# Svelte 5 Persian (Jalali) Date Guide

## 1. Problem
How do you implement reactive Persian dates, calendars, and countdowns in Svelte 5 using modern `$state` runes?

## 2. Installation
```bash
npm install persian-date-native
```

## 3. Example
```svelte
<script>
  import { persianDate } from "persian-date-native";

  let date = $state(persianDate());

  function nextDay() {
    date = persianDate(date).add(1, "day");
  }

  function prevDay() {
    date = persianDate(date).subtract(1, "day");
  }
</script>

<div dir="rtl" class="svelte-card">
  <h2>{date.formatFa("dddd D MMMM YYYY")}</h2>
  <p>روزهای این ماه: {date.daysInMonth()} روز</p>
  <div class="buttons">
    <button onclick={prevDay}>روز قبل</button>
    <button onclick={nextDay}>روز بعد</button>
  </div>
</div>
```

## 4. Why Use `persian-date-native`?
- **Zero Overhead**: Aligns with Svelte's compile-time minimalist philosophy.
- **Svelte 5 Runes Ready**: Immutable operations trigger `$state` updates effortlessly.
- **Microsecond Execution**: No lag even with high-frequency animation timers.
- **Native Date Compatibility**: Subclasses `Date` for direct interoperability.

## 5. Migration Guide

### Before (`moment-jalaali`):
```javascript
import moment from "moment-jalaali";
let str = moment().format("jYYYY/jMM/jDD");
```

### After (`persian-date-native`):
```javascript
import { persianDate } from "persian-date-native";
let p = persianDate();
let str = p.formatFa("YYYY/MM/DD");
```
