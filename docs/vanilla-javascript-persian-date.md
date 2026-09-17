# Vanilla JavaScript & CDN Persian (Jalali) Date Guide

## 1. Problem
How do you convert, format, and calculate Persian (Shamsi / Solar Hijri) dates in plain HTML, Node.js, and vanilla JavaScript without bundlers, build steps, or external dependencies?

## 2. Installation / CDN
```html
<!-- Load from CDN -->
<script src="https://unpkg.com/persian-date-native"></script>
```
or for Node.js / vanilla ES modules:
```bash
npm install persian-date-native
```

## 3. Example
```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>Vanilla Persian Date</title>
  <script src="https://unpkg.com/persian-date-native"></script>
  <style>
    body { font-family: system-ui, sans-serif; padding: 2rem; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 1.5rem; border-radius: 12px; }
    .clock { font-size: 1.5rem; font-weight: bold; color: #2563eb; }
  </style>
</head>
<body>
  <div class="card">
    <h2>تقویم زنده فارسی</h2>
    <div class="clock" id="live-clock">...</div>
    <p id="calc-info"></p>
  </div>

  <script>
    const { persianDate, gregorianToPersian } = window.PersianDateNative;

    function update() {
      const now = persianDate();
      document.getElementById('live-clock').textContent = 
        now.formatFa('dddd D MMMM YYYY - HH:mm:ss');

      const [jy, jm, jd] = gregorianToPersian(now.getFullYear(), now.getMonth(), now.getDate());
      document.getElementById('calc-info').textContent = 
        `تبدیل اعداد: ${jy}/${jm}/${jd} | فاصله: ${now.fromNow()}`;
    }

    update();
    setInterval(update, 1000);
  </script>
</body>
</html>
```

## 4. Why Use `persian-date-native`?
- **Zero Dependencies**: 100% standalone algorithm.
- **Global `window.PersianDateNative`**: Ready on window load.
- **Native `Date` Prototype**: Inherits all standard Date methods (`.getTime()`, `.toISOString()`, `.getHours()`, etc.).
- **Unrivaled Performance**: 89M+ operations per second.

## 5. Migration Guide

### Before (`shamsi` / legacy converter):
```javascript
// Multiple packages needed for date class vs conversion
var j = shamsi.gregorianToJalali(2024, 9, 2);
```

### After (`persian-date-native`):
```javascript
// Everything in one 5.7KB package
var p = window.PersianDateNative.persianDate();
var text = p.formatFa("dddd D MMMM YYYY");
```
