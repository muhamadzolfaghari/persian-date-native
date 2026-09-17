# Vue 3 Persian (Jalali) Date Guide — Composition API

## 1. Problem
How do you integrate reactive Persian date state management and localized formatting in Vue 3 applications?

## 2. Installation
```bash
npm install persian-date-native
```

## 3. Example
```vue
<script setup lang="ts">
import { ref, computed } from "vue";
import { persianDate, PersianDate } from "persian-date-native";

const current = ref<PersianDate>(persianDate());
const formattedDate = computed(() => current.value.formatFa("dddd D MMMM YYYY"));

function nextDay() {
  current.value = persianDate(current.value).add(1, "day");
}

function prevDay() {
  current.value = persianDate(current.value).subtract(1, "day");
}
</script>

<template>
  <div dir="rtl" class="vue-card">
    <h2>{{ formattedDate }}</h2>
    <p>فاصله: {{ current.fromNow() }}</p>
    <div class="controls">
      <button @click="prevDay">روز قبل</button>
      <button @click="nextDay">روز بعد</button>
    </div>
  </div>
</template>
```

## 4. Why Use `persian-date-native`?
- **Reactivity Friendly**: Immutable arithmetic (`.add()`, `.subtract()`) triggers Vue's reactive `ref` and `computed` trackers reliably.
- **Zero Dependencies**: Keeps Vue 3 Vite builds ultra-lean.
- **Native Date Compatibility**: Directly pass instances into Vue Datepickers expecting `Date`.
- **TypeScript Support**: Full intellisense for all Persian calendar helper methods.

## 5. Migration Guide

### Before (`moment-jalaali`):
```js
import moment from "moment-jalaali";
const date = ref(moment().format("jYYYY/jMM/jDD"));
```

### After (`persian-date-native`):
```js
import { persianDate } from "persian-date-native";
const date = ref(persianDate());
const display = computed(() => date.value.formatFa("YYYY/MM/DD"));
```
