# Browser & CDN Integration Guide

`persian-date-native` includes ready-to-use UMD and IIFE bundles for browsers without requiring build tools or bundlers.

---

## 🌐 CDN Script Sources

### 1. unpkg (Latest Production Minified Bundle)
```html
<script src="https://unpkg.com/persian-date-native"></script>
```

### 2. jsDelivr
```html
<script src="https://cdn.jsdelivr.net/npm/persian-date-native"></script>
```

### 3. esm.sh (Native ES Module Import)
```html
<script type="module">
  import { persianDate } from "https://esm.sh/persian-date-native";
  console.log(persianDate().format("YYYY/MM/DD"));
</script>
```

---

## 💻 Browser Global API: `window.PersianDateNative`

When loaded via a standard `<script>` tag, all functions and classes are mounted to `window.PersianDateNative`:

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>Persian Date Browser Demo</title>
  <script src="https://unpkg.com/persian-date-native"></script>
</head>
<body>
  <h1>امروز: <span id="current-date"></span></h1>

  <script>
    const { persianDate, gregorianToPersian, toPersianDigits } = window.PersianDateNative;

    const now = persianDate();
    document.getElementById("current-date").textContent = 
      now.formatFa("dddd، D MMMM YYYY - HH:mm");

    // Pure integer conversion in browser console
    const [jy, jm, jd] = gregorianToPersian(2024, 9, 2);
    console.log("Jalali Date:", jy, jm, jd); // 1403, 6, 12
  </script>
</body>
</html>
```

---

## ⚡ Performance & Size
- **Raw File**: ~18.5 KB
- **Gzip Size**: ~5.7 KB
- **Brotli Size**: ~5.2 KB
- **Dependencies**: 0 (Zero external dependencies)
