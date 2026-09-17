# Laravel Blade Persian (Jalali) Date Integration Guide

## 1. Problem
How do you cleanly format server-rendered UTC timestamps into localized Persian dates in Laravel Blade templates and Alpine.js / Livewire components?

## 2. Installation / CDN
Add via Vite / npm:
```bash
npm install persian-date-native
```
or via CDN in your Blade layout (`resources/views/layouts/app.blade.php`):
```html
<script src="https://unpkg.com/persian-date-native"></script>
```

## 3. Example
```html
<!-- resources/views/posts/show.blade.php -->
@extends('layouts.app')

@section('content')
<div dir="rtl" class="container mx-auto p-6 font-sans">
    <h1 class="text-2xl font-bold">{{ $post->title }}</h1>
    
    <div class="text-sm text-gray-500 mt-2">
        <span>تاریخ انتشار: </span>
        <span id="post-published-date"></span>
        <span class="text-xs text-blue-600" id="post-relative-time"></span>
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", () => {
        const { persianDate } = window.PersianDateNative;
        const serverIso = "{{ $post->created_at->toISOString() }}";
        const pDate = persianDate(new Date(serverIso));

        document.getElementById("post-published-date").textContent = 
            pDate.formatFa("dddd D MMMM YYYY - ساعت HH:mm");
        document.getElementById("post-relative-time").textContent = 
            `(${pDate.fromNow()})`;
    });
</script>
@endsection
```

## 4. Why Use `persian-date-native`?
- **Zero Frontend Dependencies**: Works seamlessly with Laravel 10/11 Vite asset pipelines, Livewire, and Alpine.js.
- **Accurate UTC to Jalali Conversion**: Direct ISO 8601 string parsing with native JavaScript `Date` timezone awareness.
- **Microsecond Rendering**: Format hundreds of table rows instantly.
- **Dual Mode**: Use via `npm` imports in `app.js` or via simple script tags.

## 5. Migration Guide

### Before (`moment-jalaali` in Laravel Vite):
```javascript
import moment from "moment-jalaali";
const dateStr = moment(isoString).format("jYYYY/jMM/jDD");
```

### After (`persian-date-native` in Laravel Vite):
```javascript
import { persianDate } from "persian-date-native";
const dateStr = persianDate(new Date(isoString)).formatFa("YYYY/MM/DD");
```
