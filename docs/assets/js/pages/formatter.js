/**
 * Format Playground Page Controller
 */
(function() {
  'use strict';

  function updatePreview() {
    const { PersianDate, toGregorian, toPersianDigits } = window._PD || {};
    if (!PersianDate) return;

    const pattern = document.getElementById('fmt-input')?.value || 'YYYY/MM/DD';
    const gval = document.getElementById('fmt-date')?.value;

    let d;
    if (gval) {
      const parts = gval.split('-');
      d = new PersianDate(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 14, 30, 0);
    } else {
      d = new PersianDate();
    }

    const outEn = document.getElementById('out-en');
    const outFa = document.getElementById('out-fa');

    if (outEn) outEn.textContent = d.format ? d.format(pattern) : '';
    if (outFa) outFa.textContent = d.formatFa ? d.formatFa(pattern) : '';
  }

  function setPreset(p) {
    const input = document.getElementById('fmt-input');
    if (input) {
      input.value = p;
      updatePreview();
    }
  }

  function insertToken(tok) {
    const input = document.getElementById('fmt-input');
    if (!input) return;
    const start = input.selectionStart || input.value.length;
    const end = input.selectionEnd || input.value.length;
    input.value = input.value.substring(0, start) + ' ' + tok + ' ' + input.value.substring(end);
    input.focus();
    updatePreview();
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const dtInput = document.getElementById('fmt-date');
    if (dtInput) {
      dtInput.value = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
    }

    const fmtInput = document.getElementById('fmt-input');
    if (fmtInput) fmtInput.addEventListener('input', updatePreview);
    if (dtInput) dtInput.addEventListener('input', updatePreview);

    updatePreview();
  });

  window.addEventListener('pdate:langchange', updatePreview);

  window.updatePreview = updatePreview;
  window.setPreset = setPreset;
  window.insertToken = insertToken;
})();
