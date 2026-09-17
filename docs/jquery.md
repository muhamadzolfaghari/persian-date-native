# Using with jQuery & Legacy Web Apps

Add Persian date support to jQuery apps, WordPress themes, and traditional websites using CDN script tags.

---

## 🌐 HTML & jQuery Integration

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>jQuery Persian Date Example</title>
  <!-- Load jQuery -->
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <!-- Load Persian Date Native CDN -->
  <script src="https://unpkg.com/persian-date-native"></script>
</head>
<body>

  <div class="calendar-widget">
    <h2>تاریخ امروز: <span id="current-date"></span></h2>
    <input type="text" id="date-input" placeholder="انتخاب تاریخ">
    <button id="btn-next">روز بعد</button>
  </div>

  <script>
    $(document).ready(function() {
      const { persianDate, toPersianDigits } = window.PersianDateNative;
      let activeDate = persianDate();

      function render() {
        $("#current-date").text(activeDate.formatFa("dddd D MMMM YYYY"));
        $("#date-input").val(activeDate.formatFa("YYYY/MM/DD"));
      }

      $("#btn-next").on("click", function() {
        activeDate = persianDate(activeDate).add(1, "day");
        render();
      });

      render();
    });
  </script>
</body>
</html>
```
