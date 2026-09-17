/**
 * Interactive Framework Playground Logic
 */
(function() {
  'use strict';

  let activePersianDate = window.PersianDateNative ? window.PersianDateNative.persianDate() : new Date();

  const frameworkData = {
    vanilla: {
      title: "Vanilla JavaScript & CDN",
      render: function() {
        const d = window.PersianDateNative ? window.PersianDateNative.persianDate(activePersianDate) : new Date();
        const formatted = d.formatFa ? d.formatFa('dddd D MMMM YYYY - ساعت HH:mm:ss') : d.toString();
        const [jy, jm, jd] = window.PersianDateNative ? window.PersianDateNative.gregorianToPersian(d.getFullYear(), d.getMonth(), d.getDate()) : [0,0,0];
        return `
          <div dir="rtl" style="font-family: 'Vazirmatn', sans-serif;">
            <h2 style="color: var(--accent); margin-bottom: 8px;">${formatted}</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">فاصله زمانی: <strong>${d.fromNow ? d.fromNow() : ''}</strong> | اعداد شمسی: ${jy}/${jm}/${jd}</p>
            <div class="live-demo-controls">
              <button class="btn btn-secondary live-btn" data-action="prev-day">◀ روز قبل</button>
              <button class="btn btn-primary live-btn" data-action="today">امروز</button>
              <button class="btn btn-secondary live-btn" data-action="next-day">روز بعد ▶</button>
            </div>
          </div>
        `;
      },
      code: `<!-- Load from CDN -->
<script src="https://unpkg.com/persian-date-native"><\/script>

<script>
  const { persianDate, gregorianToPersian } = window.PersianDateNative;

  // Format with Persian numerals
  const now = persianDate();
  console.log(now.formatFa("dddd D MMMM YYYY - HH:mm"));

  // Zero-allocation pure integer conversion
  const [jy, jm, jd] = gregorianToPersian(2024, 9, 2);
  console.log(jy, jm, jd); // 1403, 6, 12
<\/script>`
    },
    react: {
      title: "React Component",
      render: function() {
        const d = window.PersianDateNative ? window.PersianDateNative.persianDate(activePersianDate) : new Date();
        return `
          <div dir="rtl" style="font-family: 'Vazirmatn', sans-serif;">
            <h3 style="color: var(--accent);">React State: ${d.formatFa ? d.formatFa('YYYY/MM/DD') : ''}</h3>
            <p style="color: var(--text-muted); margin-top: 4px;">ماه جاری: ${d.formatFa ? d.formatFa('MMMM YYYY') : ''} (${d.daysInMonth ? d.daysInMonth() : 30} روز)</p>
            <div class="live-demo-controls">
              <button class="btn btn-secondary live-btn" data-action="prev-month">◀ ماه قبل</button>
              <button class="btn btn-primary live-btn" data-action="today">امروز</button>
              <button class="btn btn-secondary live-btn" data-action="next-month">ماه بعد ▶</button>
            </div>
          </div>
        `;
      },
      code: `import React, { useState } from "react";
import { persianDate } from "persian-date-native";

export function PersianCalendarCard() {
  const [date, setDate] = useState(() => persianDate());

  return (
    <div dir="rtl" className="p-4 border rounded-xl shadow-lg">
      <h2 className="text-xl font-bold">{date.formatFa("dddd D MMMM YYYY")}</h2>
      <p className="text-gray-500">روزهای این ماه: {date.daysInMonth()} روز</p>
      <div className="flex gap-2 mt-4">
        <button onClick={() => setDate(persianDate(date).subtract(1, "month"))}>ماه قبل</button>
        <button onClick={() => setDate(persianDate(date).add(1, "month"))}>ماه بعد</button>
      </div>
    </div>
  );
}`
    },
    nextjs: {
      title: "Next.js (App Router & RSC)",
      render: function() {
        const d = window.PersianDateNative ? window.PersianDateNative.persianDate(activePersianDate) : new Date();
        return `
          <div dir="rtl" style="font-family: 'Vazirmatn', sans-serif;">
            <p style="color: var(--emerald); font-weight: 700;">✓ React Server Component (RSC) Safe</p>
            <h3 style="margin-top: 8px;">تاریخ سرور: ${d.formatFa ? d.formatFa('dddd D MMMM YYYY') : ''}</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 4px;">خروجی بهینه شده بدون نیاز به بارگذاری اضافه در کلاینت</p>
          </div>
        `;
      },
      code: `// app/page.tsx (Next.js App Router Server Component)
import { persianDate, gregorianToPersian } from "persian-date-native";

export default function Page() {
  const serverTime = persianDate();
  const [jy, jm, jd] = gregorianToPersian(2024, 9, 2);

  return (
    <main dir="rtl" className="p-8">
      <h1>تاریخ امروز: {serverTime.formatFa("dddd D MMMM YYYY")}</h1>
      <p>محاسبه سمت سرور: {jy}/{jm}/{jd}</p>
    </main>
  );
}`
    },
    vue: {
      title: "Vue 3 Composition API",
      render: function() {
        const d = window.PersianDateNative ? window.PersianDateNative.persianDate(activePersianDate) : new Date();
        return `
          <div dir="rtl" style="font-family: 'Vazirmatn', sans-serif;">
            <h3 style="color: var(--emerald);">Vue 3 ref(): ${d.formatFa ? d.formatFa('dddd D MMMM YYYY') : ''}</h3>
            <div class="live-demo-controls">
              <button class="btn btn-secondary live-btn" data-action="prev-week">◀ هفته قبل</button>
              <button class="btn btn-primary live-btn" data-action="today">امروز</button>
              <button class="btn btn-secondary live-btn" data-action="next-week">هفته بعد ▶</button>
            </div>
          </div>
        `;
      },
      code: `<script setup lang="ts">
import { ref, computed } from "vue";
import { persianDate } from "persian-date-native";

const date = ref(persianDate());
const formatted = computed(() => date.value.formatFa("dddd D MMMM YYYY"));

function nextWeek() {
  date.value = persianDate(date.value).add(1, "week");
}
</script>

<template>
  <div dir="rtl">
    <h2>{{ formatted }}</h2>
    <button @click="nextWeek">هفته بعد</button>
  </div>
</template>`
    },
    angular: {
      title: "Angular Component & Pipe",
      render: function() {
        const d = window.PersianDateNative ? window.PersianDateNative.persianDate(activePersianDate) : new Date();
        return `
          <div dir="rtl" style="font-family: 'Vazirmatn', sans-serif;">
            <h3>Angular Pipe Output: ${d.formatFa ? d.formatFa('YYYY/MM/DD') : ''}</h3>
            <p style="color: var(--text-muted); margin-top: 4px;">سال کبیسه: ${d.isLeapYear && d.isLeapYear() ? '✅ بله (۳۶۶ روز)' : '❌ خیر (۳۶۵ روز)'}</p>
          </div>
        `;
      },
      code: `import { Pipe, PipeTransform } from "@angular/core";
import { persianDate } from "persian-date-native";

@Pipe({ name: "persianDate", standalone: true })
export class PersianDatePipe implements PipeTransform {
  transform(val: Date | string, format: string = "YYYY/MM/DD"): string {
    return persianDate(val).formatFa(format);
  }
}`
    },
    svelte: {
      title: "Svelte 5",
      render: function() {
        const d = window.PersianDateNative ? window.PersianDateNative.persianDate(activePersianDate) : new Date();
        return `
          <div dir="rtl" style="font-family: 'Vazirmatn', sans-serif;">
            <h3 style="color: var(--amber);">Svelte 5 $state: ${d.formatFa ? d.formatFa('dddd D MMMM YYYY') : ''}</h3>
          </div>
        `;
      },
      code: `<script>
  import { persianDate } from "persian-date-native";
  let date = $state(persianDate());
</script>

<div dir="rtl">
  <h2>{date.formatFa("dddd D MMMM YYYY")}</h2>
  <button onclick={() => date = persianDate(date).add(1, "day")}>روز بعد</button>
</div>`
    },
    jquery: {
      title: "jQuery Integration",
      render: function() {
        const d = window.PersianDateNative ? window.PersianDateNative.persianDate(activePersianDate) : new Date();
        return `
          <div dir="rtl" style="font-family: 'Vazirmatn', sans-serif;">
            <h3>jQuery Selector: <span style="color: var(--accent);">${d.formatFa ? d.formatFa('YYYY/MM/DD') : ''}</span></h3>
          </div>
        `;
      },
      code: `$(document).ready(function() {
  const { persianDate } = window.PersianDateNative;
  const now = persianDate();
  $("#date-label").text(now.formatFa("dddd D MMMM YYYY"));
});`
    },
    laravel: {
      title: "Laravel Blade Template",
      render: function() {
        const d = window.PersianDateNative ? window.PersianDateNative.persianDate(activePersianDate) : new Date();
        return `
          <div dir="rtl" style="font-family: 'Vazirmatn', sans-serif;">
            <p style="color: var(--text-muted);">تاریخ فرمت شده در Blade:</p>
            <h3 style="color: var(--red); margin-top: 4px;">${d.formatFa ? d.formatFa('D MMMM YYYY ساعت HH:mm') : ''}</h3>
          </div>
        `;
      },
      code: `<!-- resources/views/post.blade.php -->
<script src="https://unpkg.com/persian-date-native"><\/script>

<span id="post-date"></span>

<script>
  const { persianDate } = window.PersianDateNative;
  const serverIso = "{{ $post->created_at->toISOString() }}";
  document.getElementById('post-date').textContent = 
    persianDate(new Date(serverIso)).formatFa("dddd D MMMM YYYY");
<\/script>`
    },
    wordpress: {
      title: "WordPress Theme Integration",
      render: function() {
        const d = window.PersianDateNative ? window.PersianDateNative.persianDate(activePersianDate) : new Date();
        return `
          <div dir="rtl" style="font-family: 'Vazirmatn', sans-serif;">
            <p style="color: var(--text-muted);">تاریخ نوشته در وردپرس:</p>
            <h3 style="color: var(--primary); margin-top: 4px;">${d.formatFa ? d.formatFa('D MMMM YYYY') : ''}</h3>
          </div>
        `;
      },
      code: `// In functions.php
function enqueue_persian_date() {
    wp_enqueue_script('persian-date-native', 'https://unpkg.com/persian-date-native', [], '1.2.3', true);
}
add_action('wp_enqueue_scripts', 'enqueue_persian_date');`
    }
  };

  let currentFramework = 'vanilla';

  function showFramework(fw) {
    if (!frameworkData[fw]) return;
    currentFramework = fw;

    document.querySelectorAll('.framework-tab').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-framework') === fw);
    });

    const data = frameworkData[fw];
    const previewEl = document.getElementById('example-preview');
    const codeEl = document.getElementById('example-code');

    if (previewEl) previewEl.innerHTML = data.render();
    if (codeEl) {
      if (window.SyntaxHighlighter) {
        codeEl.innerHTML = window.SyntaxHighlighter.highlight(data.code);
      } else {
        codeEl.textContent = data.code;
      }
    }
  }

  function changeDate(amount, unit) {
    if (window.PersianDateNative) {
      activePersianDate = window.PersianDateNative.persianDate(activePersianDate).add(amount, unit);
    }
    showFramework(currentFramework);
  }

  function resetDate() {
    if (window.PersianDateNative) {
      activePersianDate = window.PersianDateNative.persianDate();
    }
    showFramework(currentFramework);
  }

  function copyExampleCode() {
    const data = frameworkData[currentFramework];
    if (!data) return;
    navigator.clipboard.writeText(data.code).then(() => {
      const btn = document.querySelector('.copy-btn');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => btn.textContent = orig, 1800);
      }
    });
  }

  // Event Delegation for live demo button clicks
  document.addEventListener('DOMContentLoaded', () => {
    // Framework sidebar clicks
    document.querySelectorAll('.framework-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const fw = tab.getAttribute('data-framework');
        if (fw) showFramework(fw);
      });
    });

    // Preview area button delegation
    const previewBox = document.getElementById('example-preview');
    if (previewBox) {
      previewBox.addEventListener('click', (e) => {
        const btn = e.target.closest('.live-btn');
        if (!btn) return;
        const action = btn.getAttribute('data-action');
        if (action === 'prev-day') changeDate(-1, 'day');
        else if (action === 'next-day') changeDate(1, 'day');
        else if (action === 'today') resetDate();
        else if (action === 'prev-month') changeDate(-1, 'month');
        else if (action === 'next-month') changeDate(1, 'month');
        else if (action === 'prev-week') changeDate(-1, 'week');
        else if (action === 'next-week') changeDate(1, 'week');
      });
    }

    // Initialize default framework
    showFramework('vanilla');
  });

  // Expose global methods
  window.showFramework = showFramework;
  window.changeDate = changeDate;
  window.resetDate = resetDate;
  window.copyExampleCode = copyExampleCode;
})();
