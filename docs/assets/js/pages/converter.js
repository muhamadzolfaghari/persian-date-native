/**
 * Date Converter Controller
 */
(function() {
  'use strict';

  let mode = 'j2g';

  function setMode(m) {
    mode = m;
    const jSec = document.getElementById('sec-jalali-input');
    const gSec = document.getElementById('sec-greg-input');
    const jBtn = document.getElementById('btn-j2g');
    const gBtn = document.getElementById('btn-g2j');

    if (jSec && gSec) {
      jSec.style.display = mode === 'j2g' ? 'block' : 'none';
      gSec.style.display = mode === 'g2j' ? 'block' : 'none';
    }
    if (jBtn && gBtn) {
      jBtn.classList.toggle('active', mode === 'j2g');
      gBtn.classList.toggle('active', mode === 'g2j');
    }
    convert();
  }

  function swap() {
    setMode(mode === 'j2g' ? 'g2j' : 'j2g');
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function convert() {
    const { toGregorian, toPersian, isLeapPersianYear, toPersianDigits, PersianDate } = window._PD || {};
    if (!toGregorian) return;

    const isFa = window.getLang && window.getLang() === 'fa';
    let jy, jm, jd, gy, gm, gd;

    if (mode === 'j2g') {
      jy = parseInt(document.getElementById('jy').value, 10) || 1403;
      jm = parseInt(document.getElementById('jm').value, 10) || 1;
      jd = parseInt(document.getElementById('jd').value, 10) || 1;

      const g = toGregorian(jy, jm, jd);
      [gy, gm, gd] = Array.isArray(g) ? g : [g.year, g.month, g.day];
    } else {
      const gval = document.getElementById('gdate').value;
      if (gval) {
        const parts = gval.split('-');
        gy = parseInt(parts[0], 10);
        gm = parseInt(parts[1], 10);
        gd = parseInt(parts[2], 10);
      } else {
        const now = new Date();
        gy = now.getFullYear();
        gm = now.getMonth() + 1;
        gd = now.getDate();
      }
      const p = toPersian(gy, gm, gd);
      [jy, jm, jd] = Array.isArray(p) ? p : [p.year, p.month, p.day];
    }

    const gStr = `${gy}-${pad(gm)}-${pad(gd)}`;
    const jStr = `${jy}/${pad(jm)}/${pad(jd)}`;

    const pDate = new PersianDate(gy, gm - 1, gd);
    const faFull = pDate.formatFa ? pDate.formatFa('dddd D MMMM YYYY') : jStr;
    const enFull = pDate.format ? pDate.format('dddd, D MMMM YYYY') : gStr;
    const dow = pDate.format ? pDate.format('dddd') : '';
    const dowFa = pDate.formatFa ? pDate.formatFa('dddd') : '';
    const leap = isLeapPersianYear(jy);

    const rG = document.getElementById('res-greg');
    const rJ = document.getElementById('res-jalali');
    const rF = document.getElementById('res-fa-full');
    const rD = document.getElementById('res-dow');
    const rL = document.getElementById('res-leap');
    const cJs = document.getElementById('code-js');

    if (rG) rG.textContent = gStr;
    if (rJ) rJ.textContent = jStr;
    if (rF) rF.textContent = isFa ? faFull : enFull;
    if (rD) rD.textContent = isFa ? dowFa : dow;

    if (rL) {
      if (leap) {
        rL.textContent = isFa ? "✅ سال کبیسه (۳۶۶ روز)" : "✅ Leap Year (366 days)";
        rL.className = 'value green';
      } else {
        rL.textContent = isFa ? "❌ سال عادی (۳۶۵ روز)" : "❌ Normal Year (365 days)";
        rL.className = 'value';
      }
    }

    if (cJs) {
      cJs.textContent = mode === 'j2g'
        ? `import { persianToGregorian } from 'persian-date-native';\nconst [gy, gm, gd] = persianToGregorian(${jy}, ${jm}, ${jd}); // [${gy}, ${gm}, ${gd}]`
        : `import { gregorianToPersian } from 'persian-date-native';\nconst [jy, jm, jd] = gregorianToPersian(${gy}, ${gm}, ${gd}); // [${jy}, ${jm}, ${jd}]`;
    }
  }

  function setPreset(y, m, d) {
    if (mode === 'j2g') {
      const jyEl = document.getElementById('jy');
      const jmEl = document.getElementById('jm');
      const jdEl = document.getElementById('jd');
      if (jyEl) jyEl.value = y;
      if (jmEl) jmEl.value = m;
      if (jdEl) jdEl.value = d;
    } else {
      const gEl = document.getElementById('gdate');
      if (gEl) gEl.value = `${y}-${pad(m)}-${pad(d)}`;
    }
    convert();
  }

  function setToday() {
    const now = new Date();
    if (mode === 'j2g') {
      const { toPersian } = window._PD || {};
      if (toPersian) {
        const p = toPersian(now.getFullYear(), now.getMonth() + 1, now.getDate());
        const [jy, jm, jd] = Array.isArray(p) ? p : [p.year, p.month, p.day];
        setPreset(jy, jm, jd);
      }
    } else {
      setPreset(now.getFullYear(), now.getMonth() + 1, now.getDate());
    }
  }

  function copyCode() {
    const code = document.getElementById('code-js')?.textContent || '';
    navigator.clipboard.writeText(code).then(() => {
      const btn = document.querySelector('.copy-btn');
      if (btn) {
        btn.textContent = 'Copied! ✓';
        setTimeout(() => btn.textContent = 'Copy', 1800);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const gEl = document.getElementById('gdate');
    if (gEl) gEl.value = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

    ['jy', 'jm', 'jd', 'gdate'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', convert);
    });

    setMode('j2g');
  });

  window.addEventListener('pdate:langchange', convert);

  window.setMode = setMode;
  window.swap = swap;
  window.convert = convert;
  window.setPreset = setPreset;
  window.setToday = setToday;
  window.copyCode = copyCode;
})();
