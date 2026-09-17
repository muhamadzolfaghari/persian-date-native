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
    'nav.examples': '💻 Examples',
    'nav.github': '⭐ GitHub',
    'nav.lang_switch': '🇮🇷 فارسی',

    // Shared / Common
    'common.copy': 'Copy',
    'common.copied': 'Copied! ✅',
    'common.clear': '✕ Clear',
    'common.year': 'Year',
    'common.month': 'Month',
    'common.day': 'Day',
    'common.today': 'Today',
    'common.nowruz': 'Nowruz 1404',
    'common.calculate': 'Calculate ↵',
    'common.calculate_again': '↻ Calculate',
    'common.output': 'Output',
    'common.results': 'Results',
    'common.source_code': 'JavaScript / TypeScript Code',
    'common.live_preview': 'Live Preview',
    'common.footer_text': 'Crafted with ❤️ for the JavaScript & TypeScript developer community.',
    'common.footer_license': 'Published under MIT / ISC License | Available on GitHub',
    'common.quick': 'Quick Presets:',

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
    'weekday.sat': 'Saturday',
    'weekday.sun': 'Sunday',
    'weekday.mon': 'Monday',
    'weekday.tue': 'Tuesday',
    'weekday.wed': 'Wednesday',
    'weekday.thu': 'Thursday',
    'weekday.fri': 'Friday',

    'weekday.short.sat': 'Sat',
    'weekday.short.sun': 'Sun',
    'weekday.short.mon': 'Mon',
    'weekday.short.tue': 'Tue',
    'weekday.short.wed': 'Wed',
    'weekday.short.thu': 'Thu',
    'weekday.short.fri': 'Fri',

    // Converter Page
    'converter.title': '🔄 Date Converter',
    'converter.subtitle': 'Instant high-precision conversion between Jalali (Shamsi / Persian) and Gregorian calendars',
    'converter.tab_jalali_to_greg': 'Jalali → Gregorian',
    'converter.tab_greg_to_jalali': 'Gregorian → Jalali',
    'converter.quick': 'Quick Presets:',
    'converter.lbl_jalali_year': 'Jalali Year (e.g. 1403)',
    'converter.lbl_greg_year': 'Gregorian Year (e.g. 2024)',
    'converter.greg_result': 'Gregorian Date (ISO / YYYY-MM-DD)',
    'converter.jalali_result': 'Jalali Date (Standard / YYYY/MM/DD)',
    'converter.persian_digits': 'Persian Formatted Output',
    'converter.persian_digits_val': 'Formatted with Persian numerals & month name',
    'converter.day_of_week': 'Day of the Week',
    'converter.leap_status': 'Jalali Leap Year Status',
    'converter.is_leap': '✅ Leap Year (366 days)',
    'converter.not_leap': '❌ Normal Year (365 days)',

    // Calendar Page
    'calendar.title': '📅 Persian Calendar',
    'calendar.subtitle': 'Interactive Jalali monthly calendar with instant Gregorian mapping & day selection',
    'calendar.prev': '‹ Prev',
    'calendar.next': 'Next ›',
    'calendar.today_btn': '📍 Today',
    'calendar.selected_details': 'Selected Date Details',
    'calendar.jalali_full': 'Jalali Full Date',
    'calendar.greg_equiv': 'Gregorian Equivalent',
    'calendar.weekday_label': 'Day of Week',
    'calendar.year_type': 'Year Type',
    'calendar.days_in_month': 'Days in Month',
    'calendar.click_hint': 'Click a day to inspect full details',

    // Formatter Page
    'formatter.title': '🎨 Format Playground',
    'formatter.subtitle': 'Interactive Persian date formatting playground with full token reference',
    'formatter.input_label': 'Target Date',
    'formatter.format_pattern': 'Format Pattern String',
    'formatter.format_placeholder': 'e.g. dddd, D MMMM YYYY HH:mm:ss',
    'formatter.presets': 'Quick Presets:',
    'formatter.result_english': 'English Numerals Output',
    'formatter.result_persian': 'Persian Numerals & Names (formatFa)',
    'formatter.tokens_title': 'Supported Token Reference — Click to Insert',
    'formatter.token_header_token': 'Token',
    'formatter.token_header_desc': 'Description',
    'formatter.token_header_example': 'Example',

    // Calculator Page
    'calculator.title': '⏱ Date Calculator',
    'calculator.subtitle': 'Calculate duration, add/subtract time, relative humanized time, and verify leap years',
    'calculator.tab_diff': '📏 Date Difference',
    'calculator.tab_add': '➕ Add / Subtract',
    'calculator.tab_fromnow': '🕐 Relative Time (fromNow)',
    'calculator.tab_leap': '🌀 Leap Year Checker',
    'calculator.diff_start': 'From Date (Jalali)',
    'calculator.diff_end': 'To Date (Jalali)',
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
    'calculator.fromnow_target': 'Target Jalali Date',
    'calculator.fromnow_result_en': 'English Relative Time',
    'calculator.fromnow_result_fa': 'Persian Relative Time',
    'calculator.leap_check_year': 'Jalali Year to Test (e.g. 1403)',
    'calculator.leap_check_btn': 'Check Leap Year Status',

    // Examples Page
    'examples.title': '💻 Framework & CDN Interactive Examples',
    'examples.subtitle': 'Run, test, and copy Persian date implementations for React, Next.js, Vue, Angular, Svelte, jQuery, Laravel, and vanilla HTML.',
    'examples.live_badge': '● LIVE INTERACTIVE PREVIEW',
    'examples.source_code': 'Source Code',
    'examples.copy_code': '📋 Copy Code',

    // Home Page Specific
    'home.badge': '⚡ Zero Dependencies • 89M+ ops/sec • Native Date Inheritance',
    'home.hero_title': 'The Ultra-Fast Persian Date Engine for JS & TS',
    'home.hero_sub': 'Sub-microsecond Jalali conversions, true native Date class inheritance, Day.js compatibility, and comprehensive formatting helpers.',
    'home.btn_github': '⭐ View on GitHub',
    'home.btn_npm': '📦 NPM Package',
    'home.tools_title': '⚡ Online Tools:',
    'home.card1_title': 'Live Persian Calendar',
    'home.card2_title': 'Bidirectional Shamsi ↔ Gregorian Converter',
    'home.card3_title': 'Formatting & Day.js Playground',
    'home.bench_title': 'Comprehensive JavaScript Persian Date Ecosystem Comparison',
    'home.bench_btn': '🚀 Run In-Browser Benchmark',
    'home.bench_running': 'Running benchmark...',
    'home.bench_again': '🚀 Run Benchmark Again',
    'home.lbl_persian_date': 'Jalali Date (Year / Month / Day):',
    'home.lbl_greg_equiv': 'Gregorian Equivalent:',
    'home.lbl_day_of_week': 'Day of Week:',
    'home.lbl_leap_status': 'Leap Year Status:',
    'home.lbl_rel_time': 'Relative Time from Now:',
    'home.lbl_format_tpl': 'Format Template:',
    'home.lbl_math_op': 'Date Math Operation:',
    'home.lbl_out_en': 'English Format Output:',
    'home.lbl_out_fa': 'Persian Format Output (formatFa):',
    'home.opt_no_change': 'No modification',
    'home.opt_add_10': '+ 10 days',
    'home.opt_sub_1m': '- 1 month',
    'home.opt_start_m': 'Start of month',
    'home.opt_end_y': 'End of year',
    'home.selected_day_lbl': 'Selected day:',

    // Table Headers
    'th.feature': 'Feature / Library',
    'th.pure_speed': 'Pure Conversion Speed',
    'th.deps': 'Dependencies',
    'th.tuple_unpack': 'Tuple Unpacking [y, m, d]',
    'th.obj_unpack': 'Object Unpacking {year, month, date}',
    'th.instanceof_date': 'Native Date (instanceof Date)',
    'th.math_ops': 'Math Ops (add, subtract, startOf)',
    'th.fa_digits': 'Persian Digits (formatFa)',
    'th.from_now': 'Relative Time (fromNow)',
    'th.dayjs_plugin': 'Official Day.js Plugin'
  },

  fa: {
    // Navigation
    'nav.home': 'خانه',
    'nav.converter': '🔄 تبدیل تاریخ',
    'nav.calendar': '📅 تقویم شمسی',
    'nav.formatter': '🎨 فرمت‌ساز',
    'nav.calculator': '⏱ ماشین‌حساب تاریخ',
    'nav.examples': '💻 نمونه کدها',
    'nav.github': '⭐ گیت‌هاب',
    'nav.lang_switch': '🇬🇧 English',

    // Shared / Common
    'common.copy': 'کپی',
    'common.copied': 'کپی شد! ✅',
    'common.clear': '✕ پاک‌کردن',
    'common.year': 'سال',
    'common.month': 'ماه',
    'common.day': 'روز',
    'common.today': 'امروز',
    'common.nowruz': 'نوروز ۱۴۰۴',
    'common.calculate': 'محاسبه ↵',
    'common.calculate_again': '↻ محاسبه مجدد',
    'common.output': 'خروجی',
    'common.results': 'نتایج',
    'common.source_code': 'کد جاوااسکریپت / تایپ‌اسکریپت',
    'common.live_preview': 'پیش‌نمایش زنده',
    'common.footer_text': 'توسعه داده شده با ❤️ برای جامعه توسعه‌دهندگان جاوااسکریپت و تایپ‌اسکریپت.',
    'common.footer_license': 'منتشر شده تحت مجوز MIT / ISC | مشاهده در GitHub',
    'common.quick': 'پیش‌فرض‌های سریع:',

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

    'weekday.short.sat': 'ش',
    'weekday.short.sun': 'ی',
    'weekday.short.mon': 'د',
    'weekday.short.tue': 'س',
    'weekday.short.wed': 'چ',
    'weekday.short.thu': 'پ',
    'weekday.short.fri': 'ج',

    // Converter Page
    'converter.title': '🔄 تبدیل آنلاین تاریخ شمسی و میلادی',
    'converter.subtitle': 'تبدیل دقیق و آنی تاریخ هجری خورشیدی (شمسی) به میلادی و برعکس',
    'converter.tab_jalali_to_greg': 'شمسی به میلادی',
    'converter.tab_greg_to_jalali': 'میلادی به شمسی',
    'converter.quick': 'پیش‌فرض‌های سریع:',
    'converter.lbl_jalali_year': 'سال شمسی (مثلاً ۱۴۰۳)',
    'converter.lbl_greg_year': 'سال میلادی (مثلاً 2024)',
    'converter.greg_result': 'تاریخ میلادی (ISO / YYYY-MM-DD)',
    'converter.jalali_result': 'تاریخ شمسی استاندارد (YYYY/MM/DD)',
    'converter.persian_digits': 'خروجی فرمت‌شده با حروف و ارقام فارسی',
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
    'calendar.today_btn': '📍 امروز',
    'calendar.selected_details': 'مشخصات روز انتخاب‌شده',
    'calendar.jalali_full': 'تاریخ کامل شمسی',
    'calendar.greg_equiv': 'معادل تاریخ میلادی',
    'calendar.weekday_label': 'نام روز هفته',
    'calendar.year_type': 'نوع سال',
    'calendar.days_in_month': 'تعداد روزهای ماه',
    'calendar.click_hint': 'برای مشاهده جزئیات روی هر روز کلیک کنید',

    // Formatter Page
    'formatter.title': '🎨 محیط آزمایش فرمت تاریخ',
    'formatter.subtitle': 'آزمایش و مشاهده آنلاین الگوهای فرمت تاریخ شمسی با حروف و اعداد فارسی و انگلیسی',
    'formatter.input_label': 'تاریخ مورد نظر',
    'formatter.format_pattern': 'الگوی فرمت (Format Pattern)',
    'formatter.format_placeholder': 'مثال: dddd, D MMMM YYYY HH:mm:ss',
    'formatter.presets': 'الگوهای پرکاربرد:',
    'formatter.result_english': 'خروجی با ارقام انگلیسی',
    'formatter.result_persian': 'خروجی با ارقام و نام‌های فارسی (formatFa)',
    'formatter.tokens_title': 'راهنمای توکن‌های فرمت‌دهی — جهت درج کلیک کنید',
    'formatter.token_header_token': 'توکن',
    'formatter.token_header_desc': 'توضیحات',
    'formatter.token_header_example': 'نمونه',

    // Calculator Page
    'calculator.title': '⏱ ماشین‌حساب تاریخ شمسی',
    'calculator.subtitle': 'محاسبه اختلاف دو تاریخ، افزایش/کاهش زمان، زمان نسبی (چند وقت پیش) و تشخیص کبیسه',
    'calculator.tab_diff': '📏 اختلاف دو تاریخ',
    'calculator.tab_add': '➕ افزودن / کسر روز و ماه',
    'calculator.tab_fromnow': '🕐 زمان نسبی (fromNow)',
    'calculator.tab_leap': '🌀 بررسی سال کبیسه',
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
    'calculator.fromnow_target': 'تاریخ شمسی مورد نظر',
    'calculator.fromnow_result_en': 'زمان نسبی انگلیسی',
    'calculator.fromnow_result_fa': 'زمان نسبی فارسی',
    'calculator.leap_check_year': 'سال شمسی برای تست (مثلاً ۱۴۰۳)',
    'calculator.leap_check_btn': 'بررسی وضعیت سال کبیسه',

    // Examples Page
    'examples.title': '💻 نمونه کدهای تعاملی فریم‌ورک‌ها و CDN',
    'examples.subtitle': 'اجرا، آزمایش و کپی کدهای تاریخ شمسی برای React، Next.js، Vue، Angular، Svelte، jQuery، Laravel و HTML خام.',
    'examples.live_badge': '● پیش‌نمایش زنده تعاملی',
    'examples.source_code': 'سورس کد',
    'examples.copy_code': '📋 کپی کد',

    // Home Page Specific
    'home.badge': '⚡ بدون وابستگی خارجی • بیش از ۸۹ میلیون عملیات در ثانیه • ارث‌بری بومی از Date',
    'home.hero_title': 'سریع‌ترین موتور تاریخ خورشیدی (شمسی) برای JS و TS',
    'home.hero_sub': 'تبدیل‌های فوق سریع زیر میکروثانیه‌ای، سازگاری کامل با کلاس Date بومی جاوااسکریپت و Day.js با ابزارهای کامل فرمت‌دهی فارسی.',
    'home.btn_github': '⭐ مشاهده در GitHub',
    'home.btn_npm': '📦 پکیج NPM',
    'home.tools_title': '⚡ ابزارهای آنلاین:',
    'home.card1_title': 'تقویم زنده شمسی',
    'home.card2_title': 'مبدل دوسویه شمسی و میلادی',
    'home.card3_title': 'فرمت‌بندی و امکانات Day.js',
    'home.bench_title': 'مقایسه جامع اکوسیستم تاریخ شمسی در جاوااسکریپت',
    'home.bench_btn': '🚀 اجرای بنچمارک در مرورگر',
    'home.bench_running': 'در حال اجرا...',
    'home.bench_again': '🚀 بنچمارک مجدد',
    'home.lbl_persian_date': 'تاریخ شمسی (سال / ماه / روز):',
    'home.lbl_greg_equiv': 'معادل میلادی:',
    'home.lbl_day_of_week': 'روز هفته:',
    'home.lbl_leap_status': 'وضعیت کبیسه:',
    'home.lbl_rel_time': 'زمان نسبی از اکنون:',
    'home.lbl_format_tpl': 'الگوی فرمت (Format Template):',
    'home.lbl_math_op': 'عملیات ریاضی روی تاریخ:',
    'home.lbl_out_en': 'خروجی فرمت انگلیسی:',
    'home.lbl_out_fa': 'خروجی فرمت فارسی (formatFa):',
    'home.opt_no_change': 'بدون تغییر',
    'home.opt_add_10': '+ ۱۰ روز',
    'home.opt_sub_1m': '- ۱ ماه',
    'home.opt_start_m': 'ابتدای ماه',
    'home.opt_end_y': 'انتهای سال',
    'home.selected_day_lbl': 'روز انتخاب شده:',

    // Table Headers
    'th.feature': 'ویژگی / کتابخانه',
    'th.pure_speed': 'سرعت تبدیل خالص',
    'th.deps': 'تعداد وابستگی‌ها',
    'th.tuple_unpack': 'ان‌پک آرایه‌ای [y, m, d]',
    'th.obj_unpack': 'ان‌پک آبجکت {year, month, date}',
    'th.instanceof_date': 'سازگاری مستقیم با Date',
    'th.math_ops': 'عملیات ریاضی (add, subtract)',
    'th.fa_digits': 'ارقام فارسی (formatFa)',
    'th.from_now': 'زمان نسبی (fromNow)',
    'th.dayjs_plugin': 'پلاگین Day.js رسمی'
  }
};

let currentLang = localStorage.getItem('pdate_lang') || 'fa';

function t(key) {
  const dict = translations[currentLang] || translations.fa;
  return dict[key] || translations.fa[key] || translations.en[key] || key;
}

function getLang() {
  return currentLang;
}

function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'fa') lang = 'fa';
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
