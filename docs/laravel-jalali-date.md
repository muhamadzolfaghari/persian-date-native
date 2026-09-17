# Laravel Blade Persian (Jalali) Date Guide

> Display Persian dates in Laravel Blade views and Vue/Inertia/Livewire frontends with `persian-date-native`.

## 1. CDN Approach in `app.blade.php`
```blade
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}</title>
    <script src="https://unpkg.com/persian-date-native"></script>
</head>
<body>
    <div id="app">
        <h1>{{ $post->title }}</h1>
        <p>تاریخ انتشار: <span id="post-date"></span></p>
    </div>

    <script>
        const { persianDate } = window.PersianDateNative;
        const serverIso = "{{ $post->created_at->toISOString() }}";
        document.getElementById('post-date').textContent = 
            persianDate(new Date(serverIso)).formatFa("dddd D MMMM YYYY");
    </script>
</body>
</html>
```

## 2. Inertia.js (Vue 3 / React) Approach
Install via npm:
```bash
npm install persian-date-native
```

In your Vue / React Inertia component:
```vue
<script setup>
import { computed } from 'vue';
import { persianDate } from 'persian-date-native';

const props = defineProps({ post: Object });

const jalaliCreatedAt = computed(() => {
  return persianDate(new Date(props.post.created_at)).formatFa('D MMMM YYYY');
});
</script>

<template>
  <time :datetime="post.created_at">{{ jalaliCreatedAt }}</time>
</template>
```
