# Using with Svelte & SvelteKit

`persian-date-native` works with Svelte 4, Svelte 5 (Runes), and SvelteKit SSR.

---

## 🚀 Installation

```bash
npm install persian-date-native
```

---

## 🧡 Svelte 5 Component (`PersianDate.svelte`)

```svelte
<script lang="ts">
  import { persianDate } from "persian-date-native";

  let date = $state(persianDate());

  function addDays(count: number) {
    date = persianDate(date).add(count, "days");
  }
</script>

<div dir="rtl" class="persian-box">
  <h3>{date.formatFa("dddd، D MMMM YYYY")}</h3>
  <p>روزهای ماه: {date.daysInMonth()}</p>
  
  <button onclick={() => addDays(-1)}>روز قبل</button>
  <button onclick={() => addDays(1)}>روز بعد</button>
</div>
```
