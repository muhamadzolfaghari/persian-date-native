/**
 * persian-date-native — i18n & Localization Engine
 * Supports English (en) and Persian (fa) with full RTL/LTR support.
 */

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.converter': '🔄 Converter',
    'nav.calendar': '📅 Calendar',
    'nav.formatter': '🎨 Formatter',
    'nav.calculator': '⏱ Calculator',
    'nav.github': '⭐ GitHub',
    'nav.lang_switch': '🇮🇷 فارسی',

    // Shared / Common
    'common.copy': 'Copy',
    'common.copied': 'Copied!',
    'common.year': 'Year',
    'common.month': 'Month',
    'common.day': 'Day',
    'common.today': 'Today',
    'common.nowruz': 'Nowruz 1404',
    'common.calculate': 'Calculate',
    'common.output': 'Output',
    'common.results': 'Results',
    'common.source_code': 'JavaScript / TypeScript Code',
    'common.live_preview': 'Live Preview',

    // Month Names (Jalali)
    'month.1': 'Farvardin',
    'month.2': 'Ordibehesht',
    'month.3': 'Khordad',
    'month.4': 'Tir',
    'month.5': 'Mordad',
    'month.6': 'Shahrivar',
    'month.7': 'Mehr',
    'month.8': 'Aban',
    'month.9': 'Azar',
    'month.10': 'Dey',
    'month.11': 'Bahman',
    'month.12': 'Esfand',

    // Weekdays
    'weekday.sat': 'Sat',
    'weekday.sun': 'Sun',
    'weekday.mon': 'Mon',
    'weekday.tue': 'Tue',
    'weekday.wed': 'Wed',
    'weekday.thu': 'Thu',
    'weekday.fri': 'Fri',

    // Converter Page
    'converter.title': '🔄 Date Converter',
    'converter.subtitle': 'Convert between Jalali (Shamsi / Persian) and Gregorian dates instantly',
    'converter.tab_jalali_to_greg': 'Jalali → Gregorian',
    'converter.tab_greg_to_jalali': 'Gregorian → Jalali',
    'converter.quick': 'Quick:',
    'converter.lbl_jalali_year': 'Jalali Year (e.g. 1403)',
    'converter.lbl_greg_year': 'Gregorian Year (e.g. 2024)',
    'converter.greg_result': 'Gregorian Date (ISO / YYYY-MM-DD)',
    'converter.jalali_result': 'Jalali Date (Standard / YYYY/MM/DD)',
    'converter.persian_digits': 'Persian Digits & Full Name',
    'converter.persian_digits_val': 'Persian Formatted Output',
    'converter.day_of_week': 'Day of Week',
    'converter.leap_status': 'Jalali Leap Year Status',
    'converter.is_leap': '✅ Leap Year (366 days)',
    'converter.not_leap': '❌ Normal Year (365 days)',

    // Calendar Page
    'calendar.title': '📅 Persian Calendar',
    'calendar.subtitle': 'Interactive Jalali monthly calendar with live date conversion & day picking',
    'calendar.prev': '‹ Prev',
    'calendar.next': 'Next ›',
    'calendar.today_btn': 'Today',
    'calendar.selected_details': 'Selected Date Details',
    'calendar.jalali_full': 'Jalali Full Date',
    'calendar.greg_equiv': 'Gregorian Equivalent',
    'calendar.weekday_label': 'Day of Week',
    'calendar.year_type': 'Year Type',
    'calendar.days_in_month': 'Days in Month',

    // Formatter Page
    'formatter.title': '🎨 Format Playground',
    'formatter.subtitle': 'Live Persian date token formatter with interactive token reference',
    'formatter.input_label': 'Target Jalali Date (Year / Month / Day)',
    'formatter.format_pattern': 'Format Pattern String',
    'formatter.format_placeholder': 'e.g. dddd D MMMM YYYY',
    'formatter.presets': 'Quick Presets:',
    'formatter.result_english': 'Formatted (English Numerals)',
    'formatter.result_persian': 'Formatted (Persian Numerals / formatFa)',
    'formatter.tokens_title': 'Supported Token Reference',
    'formatter.token_header_token': 'Token',
    'formatter.token_header_desc': 'Description',
    'formatter.token_header_example': 'Example',

    // Calculator Page
    'calculator.title': '⏱ Date Calculator',
    'calculator.subtitle': 'Calculate differences, date arithmetic, relative time, and leap years',
    'calculator.tab_diff': 'Date Difference',
    'calculator.tab_add': 'Add / Subtract',
    'calculator.tab_fromnow': 'Relative Time (fromNow)',
    'calculator.tab_leap': 'Leap Year Checker',
    'calculator.diff_start': 'Start Date (Jalali)',
    'calculator.diff_end': 'End Date (Jalali)',
    'calculator.diff_days': 'Total Days',
    'calculator.diff_months': 'Approx. Months',
    'calculator.diff_years': 'Years Difference',
    'calculator.add_base': 'Base Date (Jalali)',
    'calculator.add_amount': 'Amount',
    'calculator.add_unit': 'Unit',
    'calculator.unit_days': 'Days',
    'calculator.unit_months': 'Months',
    'calculator.unit_years': 'Years',
    'calculator.action_add': '➕ Add',
    'calculator.action_sub': '➖ Subtract',
    'calculator.fromnow_target': 'Target Date',
    'calculator.fromnow_result_en': 'English Relative Time',
    'calculator.fromnow_result_fa': 'Persian Relative Time (Fa)',
    'calculator.leap_check_year': 'Jalali Year to Test (e.g. 1403)',
    'calculator.leap_check_btn': 'Check Leap Year',

    // Home Page
    'home.badge': '⚡ Zero Dependencies • 89M+ ops/sec • Native Date Inheritance',
    'home.hero_title': 'The Ultra-Fast Persian Date Engine for JS & TS',
    'home.hero_sub': 'Sub-microsecond Jalali conversions, true Date class inheritance, Day.js compatibility, and comprehensive formatting tools.',
    'home.btn_tools': 'Explore Online Tools',
    'home.btn_docs': 'View Documentation',
    'home.tools_title': 'Online Tools & Playgrounds',
    'home.tools_desc': 'Interactive utilities powered natively by persian-date-native in your browser',
    'home.tool_conv_title': '🔄 Date Converter',
    'home.tool_conv_desc': 'Bidirectional Shamsi ↔ Gregorian conversion with instant output & code generation.',
    'home.tool_cal_title': '📅 Persian Calendar',
    'home.tool_cal_desc': 'Interactive monthly calendar view with month navigation and day picking.',
    'home.tool_form_title': '🎨 Format Playground',
    'home.tool_form_desc': 'Test custom format patterns and preview Persian/English formatted output.',
    'home.tool_calc_title': '⏱ Date Calculator',
    'home.tool_calc_desc': 'Calculate duration between dates, add/subtract intervals, and check leap years.',
    'home.bench_title': '🚀 In-Browser Benchmark Runner',
    'home.bench_desc': 'Run micro-benchmarks directly in your browser to verify sub-microsecond performance.',
    'home.bench_btn': '⚡ Run Live Benchmark',
    'home.install_title': '📦 Installation',
    'home.quickstart_title': '🚀 Quick Start',
    'home.features_title': '✨ Why persian-date-native?'
  },

  fa: {
    // Navigation
    'nav.home': 'خانه',
    'nav.converter': '🔄 تبدیل تاریخ',
    'nav.calendar': '📅 تقویم شمسی',
    'nav.formatter': '🎨 فرمت‌ساز',
    'nav.calculator': '⏱ ماشین‌حساب تاریخ',
    'nav.github': '⭐ گیت‌هاب',
    'nav.lang_switch': '🇬🇧 English',

    // Shared / Common
    'common.copy': 'کپی',
    'common.copied': 'کپی شد!',
    'common.year': 'سال',
    'common.month': 'ماه',
    'common.day': 'روز',
    'common.today': 'امروز',
    'common.nowruz': 'نوروز ۱۴۰۴',
    'common.calculate': 'محاسبه',
    'common.output': 'خروجی',
    'common.results': 'نتایج',
    'common.source_code': 'کد جاوااسکریپت / تایپ‌اسکریپت',
    'common.live_preview': 'پیش‌نمایش زنده',

    // Month Names (Jalali)
    'month.1': 'فروردین',
    'month.2': 'اردیبهشت',
    'month.3': 'خرداد',
    'month.4': 'تیر',
    'month.5': 'مرداد',
    'month.6': 'شهریور',
    'month.7': 'مهر',
    'month.8': 'آبان',
    'month.9': 'آذر',
    'month.10': 'دی',
    'month.11': 'بهمن',
    'month.12': 'اسفند',

    // Weekdays
    'weekday.sat': 'شنبه',
    'weekday.sun': 'یک‌شنبه',
    'weekday.mon': 'دوشنبه',
    'weekday.tue': 'سه‌شنبه',
    'weekday.wed': 'چهارشنبه',
    'weekday.thu': 'پنج‌شنبه',
    'weekday.fri': 'جمعه',

    // Converter Page
    'converter.title': '🔄 تبدیل آنلاین تاریخ شمسی و میلادی',
    'converter.subtitle': 'تبدیل دقیق و آنی تاریخ هجری خورشیدی (شمسی) به میلادی و برعکس',
    'converter.tab_jalali_to_greg': 'شمسی به میلادی',
    'converter.tab_greg_to_jalali': 'میلادی به شمسی',
    'converter.quick': 'پیش‌فرض:',
    'converter.lbl_jalali_year': 'سال شمسی (مثلاً ۱۴۰۳)',
    'converter.lbl_greg_year': 'سال میلادی (مثلاً 2024)',
    'converter.greg_result': 'تاریخ میلادی (ISO / YYYY-MM-DD)',
    'converter.jalali_result': 'تاریخ شمسی استاندارد (YYYY/MM/DD)',
    'converter.persian_digits': 'ارقام فارسی و نام کامل',
    'converter.persian_digits_val': 'خروجی با ارقام و حروف فارسی',
    'converter.day_of_week': 'روز هفته',
    'converter.leap_status': 'وضعیت سال کبیسه شمسی',
    'converter.is_leap': '✅ سال کبیسه (۳۶۶ روز)',
    'converter.not_leap': '❌ سال عادی (۳۶۵ روز)',

    // Calendar Page
    'calendar.title': '📅 تقویم آنلاین شمسی',
    'calendar.subtitle': 'تقویم ماهانه تعاملی با قابلیت انتخاب روز، تبدیل همزمان و تشخیص سال کبیسه',
    'calendar.prev': '‹ ماه قبل',
    'calendar.next': 'ماه بعد ›',
    'calendar.today_btn': 'امروز',
    'calendar.selected_details': 'مشخصات روز انتخاب‌شده',
    'calendar.jalali_full': 'تاریخ کامل شمسی',
    'calendar.greg_equiv': 'معادل تاریخ میلادی',
    'calendar.weekday_label': 'نام روز هفته',
    'calendar.year_type': 'نوع سال',
    'calendar.days_in_month': 'تعداد روزهای ماه',

    // Formatter Page
    'formatter.title': '🎨 محیط آزمایش فرمت تاریخ',
    'formatter.subtitle': 'آزمایش و مشاهده آنلاین الگوهای فرمت تاریخ شمسی با حروف و اعداد فارسی و انگلیسی',
    'formatter.input_label': 'تاریخ شمسی مورد نظر (سال / ماه / روز)',
    'formatter.format_pattern': 'الگوی فرمت (Format Pattern)',
    'formatter.format_placeholder': 'مثال: dddd D MMMM YYYY',
    'formatter.presets': 'الگوهای پرکاربرد:',
    'formatter.result_english': 'خروجی با ارقام انگلیسی',
    'formatter.result_persian': 'خروجی با ارقام و نام‌های فارسی (formatFa)',
    'formatter.tokens_title': 'راهنمای توکن‌های فرمت‌دهی',
    'formatter.token_header_token': 'توکن',
    'formatter.token_header_desc': 'توضیحات',
    'formatter.token_header_example': 'نمونه',

    // Calculator Page
    'calculator.title': '⏱ ماشین‌حساب تاریخ شمسی',
    'calculator.subtitle': 'محاسبه اختلاف دو تاریخ، افزایش/کاهش زمان، زمان نسبی (چند وقت پیش) و تشخیص کبیسه',
    'calculator.tab_diff': 'اختلاف دو تاریخ',
    'calculator.tab_add': 'افزودن / کسر روز و ماه',
    'calculator.tab_fromnow': 'زمان نسبی (fromNow)',
    'calculator.tab_leap': 'بررسی سال کبیسه',
    'calculator.diff_start': 'تاریخ شروع (شمسی)',
    'calculator.diff_end': 'تاریخ پایان (شمسی)',
    'calculator.diff_days': 'تعداد روز کل',
    'calculator.diff_months': 'تعداد ماه (تقریبی)',
    'calculator.diff_years': 'اختلاف سال',
    'calculator.add_base': 'تاریخ مبدا (شمسی)',
    'calculator.add_amount': 'مقدار',
    'calculator.add_unit': 'واحد زمانی',
    'calculator.unit_days': 'روز',
    'calculator.unit_months': 'ماه',
    'calculator.unit_years': 'سال',
    'calculator.action_add': '➕ افزودن',
    'calculator.action_sub': '➖ کسر کردن',
    'calculator.fromnow_target': 'تاریخ مورد نظر',
    'calculator.fromnow_result_en': 'زمان نسبی انگلیسی',
    'calculator.fromnow_result_fa': 'زمان نسبی فارسی (Fa)',
    'calculator.leap_check_year': 'سال شمسی جهت بررسی (مثلاً ۱۴۰۳)',
    'calculator.leap_check_btn': 'بررسی وضعیت کبیسه',

    // Home Page
    'home.badge': '⚡ بدون وابستگی خارجی • بیش از ۸۹ میلیون عملیات در ثانیه • ارث‌بری بومی از Date',
    'home.hero_title': 'سریع‌ترین موتور تاریخ خورشیدی (شمسی) برای JS و TS',
    'home.hero_sub': 'تبدیل‌های فوق سریع زیر میکروثانیه‌ای، سازگاری کامل با کلاس Date بومی جاوااسکریپت و Day.js با ابزارهای کامل فرمت‌دهی فارسی.',
    'home.btn_tools': 'مشاهده ابزارهای آنلاین',
    'home.btn_docs': 'مستندات و راهنما',
    'home.tools_title': 'مجموعه ابزارهای آنلاین',
    'home.tools_desc': 'ابزارهای کاربردی و تعاملی تحت وب با قدرت مستقیم کتابخانه در مرورگر شما',
    'home.tool_conv_title': '🔄 تبدیل آنلاین تاریخ',
    'home.tool_conv_desc': 'تبدیل دوطرفه شمسی ↔ میلادی با ارقام فارسی و تولید کد آماده جاوااسکریپت.',
    'home.tool_cal_title': '📅 تقویم تعاملی شمسی',
    'home.tool_cal_desc': 'تقویم ماهانه خورشیدی با جابجایی ماه‌ها، انتخاب روز و نمایش روزهای هفته.',
    'home.tool_form_title': '🎨 فرمت‌ساز آنلاین',
    'home.tool_form_desc': 'تست فرمت‌های سفارشی تاریخ به صورت زنده با ارقام فارسی و انگلیسی.',
    'home.tool_calc_title': '⏱ ماشین‌حساب تاریخ',
    'home.tool_calc_desc': 'محاسبه اختلاف روزها، جمع و تفریق تاریخ، زمان نسبی و سال‌های کبیسه.',
    'home.bench_title': '🚀 بنچمارک و تست سرعت زنده در مرورگر',
    'home.bench_desc': 'اجرای تست سرعت مستقیم در مرورگر خود برای مشاهده توان محاسباتی زیر میکروثانیه.',
    'home.bench_btn': '⚡ اجرای بنچمارک زنده',
    'home.install_title': '📦 نحوه نصب و راه‌اندازی',
    'home.quickstart_title': '🚀 شروع سریع',
    'home.features_title': '✨ چرا persian-date-native؟'
  }
};

let currentLang = localStorage.getItem('pdate_lang') || 'en';

function t(key) {
  const dict = translations[currentLang] || translations.en;
  return dict[key] || translations.en[key] || key;
}

function getLang() {
  return currentLang;
}

function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'fa') lang = 'en';
  currentLang = lang;
  localStorage.setItem('pdate_lang', lang);

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';

  // Apply translations to all DOM nodes with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Apply placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update language switcher buttons
  document.querySelectorAll('.lang-switcher-btn').forEach(btn => {
    btn.textContent = lang === 'fa' ? '🇬🇧 English' : '🇮🇷 فارسی';
  });

  // Dispatch custom event for pages to re-render page-specific UI
  window.dispatchEvent(new CustomEvent('pdate:langchange', { detail: { lang } }));
}

function toggleLanguage() {
  setLanguage(currentLang === 'en' ? 'fa' : 'en');
}

// Persian digit conversion helper
function toPersianDigits(str) {
  if (str === null || str === undefined) return '';
  const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(str).replace(/[0-9]/g, w => faDigits[+w]);
}

// Initial auto-apply on load
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
});
