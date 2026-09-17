# Using with Vue 3 (Composition API & Nuxt)

`persian-date-native` seamlessly integrates with Vue 3, Nuxt 3, and Vite.

---

## 🚀 Installation

```bash
npm install persian-date-native
```

---

## 💚 Vue 3 Component (`PersianDateCard.vue`)

```vue
<script setup lang="ts">
import { ref, computed } from "vue";
import { persianDate, gregorianToPersian } from "persian-date-native";

const currentDate = ref(persianDate());

const formattedFa = computed(() => currentDate.value.formatFa("dddd D MMMM YYYY"));
const formattedTime = computed(() => currentDate.value.formatFa("HH:mm:ss"));
const isLeap = computed(() => currentDate.value.isLeapYear());

function nextMonth() {
  currentDate.value = persianDate(currentDate.value).add(1, "month");
}

function prevMonth() {
  currentDate.value = persianDate(currentDate.value).subtract(1, "month");
}
</script>

<template>
  <div class="calendar-card" dir="rtl">
    <h2>{{ formattedFa }}</h2>
    <p>ساعت: {{ formattedTime }}</p>
    <p v-if="isLeap" class="badge">سال کبیسه</p>
    
    <div class="actions">
      <button @click="prevMonth">ماه قبل</button>
      <button @click="nextMonth">ماه بعد</button>
    </div>
  </div>
</template>
```
