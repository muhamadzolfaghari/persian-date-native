# jQuery Persian (Jalali) Date Integration Guide

## 1. Problem
How do you format, convert, and manipulate Persian dates in legacy or modern jQuery web applications using a simple `<script>` tag or bundler?

## 2. Installation / CDN
```html
<!-- Load via CDN -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://unpkg.com/persian-date-native"></script>
```
or via npm:
```bash
npm install persian-date-native
```

## 3. Example
```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>jQuery Persian Date</title>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://unpkg.com/persian-date-native"></script>
</head>
<body>
  <div class="date-widget">
    <h3>تاریخ جاری: <span id="persian-label"></span></h3>
    <button id="btn-prev">◀ روز قبل</button>
    <button id="btn-today">امروز</button>
    <button id="btn-next">روز بعد ▶</button>
  </div>

  <script>
    $(document).ready(function() {
      const { persianDate } = window.PersianDateNative;
      let current = persianDate();

      function render() {
        $("#persian-label").text(current.formatFa("dddd D MMMM YYYY"));
      }

      $("#btn-prev").on("click", function() {
        current = persianDate(current).subtract(1, "day");
        render();
      });

      $("#btn-next").on("click", function() {
        current = persianDate(current).add(1, "day");
        render();
      });

      $("#btn-today").on("click", function() {
        current = persianDate();
        render();
      });

      render();
    });
  </script>
</body>
</html>
```

## 4. Why Use `persian-date-native`?
- **Zero Dependencies**: Drop it into any HTML page alongside jQuery without Babel or build steps.
- **Global `window.PersianDateNative`**: Direct access in any global script block.
- **Ultra-Fast**: Sub-microsecond execution handles large tabular data rows without lag.
- **Native Date Inheritance**: Works with native JavaScript `Date` pickers.

## 5. Migration Guide

### Before (`babakhani/persian-date`):
```javascript
// Legacy persian-date required separate configuration and heavy moment-like wrapper
var p = new persianDate();
var text = p.format("YYYY/MM/DD");
```

### After (`persian-date-native`):
```javascript
var p = window.PersianDateNative.persianDate();
var text = p.formatFa("YYYY/MM/DD");
```
