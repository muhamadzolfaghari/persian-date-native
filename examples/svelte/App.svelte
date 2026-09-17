<script>
  import { persianDate } from "persian-date-native";
  let d = persianDate();
</script>

<div dir="rtl" style="font-family: sans-serif; padding: 20px;">
  <h2>نمونه Svelte</h2>
  <p>تاریخ فعلی: {d.formatFa("dddd D MMMM YYYY")}</p>
  <button on:click={() => d = persianDate(d).add(1, "day")}>روز بعد</button>
</div>
