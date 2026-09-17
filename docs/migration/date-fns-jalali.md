# Migrating from date-fns-jalali to persian-date-native

`date-fns-jalali` uses functional helpers that add friction when working with native JS Date objects. `persian-date-native` offers both functional pure converters and fluent object-oriented native Date methods.

---

## 🔄 API Equivalents

| `date-fns-jalali` | `persian-date-native` |
|---|---|
| `format(date, 'yyyy/MM/dd')` | `persianDate(date).format('YYYY/MM/DD')` |
| `addDays(date, 5)` | `persianDate(date).add(5, 'days')` |
| `startOfMonth(date)` | `persianDate(date).startOf('month')` |
| `getDaysInMonth(date)` | `persianDate(date).daysInMonth()` |
| `isLeapYear(date)` | `persianDate(date).isLeapYear()` |
