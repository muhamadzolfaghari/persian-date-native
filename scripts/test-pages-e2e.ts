import fs from 'fs';
import path from 'path';
import vm from 'vm';

console.log('🧪 Starting Documentation & E2E Validation Test Suite...\n');

const docsDir = path.resolve(__dirname, '../docs');
const pages = [
  'index.html',
  'converter.html',
  'calendar.html',
  'formatter.html',
  'calculator.html',
  'examples.html'
];

let totalPassed = 0;
let totalFailed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✅ ${message}`);
    totalPassed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    totalFailed++;
  }
}

// 1. Static Structure & Asset Link Validations
console.log('1. Validating Static HTML Files & Asset References:');
pages.forEach((page) => {
  const filePath = path.join(docsDir, page);
  assert(fs.existsSync(filePath), `${page} exists on disk`);

  const html = fs.readFileSync(filePath, 'utf-8');
  assert(html.includes('<!DOCTYPE html>'), `${page} has standard DOCTYPE`);
  assert(html.includes('<html'), `${page} has html element`);
  assert(html.includes('<title>'), `${page} has title tag`);
  assert(html.includes('<meta name="description"'), `${page} has meta description for SEO`);
  assert(html.includes('assets/css/main.css'), `${page} links to modular main.css`);
  assert(html.includes('assets/js/shared-engine.js'), `${page} links to shared-engine.js`);
  assert(html.includes('assets/js/i18n.js'), `${page} links to i18n.js`);

  // Check no giant inlined style blocks
  const inlineStyleMatches = html.match(/<style[\s\S]*?<\/style>/gi) || [];
  const totalInlineStyleLen = inlineStyleMatches.reduce((acc, s) => acc + s.length, 0);
  assert(totalInlineStyleLen < 300, `${page} has no heavy inlined <style> (< 300 chars, found ${totalInlineStyleLen})`);
});

// 2. Syntax Highlighter Engine Test
console.log('\n2. Testing SyntaxHighlighter Engine (assets/js/highlighter.js):');
const highlighterCode = fs.readFileSync(path.join(docsDir, 'assets/js/highlighter.js'), 'utf-8');
const highlighterContext: any = { window: {}, globalThis: {} };
highlighterContext.window = highlighterContext;
vm.createContext(highlighterContext);
vm.runInContext(highlighterCode, highlighterContext);

const hl = highlighterContext.SyntaxHighlighter;
assert(typeof hl !== 'undefined', 'SyntaxHighlighter is defined on window');
assert(typeof hl.highlight === 'function', 'SyntaxHighlighter.highlight is a function');

const sampleJs = `import { PersianDate } from 'persian-date-native';
const p = new PersianDate(1403, 1, 1);
// Format date
console.log(p.format('YYYY/MM/DD'));`;

const highlighted = hl.highlight(sampleJs, 'javascript');
assert(highlighted.includes('<span class="token-keyword">import</span>'), 'Highlights JS keyword "import"');
assert(highlighted.includes('<span class="token-string">\'persian-date-native\'</span>'), 'Highlights string literal');
assert(highlighted.includes('<span class="token-comment">// Format date</span>'), 'Highlights single-line comment');
assert(highlighted.includes('<span class="token-number">1403</span>'), 'Highlights numbers');

// 3. Shared Engine Runtime Test
console.log('\n3. Testing Shared Engine Runtime (assets/js/shared-engine.js):');
const engineCode = fs.readFileSync(path.join(docsDir, 'assets/js/shared-engine.js'), 'utf-8');
const engineContext: any = { Date: Date, Math: Math, parseInt: parseInt, isNaN: isNaN, String: String, Array: Array, Object: Object };
engineContext.window = engineContext;
engineContext.global = engineContext;
vm.createContext(engineContext);
vm.runInContext(engineCode, engineContext);

const pd = engineContext._PD;
assert(typeof pd !== 'undefined', '_PD engine loaded');
assert(typeof pd.PersianDate === 'function', 'PersianDate class exists');
assert(typeof pd.toGregorian === 'function', 'toGregorian function exists');
assert(typeof pd.toPersian === 'function', 'toPersian function exists');
assert(typeof pd.isLeapPersianYear === 'function', 'isLeapPersianYear function exists');

// Leap year test
assert(pd.isLeapPersianYear(1403) === true, '1403 is a leap year');
assert(pd.isLeapPersianYear(1402) === false, '1402 is NOT a leap year');

// Conversion test
const [gy, gm, gd] = pd.toGregorian(1403, 1, 1);
assert(gy === 2024 && gm === 3 && gd === 20, '1403/01/01 converts to 2024-03-20');
const [jy, jm, jd] = pd.toPersian(2024, 3, 20);
assert(jy === 1403 && jm === 1 && jd === 1, '2024-03-20 converts to 1403/01/01');

// PersianDate methods test
const pdate = new pd.PersianDate(1403, 6, 31);
assert(pdate.getFullYear() === 1403, 'getFullYear() returns 1403');
assert(pdate.getMonth() === 6, 'getMonth() returns 6');
assert(pdate.getDate() === 31, 'getDate() returns 31');
assert(pdate.format('YYYY/MM/DD') === '1403/06/31', 'format("YYYY/MM/DD") returns "1403/06/31"');
assert(pdate.formatFa('YYYY/MM/DD') === '۱۴۰۳/۰۶/۳۱', 'formatFa("YYYY/MM/DD") returns "۱۴۰۳/۰۶/۳۱"');

// 4. Examples Page Controller Test
console.log('\n4. Testing Examples Controller (assets/js/pages/examples.js):');
const examplesCode = fs.readFileSync(path.join(docsDir, 'assets/js/pages/examples.js'), 'utf-8');

// Create mock DOM for examples page
const mockElements: Record<string, any> = {};
function createMockElement(id: string, initialProps: any = {}) {
  const el = {
    id,
    innerHTML: '',
    textContent: '',
    classList: {
      _classes: new Set<string>(),
      add(c: string) { this._classes.add(c); },
      remove(c: string) { this._classes.delete(c); },
      toggle(c: string, val?: boolean) {
        if (val === undefined) val = !this._classes.has(c);
        if (val) this._classes.add(c); else this._classes.delete(c);
      },
      contains(c: string) { return this._classes.has(c); }
    },
    dataset: {},
    getAttribute(name: string) { return ''; },
    querySelectorAll(sel: string) { return []; },
    addEventListener(evt: string, cb: Function) {},
    ...initialProps
  };
  mockElements[id] = el;
  return el;
}

const examplesContext: any = {
  Date: Date,
  Math: Math,
  parseInt: parseInt,
  isNaN: isNaN,
  String: String,
  Array: Array,
  Object: Object,
  document: {
    getElementById: (id: string) => mockElements[id] || createMockElement(id),
    querySelectorAll: (sel: string) => [],
    addEventListener(evt: string, cb: Function) {
      if (evt === 'DOMContentLoaded') cb();
    }
  },
  PersianDateNative: pd,
  _PD: pd,
  SyntaxHighlighter: hl,
  getLang: () => 'en',
  t: (k: string) => k,
  toPersianDigits: pd.toPersianDigits,
  addEventListener(evt: string, cb: Function) {}
};
examplesContext.window = examplesContext;
vm.createContext(examplesContext);
vm.runInContext(examplesCode, examplesContext);

assert(typeof examplesContext.showFramework === 'function', 'showFramework function is exported');
assert(typeof examplesContext.changeDate === 'function', 'changeDate function is exported');
assert(typeof examplesContext.resetDate === 'function', 'resetDate function is exported');
assert(typeof examplesContext.copyExampleCode === 'function', 'copyExampleCode function is exported');

// Test switching across all 9 frameworks
const frameworks = ['vanilla', 'react', 'nextjs', 'vue', 'angular', 'svelte', 'jquery', 'laravel', 'wordpress'];
frameworks.forEach(fw => {
  examplesContext.showFramework(fw);
  const codeBox = mockElements['example-code'];
  const previewBox = mockElements['example-preview'];
  assert(codeBox && codeBox.innerHTML.length > 20, `Framework "${fw}" generated highlighted code block`);
  assert(previewBox && previewBox.innerHTML.length > 0, `Framework "${fw}" rendered live interactive preview`);
});

// Test interactive date adjustments
const initHtml = mockElements['example-preview'].innerHTML;
examplesContext.changeDate(1, 'day');
const afterAddDayHtml = mockElements['example-preview'].innerHTML;
assert(initHtml !== afterAddDayHtml, 'changeDate(1, "day") updates preview state');

examplesContext.resetDate();
const afterResetHtml = mockElements['example-preview'].innerHTML;
assert(afterResetHtml.length > 0, 'resetDate() resets preview state');

// Summary
console.log(`\n========================================`);
console.log(`Summary: ${totalPassed} Passed, ${totalFailed} Failed`);
console.log(`========================================\n`);

if (totalFailed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL DOCUMENTATION E2E & ASSET TESTS PASSED CLEANLY!\n');
}
