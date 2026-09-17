/**
 * Home Page Interactive Benchmark & Quick Widget
 */
(function() {
  'use strict';

  const { persianDate, gregorianToPersian, persianToGregorian, isPersianLeapYear, toPersianDigits } = window.PersianDateNative || {};

  const MONTH_NAMES_FA = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
  const MONTH_NAMES_EN = ["Farvardin", "Ordibehesht", "Khordad", "Tir", "Mordad", "Shahrivar", "Mehr", "Aban", "Azar", "Dey", "Bahman", "Esfand"];
  const WEEKDAY_NAMES_FA = ["شنبه", "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];
  const WEEKDAY_NAMES_EN = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  let viewYear = 1403;
  let viewMonth = 6;
  let selectedDay = 12;

  function renderCalendar() {
    const grid = document.getElementById("calGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const isFa = window.getLang && window.getLang() === 'fa';
    const monthNames = isFa ? MONTH_NAMES_FA : MONTH_NAMES_EN;

    const titleEl = document.getElementById("calMonthYear");
    if (titleEl) {
      titleEl.innerText = `${monthNames[viewMonth - 1]} ${isFa ? toPersianDigits(viewYear) : viewYear}`;
    }

    const [gy, gm, gd] = persianToGregorian(viewYear, viewMonth, 1);
    const firstDayGreg = new Date(gy, gm - 1, gd);
    const startDow = (firstDayGreg.getDay() + 1) % 7;

    for (let i = 0; i < startDow; i++) {
      const cell = document.createElement("div");
      cell.className = "cal-cell empty";
      grid.appendChild(cell);
    }

    let numDays = 30;
    if (viewMonth <= 6) numDays = 31;
    else if (viewMonth === 12) numDays = isPersianLeapYear(viewYear) ? 30 : 29;

    for (let d = 1; d <= numDays; d++) {
      const cell = document.createElement("div");
      cell.className = "cal-cell" + (d === selectedDay ? " selected" : "");
      cell.innerText = isFa ? toPersianDigits(d) : d;
      cell.addEventListener("click", () => {
        selectedDay = d;
        renderCalendar();
        updateSelectedDetails();
      });
      grid.appendChild(cell);
    }
  }

  function updateSelectedDetails() {
    const isFa = window.getLang && window.getLang() === 'fa';
    const monthNames = isFa ? MONTH_NAMES_FA : MONTH_NAMES_EN;
    const weekdayNames = isFa ? WEEKDAY_NAMES_FA : WEEKDAY_NAMES_EN;

    const [gy, gm, gd] = persianToGregorian(viewYear, viewMonth, selectedDay);
    const gDate = new Date(gy, gm - 1, gd);
    const dow = (gDate.getDay() + 1) % 7;

    const yVal = document.getElementById("pYear");
    const mVal = document.getElementById("pMonth");
    const dVal = document.getElementById("pDay");
    if (yVal) yVal.value = viewYear;
    if (mVal) mVal.value = viewMonth;
    if (dVal) dVal.value = selectedDay;

    updateConverter();
  }

  function updateConverter() {
    const isFa = window.getLang && window.getLang() === 'fa';
    const monthNames = isFa ? MONTH_NAMES_FA : MONTH_NAMES_EN;
    const weekdayNames = isFa ? WEEKDAY_NAMES_FA : WEEKDAY_NAMES_EN;

    const jy = parseInt(document.getElementById("pYear")?.value, 10) || 1403;
    const jm = parseInt(document.getElementById("pMonth")?.value, 10) || 1;
    const jd = parseInt(document.getElementById("pDay")?.value, 10) || 1;

    const [gy, gm, gd] = persianToGregorian(jy, jm, jd);
    const gDate = new Date(gy, gm - 1, gd);
    const dow = (gDate.getDay() + 1) % 7;
    const leap = isPersianLeapYear(jy);

    const gEquiv = document.getElementById("resGregEquiv");
    if (gEquiv) gEquiv.innerText = `${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`;

    const dowEl = document.getElementById("resDayOfWeek");
    if (dowEl) dowEl.innerText = weekdayNames[dow];

    const leapEl = document.getElementById("resLeapStatus");
    if (leapEl) {
      if (leap) {
        leapEl.innerText = isFa ? "✅ سال کبیسه (۳۶۶ روز)" : "✅ Leap Year (366 days)";
        leapEl.style.color = "var(--emerald)";
      } else {
        leapEl.innerText = isFa ? "❌ سال عادی (۳۶۵ روز)" : "❌ Normal Year (365 days)";
        leapEl.style.color = "var(--text-muted)";
      }
    }

    const relEl = document.getElementById("resRelTime");
    if (relEl) {
      const p = new window.PersianDateNative.PersianDate(gy, gm - 1, gd);
      relEl.innerText = isFa ? (p.fromNowFa ? p.fromNowFa() : p.fromNow()) : p.fromNow();
    }

    runFormatting();
  }

  function runFormatting() {
    const isFa = window.getLang && window.getLang() === 'fa';
    const monthNames = isFa ? MONTH_NAMES_FA : MONTH_NAMES_EN;
    const weekdayNames = isFa ? WEEKDAY_NAMES_FA : WEEKDAY_NAMES_EN;

    const jy = parseInt(document.getElementById("pYear")?.value, 10) || 1403;
    const jm = parseInt(document.getElementById("pMonth")?.value, 10) || 1;
    const jd = parseInt(document.getElementById("pDay")?.value, 10) || 1;
    const tpl = document.getElementById("formatTemplate")?.value || "YYYY/MM/DD";
    const op = document.getElementById("mathOp")?.value || "none";

    let [gy, gm, gd] = persianToGregorian(jy, jm, jd);
    let targetGDate = new Date(gy, gm - 1, gd, 14, 30, 0);

    if (op === "add_10_days") targetGDate.setDate(targetGDate.getDate() + 10);
    else if (op === "sub_1_month") targetGDate.setMonth(targetGDate.getMonth() - 1);
    else if (op === "start_of_month") {
      [gy, gm, gd] = persianToGregorian(jy, jm, 1);
      targetGDate = new Date(gy, gm - 1, gd, 0, 0, 0);
    } else if (op === "end_of_year") {
      const lastDay = isPersianLeapYear(jy) ? 30 : 29;
      [gy, gm, gd] = persianToGregorian(jy, 12, lastDay);
      targetGDate = new Date(gy, gm - 1, gd, 23, 59, 59);
    }

    const [resJy, resJm, resJd] = gregorianToPersian(targetGDate.getFullYear(), targetGDate.getMonth() + 1, targetGDate.getDate());
    const dow = (targetGDate.getDay() + 1) % 7;

    let out = tpl
      .replace("YYYY", String(resJy))
      .replace("MMMM", monthNames[resJm - 1])
      .replace("MM", String(resJm).padStart(2, "0"))
      .replace("DD", String(resJd).padStart(2, "0"))
      .replace("D", String(resJd))
      .replace("dddd", weekdayNames[dow])
      .replace("HH", "14")
      .replace("hh", "02")
      .replace("mm", "30")
      .replace("ss", "00")
      .replace("A", isFa ? "ب.ظ" : "PM");

    const outEn = document.getElementById("resFormatEn");
    const outFa = document.getElementById("resFormatFa");
    if (outEn) outEn.innerText = out;
    if (outFa) outFa.innerText = toPersianDigits(out);
  }

  function changeMonth(delta) {
    viewMonth += delta;
    if (viewMonth > 12) {
      viewMonth = 1;
      viewYear++;
    } else if (viewMonth < 1) {
      viewMonth = 12;
      viewYear--;
    }
    selectedDay = 1;
    renderCalendar();
    updateSelectedDetails();
  }

  function copyInstallCmd(btn) {
    navigator.clipboard.writeText("npm i persian-date-native");
    if (btn) {
      const orig = btn.innerText;
      btn.innerText = "Copied! ✓";
      setTimeout(() => btn.innerText = orig, 1500);
    }
  }

  function runBrowserBenchmark(btn) {
    const isFa = window.getLang && window.getLang() === 'fa';
    if (btn) {
      btn.innerText = isFa ? "در حال اجرای بنچمارک..." : "Running benchmark...";
      btn.disabled = true;
    }

    setTimeout(() => {
      const ITERS = 500000;
      const t0 = performance.now();
      for (let i = 0; i < ITERS; i++) {
        gregorianToPersian(2024, 9, 2);
      }
      const g2pTime = performance.now() - t0;
      const g2pOps = Math.round(ITERS / (g2pTime / 1000));

      const t1 = performance.now();
      for (let i = 0; i < ITERS; i++) {
        persianToGregorian(1403, 6, 12);
      }
      const p2gTime = performance.now() - t1;
      const p2gOps = Math.round(ITERS / (p2gTime / 1000));

      if (btn) {
        btn.innerText = isFa ? "🚀 اجرای مجدد بنچمارک" : "🚀 Run Benchmark Again";
        btn.disabled = false;
      }

      if (isFa) {
        alert(`⚡ نتایج بنچمارک زنده:\n\n• تبدیل میلادی به شمسی: ${(g2pOps/1e6).toFixed(1)} میلیون عملیات/ثانیه\n• تبدیل شمسی به میلادی: ${(p2gOps/1e6).toFixed(1)} میلیون عملیات/ثانیه\n\nتوسعه یافته با عملیات بیتی خالص و ۰ وابستگی!`);
      } else {
        alert(`⚡ Live In-Browser Benchmark Results:\n\n• Gregorian → Persian: ${(g2pOps/1e6).toFixed(1)} Million ops/sec\n• Persian → Gregorian: ${(p2gOps/1e6).toFixed(1)} Million ops/sec\n\nZero dependencies, bitwise integer arithmetic!`);
      }
    }, 50);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const yVal = document.getElementById("pYear");
    const mVal = document.getElementById("pMonth");
    const dVal = document.getElementById("pDay");
    if (yVal) yVal.addEventListener("input", updateConverter);
    if (mVal) mVal.addEventListener("input", updateConverter);
    if (dVal) dVal.addEventListener("input", updateConverter);

    const fmtTpl = document.getElementById("formatTemplate");
    const mOp = document.getElementById("mathOp");
    if (fmtTpl) fmtTpl.addEventListener("input", runFormatting);
    if (mOp) mOp.addEventListener("change", runFormatting);

    renderCalendar();
    updateConverter();
  });

  window.addEventListener('pdate:langchange', () => {
    renderCalendar();
    updateConverter();
  });

  window.changeMonth = changeMonth;
  window.copyInstallCmd = copyInstallCmd;
  window.runBrowserBenchmark = runBrowserBenchmark;
})();
