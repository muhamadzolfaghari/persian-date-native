import { persianDate, gregorianToPersian } from "persian-date-native";

export default function Page() {
  const date = persianDate();
  const [jy, jm, jd] = gregorianToPersian(2024, 9, 2);

  return (
    <main style={{ direction: "rtl", fontFamily: "sans-serif", padding: 30 }}>
      <h1>Next.js Server Component Example</h1>
      <p>تاریخ سمت سرور: {date.formatFa("dddd D MMMM YYYY - HH:mm")}</p>
      <p>محاسبه تبدیل تاریخ: {jy}/{jm}/{jd}</p>
    </main>
  );
}
