# WordPress Persian (Jalali) Date Integration Guide

## 1. Problem
How do you enqueue and format client-side Persian dates in WordPress themes, WooCommerce stores, and Gutenberg blocks without slowing down page load speeds?

## 2. Installation / CDN
Add to your theme's `functions.php`:
```php
function enqueue_persian_date_native() {
    wp_enqueue_script(
        'persian-date-native',
        'https://unpkg.com/persian-date-native',
        array(),
        '1.2.3',
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_persian_date_native');
```

## 3. Example
```php
<?php
// In functions.php or a custom plugin
function pdn_enqueue_and_localize() {
    wp_enqueue_script('persian-date-native', 'https://unpkg.com/persian-date-native', array(), '1.2.3', true);

    wp_add_inline_script('persian-date-native', '
        document.addEventListener("DOMContentLoaded", function() {
            if (!window.PersianDateNative) return;
            const { persianDate } = window.PersianDateNative;

            // Automatically format all post timestamps
            document.querySelectorAll(".entry-date, time[datetime]").forEach(function(el) {
                const dt = el.getAttribute("datetime") || el.innerText;
                const p = persianDate(new Date(dt));
                if (!isNaN(p.getTime())) {
                    el.innerText = p.formatFa("D MMMM YYYY");
                }
            });
        });
    ');
}
add_action('wp_enqueue_scripts', 'pdn_enqueue_and_localize');
?>
```

## 4. Why Use `persian-date-native`?
- **Zero Impact on Core Web Vitals**: Only 5.7 KB Gzipped — no heavy external dependencies.
- **Works in Any Theme**: Compatible with Astra, GeneratePress, Divi, Elementor, and FSE block themes.
- **Native Date Inheritance**: Subclasses native JS `Date` for clean DOM interop.
- **CDN Edge Availability**: Fast unpkg and jsDelivr global edge delivery.

## 5. Migration Guide

### Before (`moment-jalaali` inline in theme):
```php
// Enqueued heavy 70KB bundle
wp_enqueue_script('moment-jalaali', '.../moment-jalaali.js');
```

### After (`persian-date-native`):
```php
// Ultra-light 5.7KB native bundle
wp_enqueue_script('persian-date-native', 'https://unpkg.com/persian-date-native', array(), '1.2.3', true);
```
