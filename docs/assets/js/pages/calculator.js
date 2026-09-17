/**
 * Date Calculator Page Controller
 */
(function() {
  'use strict';

  function showTab(id, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById(`tab-${id}`);
    if (panel) panel.classList.add('active');
    if (btn) {
      btn.classList.add('active');
    }
  }

  function calcDiff() {
    const { toGregorian, toPersianDigits } = window._PD || {};
    if (!toGregorian) return;

    const y1 = parseInt(document.getElementById('diff-y1')?.value, 10) || 1400;
    const m1 = parseInt(document.getElementById('diff-m1')?.value, 10) || 1;
    const d1 = parseInt(document.getElementById('diff-d1')?.value, 10) || 1;
    const y2 = parseInt(document.getElementById('diff-y2')?.value, 10) || 1403;
    const m2 = parseInt(document.getElementById('diff-m2')?.value, 10) || 6;
    const d2 = parseInt(document.getElementById('diff-d2')?.value, 10) || 15;

    const g1 = toGregorian(y1, m1, d1);
    const g2 = toGregorian(y2, m2, d2);
    const [gy1, gm1, gd1] = Array.isArray(g1) ? g1 : [g1.year, g1.month, g1.day];
    const [gy2, gm2, gd2] = Array.isArray(g2) ? g2 : [g2.year, g2.month, g2.day];

    const date1 = new Date(gy1, gm1 - 1, gd1);
    const date2 = new Date(gy2, gm2 - 1, gd2);

    const diffMs = Math.abs(date2 - date1);
    const diffDays = Math.round(diffMs / 86400000);
    const diffMonths = (diffDays / 30.4375).toFixed(1);
    const diffYears = (diffDays / 365.25).toFixed(2);

    const isFa = window.getLang && window.getLang() === 'fa';
    const dDays = document.getElementById('diff-days');
    const dChips = document.getElementById('diff-chips');
    const dRes = document.getElementById('diff-result');

    if (dDays) dDays.textContent = `${isFa ? toPersianDigits(diffDays) : diffDays} ${isFa ? 'روز' : 'days'}`;
    if (dChips) {
      dChips.innerHTML = `
        <div class="chip">${isFa ? 'ماه‌ها' : 'Months'}: <span>${isFa ? toPersianDigits(diffMonths) : diffMonths}</span></div>
        <div class="chip">${isFa ? 'سال‌ها' : 'Years'}: <span>${isFa ? toPersianDigits(diffYears) : diffYears}</span></div>
        <div class="chip">${isFa ? 'هفته‌ها' : 'Weeks'}: <span>${isFa ? toPersianDigits((diffDays/7).toFixed(1)) : (diffDays/7).toFixed(1)}</span></div>
      `;
    }
    if (dRes) dRes.style.display = 'block';
  }

  function calcAddSub(sign) {
    const { toGregorian, PersianDate } = window._PD || {};
    if (!toGregorian) return;

    const y = parseInt(document.getElementById('as-y')?.value, 10) || 1403;
    const m = parseInt(document.getElementById('as-m')?.value, 10) || 1;
    const d = parseInt(document.getElementById('as-d')?.value, 10) || 1;
    const amt = (parseInt(document.getElementById('as-amount')?.value, 10) || 0) * sign;
    const unit = document.getElementById('as-unit')?.value || 'day';

    const g = toGregorian(y, m, d);
    const [gy, gm, gd] = Array.isArray(g) ? g : [g.year, g.month, g.day];
    const dt = new PersianDate(gy, gm - 1, gd);

    let res;
    if (unit === 'day') res = dt.add(amt, 'day');
    else if (unit === 'month') res = dt.add(amt, 'month');
    else res = dt.add(amt, 'year');

    const isFa = window.getLang && window.getLang() === 'fa';
    const asOut = document.getElementById('as-out');
    const asRes = document.getElementById('as-result');

    if (asOut) {
      asOut.textContent = isFa ? (res.formatFa ? res.formatFa('dddd D MMMM YYYY') : res.format('YYYY/MM/DD')) : res.format('dddd, D MMMM YYYY');
    }
    if (asRes) asRes.style.display = 'block';
  }

  function calcFromNow() {
    const { toGregorian, PersianDate } = window._PD || {};
    if (!toGregorian) return;

    const y = parseInt(document.getElementById('fn-y')?.value, 10) || 1400;
    const m = parseInt(document.getElementById('fn-m')?.value, 10) || 1;
    const d = parseInt(document.getElementById('fn-d')?.value, 10) || 1;

    const g = toGregorian(y, m, d);
    const [gy, gm, gd] = Array.isArray(g) ? g : [g.year, g.month, g.day];
    const dt = new PersianDate(gy, gm - 1, gd);

    const fnFa = document.getElementById('fn-fa');
    const fnEn = document.getElementById('fn-en');
    const fnRes = document.getElementById('fn-result');

    if (fnFa) fnFa.textContent = dt.fromNowFa ? dt.fromNowFa() : dt.fromNow();
    if (fnEn) fnEn.textContent = dt.fromNow ? dt.fromNow() : '';
    if (fnRes) fnRes.style.display = 'block';
  }

  function checkLeap() {
    const { isLeapPersianYear, toPersianDigits } = window._PD || {};
    if (!isLeapPersianYear) return;

    const y = parseInt(document.getElementById('leap-year')?.value, 10) || 1403;
    const isLeap = isLeapPersianYear(y);
    const isFa = window.getLang && window.getLang() === 'fa';
    const out = document.getElementById('leap-out');
    const box = document.getElementById('leap-result-box');
    const yDisp = isFa ? toPersianDigits(y) : y;

    if (out) {
      if (isLeap) {
        out.className = 'leap-result leap-yes';
        out.textContent = isFa ? `✅ سال ${yDisp} یک سال کبیسه است (۳۶۶ روز)` : `✅ Year ${y} IS a leap year (366 days — Esfand has 30 days)`;
      } else {
        out.className = 'leap-result leap-no';
        out.textContent = isFa ? `❌ سال ${yDisp} سال عادی است (۳۶۵ روز)` : `❌ Year ${y} is a normal year (365 days — Esfand has 29 days)`;
      }
    }
    if (box) box.style.display = 'block';
  }

  document.addEventListener('DOMContentLoaded', () => {
    const y1 = document.getElementById('diff-y1'); if (y1) y1.value = 1400;
    const m1 = document.getElementById('diff-m1'); if (m1) m1.value = 1;
    const d1 = document.getElementById('diff-d1'); if (d1) d1.value = 1;
    const y2 = document.getElementById('diff-y2'); if (y2) y2.value = 1403;
    const m2 = document.getElementById('diff-m2'); if (m2) m2.value = 6;
    const d2 = document.getElementById('diff-d2'); if (d2) d2.value = 15;
    const asY = document.getElementById('as-y'); if (asY) asY.value = 1403;
    const asM = document.getElementById('as-m'); if (asM) asM.value = 1;
    const asD = document.getElementById('as-d'); if (asD) asD.value = 1;
    const asAmt = document.getElementById('as-amount'); if (asAmt) asAmt.value = 30;
    const fnY = document.getElementById('fn-y'); if (fnY) fnY.value = 1400;
    const fnM = document.getElementById('fn-m'); if (fnM) fnM.value = 1;
    const fnD = document.getElementById('fn-d'); if (fnD) fnD.value = 1;
    const leapY = document.getElementById('leap-year'); if (leapY) leapY.value = 1403;
  });

  window.addEventListener('pdate:langchange', () => {
    if (document.getElementById('diff-result')?.style.display === 'block') calcDiff();
    if (document.getElementById('as-result')?.style.display === 'block') calcAddSub(1);
    if (document.getElementById('fn-result')?.style.display === 'block') calcFromNow();
    if (document.getElementById('leap-result-box')?.style.display === 'block') checkLeap();
  });

  window.showTab = showTab;
  window.calcDiff = calcDiff;
  window.calcAddSub = calcAddSub;
  window.calcFromNow = calcFromNow;
  window.checkLeap = checkLeap;
})();
