# jQuery Persian & Jalali Date Integration Guide

> Lightweight Persian date formatting and calculation for jQuery applications and legacy web platforms without bundlers.

## CDN Script Tag Setup
Add jQuery and `persian-date-native` via CDN:

```html
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Persian Date Native CDN Bundle -->
<script src="https://unpkg.com/persian-date-native"></script>
```

## Usage in jQuery
The library registers `window.PersianDateNative`:

```javascript
$(document).ready(function() {
  const { persianDate, gregorianToPersian } = window.PersianDateNative;

  // Format today's date
  const now = persianDate();
  $('#persian-clock').text(now.formatFa('dddd D MMMM YYYY'));

  // Live calculation on button click
  $('#add-week-btn').on('click', function() {
    const nextWeek = now.add(7, 'day');
    $('#result').text('۷ روز بعد: ' + nextWeek.formatFa('YYYY/MM/DD'));
  });
});
```

## jQuery Plugin Helper
```javascript
$.fn.toPersianDate = function(format = 'YYYY/MM/DD') {
  return this.each(function() {
    const raw = $(this).text() || $(this).data('date');
    if (raw) {
      const p = window.PersianDateNative.persianDate(new Date(raw));
      $(this).text(p.formatFa(format));
    }
  });
};

// Usage:
// $('.post-time').toPersianDate('dddd D MMMM');
```
