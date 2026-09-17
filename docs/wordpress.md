# Using with WordPress

Add Persian date formatting and picker capabilities to WordPress themes and plugins without jQuery conflicts or external dependencies.

---

## 🔌 Method 1: Enqueue Script in `functions.php`

Add the following snippet to your theme's `functions.php`:

```php
function enqueue_persian_date_native() {
    wp_enqueue_script(
        'persian-date-native',
        'https://unpkg.com/persian-date-native',
        array(),
        '1.2.3',
        true
    );

    wp_add_inline_script('persian-date-native', '
        document.addEventListener("DOMContentLoaded", function() {
            const { persianDate } = window.PersianDateNative;
            document.querySelectorAll(".entry-date").forEach(function(el) {
                const dateStr = el.getAttribute("datetime") || el.innerText;
                const d = persianDate(new Date(dateStr));
                if (!isNaN(d.getTime())) {
                    el.innerText = d.formatFa("D MMMM YYYY");
                }
            });
        });
    ');
}
add_action('wp_enqueue_scripts', 'enqueue_persian_date_native');
```
