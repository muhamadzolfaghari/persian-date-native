# Using with PHP Websites

Integrate Persian date handling into PHP websites (Vanilla PHP, CodeIgniter, Symfony, Drupal, Joomla).

---

## 🐘 PHP Example with CDN

```php
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>PHP + Persian Date Native</title>
    <script src="https://unpkg.com/persian-date-native"></script>
</head>
<body>
    <?php
        $db_created_at = "2024-09-02T14:30:00Z";
    ?>

    <div class="card">
        <h3>تاریخ مقاله:</h3>
        <p id="article-date"></p>
    </div>

    <script>
        const { persianDate } = window.PersianDateNative;
        const serverIso = "<?php echo $db_created_at; ?>";
        const date = persianDate(new Date(serverIso));
        
        document.getElementById("article-date").textContent = 
            date.formatFa("dddd، D MMMM YYYY ساعت HH:mm");
    </script>
</body>
</html>
```
