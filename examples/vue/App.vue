<script setup>
import { ref } from "vue";
import { persianDate } from "persian-date-native";

const date = ref(persianDate());

function addDays(d) {
  date.value = persianDate(date.value).add(d, "days");
}
</script>

<template>
  <div dir="rtl" style="font-family: sans-serif; padding: 20px;">
    <h2>نمونه Vue 3</h2>
    <p>تاریخ: {{ date.formatFa("dddd D MMMM YYYY") }}</p>
    <button @click="addDays(-1)">روز قبل</button>
    <button @click="addDays(1)">روز بعد</button>
  </div>
</template>
