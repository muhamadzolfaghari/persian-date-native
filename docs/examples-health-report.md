# Examples Health Check Report

Generated on: 2026-09-17T23:22:27.852Z  
Target Package: **persian-date-native v1.2.3**  
Total Examples Checked: **9**  
Passed: **9** | Failed: **0**

---

## 📊 Summary Table

| Framework / Ecosystem | File Path | Type | Health Status | Verification Details |
| :--- | :--- | :--- | :---: | :--- |
| **Vanilla HTML / CDN** | [`examples/vanilla/index.html`](../examples/vanilla/index.html) | `html` | ✅ PASS | HTML parses cleanly, CDN global script runs in sandbox with live formatting. |
| **React (JSX)** | [`examples/react/App.jsx`](../examples/react/App.jsx) | `js` | ✅ PASS | Component imports verified. Formatted date: "جمعه ۲۷ شهریور ۱۴۰۵", leap: false. |
| **Next.js App Router (RSC)** | [`examples/nextjs/page.tsx`](../examples/nextjs/page.tsx) | `ts` | ✅ PASS | Server Component verified. Server Time: "۱۴۰۵/۰۶/۲۷", Calc: 1403/6/12. |
| **Vue 3 (SFC Composition API)** | [`examples/vue/App.vue`](../examples/vue/App.vue) | `vue` | ✅ PASS | Vue 3 Single File Component verified with reactivity-safe immutable date arithmetic. |
| **Angular (Standalone Component)** | [`examples/angular/persian-date.component.ts`](../examples/angular/persian-date.component.ts) | `ts` | ✅ PASS | Angular Standalone Component with TypeScript types verified. |
| **Svelte 5** | [`examples/svelte/App.svelte`](../examples/svelte/App.svelte) | `svelte` | ✅ PASS | Svelte component verified. Output: ۱۴۰۵/۰۶/۲۸. |
| **jQuery Integration** | [`examples/jquery/index.html`](../examples/jquery/index.html) | `html` | ✅ PASS | jQuery DOM manipulation & browser global verified. |
| **Laravel Blade** | [`examples/laravel-blade/calendar.blade.php`](../examples/laravel-blade/calendar.blade.php) | `php` | ✅ PASS | Blade template script with UTC ISO server parsing verified. |
| **WordPress Theme (PHP)** | [`examples/wordpress/functions.php`](../examples/wordpress/functions.php) | `php` | ✅ PASS | wp_enqueue_script and wp_add_inline_script verified. |

---

## 🎯 Verification Highlights

1. **Dual Import Compatibility**: Verified both ES Module imports (`import { persianDate } from "persian-date-native"`) for modern bundlers (Vite, Webpack, Next.js, Angular, Svelte) and browser globals (`window.PersianDateNative`) for legacy / script-tag environments.
2. **Server-Side Safety**: Next.js App Router RSC and Laravel Blade examples execute with zero hydration or window dependency issues.
3. **Immutable Arithmetic**: React, Vue 3, Angular, and Svelte date mutation methods (`.add()`, `.subtract()`) preserve component state immutability.
4. **CDN Availability**: Vanilla HTML, jQuery, Laravel, and WordPress examples correctly reference `https://unpkg.com/persian-date-native` and `dist/index.global.min.js`.
