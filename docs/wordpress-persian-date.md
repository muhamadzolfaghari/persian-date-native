# WordPress Persian Date Integration Guide

> Add Persian / Shamsi date formatting to WordPress themes and plugins with zero server overhead using `persian-date-native`.

## Enqueue Script in `functions.php`
Add the script tag to your WordPress theme:

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

## Theme Blade / PHP Template
```php
<article class="post">
    <h2><?php the_title(); ?></h2>
    <div class="post-date" data-iso="<?php echo get_the_date('c'); ?>">
        <!-- Rendered client-side into Persian date -->
    </div>
</article>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const { persianDate } = window.PersianDateNative;
    document.querySelectorAll('.post-date').forEach(el => {
        const iso = el.getAttribute('data-iso');
        if (iso) {
            el.textContent = persianDate(new Date(iso)).formatFa('dddd D MMMM YYYY');
        }
    });
});
</script>
```
