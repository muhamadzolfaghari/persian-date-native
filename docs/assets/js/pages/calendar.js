/**
 * Persian Calendar Page Controller
 */
(function() {
  'use strict';

  const MONTHS_FA = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
  const MONTHS_EN = ['Farvardin','Ordibehesht','Khordad','Tir','Mordad','Shahrivar','Mehr','Aban','Azar','Dey','Bahman','Esfand'];
  const DAYS_IN_MONTH = [31,31,31,31,31,31,30,30,30,30,30,29];

  let curYear = 1403;
  let curMonth = 1;
  let selectedDay = 1;

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function getDaysInMonth(y, m) {
    const { isLeapPersianYear } = window._PD || {};
    if (m <= 6) return 31;
    if (m <= 11) return 30;
    return isLeapPersianYear && isLeapPersianYear(y) ? 30 : 29;
  }

  function renderCalendar() {
    const { toGregorian, isLeapPersianYear, toPersianDigits, PersianDate } = window._PD || {};
    if (!toGregorian) return;

    const isFa = window.getLang && window.getLang() === 'fa';
    const monthNames = isFa ? MONTHS_FA : MONTHS_EN;

    const titleEl = document.getElementById('cal-title');
    if (titleEl) {
      titleEl.textContent = `${monthNames[curMonth - 1]} ${isFa ? toPersianDigits(curYear) : curYear}`;
    }

    const g = toGregorian(curYear, curMonth, 1);
    const [gy, gm, gd] = Array.isArray(g) ? g : [g.year, g.month, g.day];
    const firstDow = (new Date(gy, gm - 1, gd).getDay() + 1) % 7;

    const totalDays = getDaysInMonth(curYear, curMonth);
    const grid = document.getElementById('cal-days');
    if (!grid) return;
    grid.innerHTML = '';

    const todayPersian = window._PD.toPersian ? window._PD.toPersian(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()) : null;
    const [tY, tM, tD] = todayPersian ? (Array.isArray(todayPersian) ? todayPersian : [todayPersian.year, todayPersian.month, todayPersian.day]) : [0,0,0];

    for (let i = 0; i < firstDow; i++) {
      const el = document.createElement('div');
      el.className = 'cal-day empty';
      grid.appendChild(el);
    }

    for (let d = 1; d <= totalDays; d++) {
      const el = document.createElement('div');
      const isToday = curYear === tY && curMonth === tM && d === tD;
      const isSel = d === selectedDay;
      const dg = toGregorian(curYear, curMonth, d);
      const [dgy, dgm, dgd] = Array.isArray(dg) ? dg : [dg.year, dg.month, dg.day];
      const dow = (new Date(dgy, dgm - 1, dgd).getDay() + 1) % 7;
      const isWeekend = dow === 6;

      el.className = `cal-day${isToday ? ' today' : ''}${isSel ? ' selected' : ''}${isWeekend ? ' weekend' : ''}`;
      el.innerHTML = `<span>${isFa ? toPersianDigits(d) : d}</span><span class="greg-sub">${dgd}</span>`;
      el.onclick = () => selectDay(d);
      grid.appendChild(el);
    }

    renderDetail();
  }

  function selectDay(d) {
    selectedDay = d;
    renderCalendar();
  }

  function renderDetail() {
    const { toGregorian, isLeapPersianYear, toPersianDigits, PersianDate } = window._PD || {};
    if (!toGregorian) return;

    const isFa = window.getLang && window.getLang() === 'fa';
    const monthNames = isFa ? MONTHS_FA : MONTHS_EN;
    const totalDays = getDaysInMonth(curYear, curMonth);
    const leap = isLeapPersianYear ? isLeapPersianYear(curYear) : false;

    const g = toGregorian(curYear, curMonth, selectedDay);
    const [gy, gm, gd] = Array.isArray(g) ? g : [g.year, g.month, g.day];
    const pDate = new PersianDate(gy, gm - 1, gd);

    const dJal = document.getElementById('det-jalali');
    const dGrg = document.getElementById('det-greg');
    const dDow = document.getElementById('det-dow');
    const dTyp = document.getElementById('det-type');
    const dLen = document.getElementById('det-len');

    if (dJal) dJal.textContent = isFa ? pDate.formatFa('dddd D MMMM YYYY') : pDate.format('dddd, D MMMM YYYY');
    if (dGrg) dGrg.textContent = `${gy}-${pad(gm)}-${pad(gd)}`;
    if (dDow) dDow.textContent = isFa ? pDate.formatFa('dddd') : pDate.format('dddd');
    if (dTyp) dTyp.textContent = leap ? (isFa ? 'سال کبیسه (۳۶۶ روز)' : 'Leap Year (366 days)') : (isFa ? 'سال عادی (۳۶۵ روز)' : 'Normal Year (365 days)');
    if (dLen) dLen.textContent = `${isFa ? toPersianDigits(totalDays) : totalDays} ${isFa ? 'روز' : 'days'}`;
  }

  function prevMonth() {
    if (curMonth === 1) { curMonth = 12; curYear--; }
    else curMonth--;
    selectedDay = Math.min(selectedDay, getDaysInMonth(curYear, curMonth));
    updateSelectors();
    renderCalendar();
  }

  function nextMonth() {
    if (curMonth === 12) { curMonth = 1; curYear++; }
    else curMonth++;
    selectedDay = Math.min(selectedDay, getDaysInMonth(curYear, curMonth));
    updateSelectors();
    renderCalendar();
  }

  function goToday() {
    const { toPersian } = window._PD || {};
    if (toPersian) {
      const now = new Date();
      const p = toPersian(now.getFullYear(), now.getMonth() + 1, now.getDate());
      const [jy, jm, jd] = Array.isArray(p) ? p : [p.year, p.month, p.day];
      curYear = jy; curMonth = jm; selectedDay = jd;
      updateSelectors();
      renderCalendar();
    }
  }

  function updateSelectors() {
    const ySel = document.getElementById('year-select');
    const mSel = document.getElementById('month-select');
    if (ySel) ySel.value = curYear;
    if (mSel) mSel.value = curMonth;
  }

  function initSelectors() {
    const ySel = document.getElementById('year-select');
    const mSel = document.getElementById('month-select');
    if (!ySel || !mSel) return;

    ySel.innerHTML = '';
    for (let y = 1380; y <= 1420; y++) {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y;
      ySel.appendChild(opt);
    }
    ySel.value = curYear;
    ySel.onchange = () => { curYear = parseInt(ySel.value, 10); renderCalendar(); };

    mSel.innerHTML = '';
    const isFa = window.getLang && window.getLang() === 'fa';
    const monthNames = isFa ? MONTHS_FA : MONTHS_EN;
    monthNames.forEach((name, i) => {
      const opt = document.createElement('option');
      opt.value = i + 1;
      opt.textContent = `${i + 1} — ${name}`;
      mSel.appendChild(opt);
    });
    mSel.value = curMonth;
    mSel.onchange = () => { curMonth = parseInt(mSel.value, 10); renderCalendar(); };
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSelectors();
    goToday();
  });

  window.addEventListener('pdate:langchange', () => {
    initSelectors();
    renderCalendar();
  });

  window.prevMonth = prevMonth;
  window.nextMonth = nextMonth;
  window.goToday = goToday;
  window.selectDay = selectDay;
})();
