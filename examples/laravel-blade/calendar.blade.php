<!-- resources/views/calendar.blade.php -->
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>تقویم فارسی لاراول</title>
    <script src="https://unpkg.com/persian-date-native"></script>
</head>
<body>
    <h1>رویدادهای لاراول</h1>
    <div class="event-card">
        <p>تاریخ ثبت: <span id="event-date"></span></p>
    </div>

    <script>
        const { persianDate } = window.PersianDateNative;
        const serverUtc = "{{ $event->created_at ?? now()->toIso8601String() }}";
        const pDate = persianDate(new Date(serverUtc));
        document.getElementById('event-date').textContent = pDate.formatFa('dddd D MMMM YYYY ساعت HH:mm');
    </script>
</body>
</html>
