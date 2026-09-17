# Using with Laravel Blade & Vite

Integrate Persian date handling into Laravel views (Blade) via CDN or Vite.

---

## 🔴 Method 1: Laravel Blade with CDN

In your `resources/views/layouts/app.blade.php`:

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}</title>
    <!-- Persian Date Native CDN -->
    <script src="https://unpkg.com/persian-date-native"></script>
</head>
<body>
    <div class="container">
        <!-- Render from server timestamp with client-side Persian formatting -->
        <span class="persian-date" data-timestamp="{{ $post->created_at->toISOString() }}"></span>
    </div>

    <script>
        document.querySelectorAll('.persian-date').forEach(el => {
            const raw = el.getAttribute('data-timestamp');
            const d = window.PersianDateNative.persianDate(new Date(raw));
            el.textContent = d.formatFa('dddd D MMMM YYYY - ساعت HH:mm');
        });
    </script>
</body>
</html>
```

---

## ⚡ Method 2: Laravel with Vite / Alpine.js

```bash
npm install persian-date-native
```

In `resources/js/app.js`:
```javascript
import Alpine from 'alpinejs';
import { persianDate } from 'persian-date-native';

window.Alpine = Alpine;
window.persianDate = persianDate;

Alpine.start();
```

In Blade with Alpine.js:
```html
<div x-data="{ date: persianDate() }">
    <p x-text="date.formatFa('dddd D MMMM YYYY')"></p>
</div>
```
