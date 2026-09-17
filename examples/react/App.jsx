import React, { useState } from "react";
import { persianDate } from "persian-date-native";

export default function App() {
  const [current, setCurrent] = useState(() => persianDate());

  return (
    <div style={{ direction: "rtl", fontFamily: "sans-serif", padding: 20 }}>
      <h1>نمونه React</h1>
      <p>تاریخ انتخاب شده: <strong>{current.formatFa("dddd D MMMM YYYY")}</strong></p>
      <p>سال کبیسه؟ {current.isLeapYear() ? "بله" : "خیر"}</p>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setCurrent(persianDate(current).subtract(1, "month"))}>
          ماه قبل
        </button>
        <button onClick={() => setCurrent(persianDate())}>
          امروز
        </button>
        <button onClick={() => setCurrent(persianDate(current).add(1, "month"))}>
          ماه بعد
        </button>
      </div>
    </div>
  );
}
