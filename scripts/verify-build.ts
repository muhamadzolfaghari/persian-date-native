import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

console.log('='.repeat(70));
console.log('🔬 persian-date-native — Production Build & Bundle Verification Suite');
console.log('='.repeat(70));

const DIST_DIR = path.resolve(__dirname, '../dist');
const ESM_PATH = path.join(DIST_DIR, 'index.js');
const ESM_LEGACY_PATH = path.join(DIST_DIR, 'bundle.min.esm.js');
const CJS_PATH = path.join(DIST_DIR, 'index.cjs');
const CJS_LEGACY_PATH = path.join(DIST_DIR, 'bundle.min.cjs.js');
const GLOBAL_PATH = path.join(DIST_DIR, 'index.global.js');
const GLOBAL_MIN_PATH = path.join(DIST_DIR, 'index.global.min.js');
const UMD_PATH = path.join(DIST_DIR, 'index.umd.js');
const DTS_PATH = path.join(DIST_DIR, 'index.d.ts');

let allPassed = true;

function check(title: string, pass: boolean, detail: string = '') {
  if (pass) {
    console.log(`✅ [PASS] ${title} ${detail ? `(${detail})` : ''}`);
  } else {
    console.error(`❌ [FAIL] ${title} ${detail ? `(${detail})` : ''}`);
    allPassed = false;
  }
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${bytes} B`;
}

// 1. Check Dist Artifacts Exist
console.log('\n📦 1. Distribution Artifacts Existence Check:');
console.log('-'.repeat(70));
check('ESM Bundle (index.js) exists', fs.existsSync(ESM_PATH), ESM_PATH);
check('ESM Legacy Bundle (bundle.min.esm.js) exists', fs.existsSync(ESM_LEGACY_PATH), ESM_LEGACY_PATH);
check('CJS Bundle (index.cjs) exists', fs.existsSync(CJS_PATH), CJS_PATH);
check('CJS Legacy Bundle (bundle.min.cjs.js) exists', fs.existsSync(CJS_LEGACY_PATH), CJS_LEGACY_PATH);
check('Browser Global Bundle (index.global.js) exists', fs.existsSync(GLOBAL_PATH), GLOBAL_PATH);
check('Browser Global Minified Bundle (index.global.min.js) exists', fs.existsSync(GLOBAL_MIN_PATH), GLOBAL_MIN_PATH);
check('UMD Bundle (index.umd.js) exists', fs.existsSync(UMD_PATH), UMD_PATH);
check('TypeScript Declaration exists', fs.existsSync(DTS_PATH), DTS_PATH);

// 2. Measure Exact Bundle Sizes (Raw, Minified, Gzip, Brotli)
console.log('\n📊 2. Bundle Size Optimization Analysis:');
console.log('-'.repeat(70));

function analyzeFile(filePath: string, label: string) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath);
  const rawSize = content.length;
  const gzipSize = zlib.gzipSync(content, { level: 9 }).length;
  const brotliSize = zlib.brotliCompressSync(content).length;

  console.log(`${label.padEnd(28)}: Minified = ${formatBytes(rawSize).padEnd(10)} | Gzip = ${formatBytes(gzipSize).padEnd(10)} | Brotli = ${formatBytes(brotliSize)}`);
  check(`${label} is under 15 KB (Gzip)`, gzipSize < 15 * 1024, `Gzip: ${formatBytes(gzipSize)}`);
}

analyzeFile(ESM_PATH, 'ESM Bundle (index.js)');
analyzeFile(CJS_PATH, 'CJS Bundle (index.cjs)');
analyzeFile(GLOBAL_MIN_PATH, 'Browser Global (global.min.js)');
analyzeFile(UMD_PATH, 'UMD Bundle (index.umd.js)');
analyzeFile(DTS_PATH, 'Type Defs (d.ts)');

// 3. Functional Correctness on Built CJS Artifact
console.log('\n🧪 3. Runtime Verification on Built CJS Artifact (require):');
console.log('-'.repeat(70));

try {
  const cjsModule = require(CJS_PATH);
  const { PersianDate, gregorianToPersian, persianToGregorian, isPersianLeapYear, persianDate, toPersianDate } = cjsModule;

  // A. gregorianToPersian
  const [jy, jm, jd] = gregorianToPersian(2024, 9, 2);
  check('gregorianToPersian(2024, 9, 2) -> [1403, 6, 12]', jy === 1403 && jm === 6 && jd === 12, `[${jy}, ${jm}, ${jd}]`);

  // B. persianToGregorian
  const [gy, gm, gd] = persianToGregorian(1403, 6, 12);
  check('persianToGregorian(1403, 6, 12) -> [2024, 9, 2]', gy === 2024 && gm === 9 && gd === 2, `[${gy}, ${gm}, ${gd}]`);

  // C. 1403 Leap Year Accuracy (Birashk cycle)
  const is1403Leap = isPersianLeapYear(1403);
  const is1404Leap = isPersianLeapYear(1404);
  check('1403 is a leap year (366 days)', is1403Leap === true, 'isLeap = true');
  check('1404 is a normal year (365 days)', is1404Leap === false, 'isLeap = false');

  // D. PersianDate Class & Native Date Inheritance
  const pDate = new PersianDate(new Date(2024, 0, 15));
  check('instanceof Date === true', pDate instanceof Date, 'Inherits from native JS Date');
  check('pDate.format("YYYY/MM/DD") === "1402/10/25"', pDate.format('YYYY/MM/DD') === '1402/10/25', pDate.format('YYYY/MM/DD'));
  check('pDate.formatFa("YYYY/MM/DD") === "۱۴۰۲/۱۰/۲۵"', pDate.formatFa('YYYY/MM/DD') === '۱۴۰۲/۱۰/۲۵', pDate.formatFa('YYYY/MM/DD'));

  // E. persianDate helper factory
  const factoryDate = persianDate(new Date(2024, 0, 15));
  check('persianDate() factory returns PersianDate', factoryDate instanceof PersianDate, factoryDate.format('YYYY/MM/DD'));

  // F. Object Unpacking
  const obj = toPersianDate(new Date(2024, 0, 15));
  check('toPersianDate() returns { year, month, day }', obj.year === 1402 && obj.month === 10 && obj.day === 25, JSON.stringify(obj));

} catch (err: any) {
  check('CJS Execution without errors', false, err.message);
}

// 4. Functional Correctness on Browser Global Bundle Simulation
console.log('\n🌐 4. Browser Global Bundle (window.PersianDateNative) Verification:');
console.log('-'.repeat(70));

try {
  const vm = require('vm');
  const globalCode = fs.readFileSync(GLOBAL_MIN_PATH, 'utf8');
  const sandbox: Record<string, any> = {
    Date,
    Intl,
    Array,
    Object,
    String,
    Number,
    Boolean,
    Math,
    RegExp,
    Error,
    Symbol,
    console,
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  sandbox.globalThis = sandbox;
  const exposed = vm.runInNewContext(globalCode + '; window.PersianDateNative || PersianDateNative;', sandbox);

  check('Global IIFE exposes PersianDateNative namespace', typeof exposed === 'object' && exposed !== null, typeof exposed);
  check('Global has PersianDate constructor', typeof exposed?.PersianDate === 'function', typeof exposed?.PersianDate);
  check('Global has persianDate factory', typeof exposed?.persianDate === 'function', typeof exposed?.persianDate);
  check('Global has gregorianToPersian', typeof exposed?.gregorianToPersian === 'function', typeof exposed?.gregorianToPersian);
  
  const gDate = exposed.persianDate(new Date(2024, 0, 15));
  check('Global instance formats correctly', gDate.format('YYYY/MM/DD') === '1402/10/25', gDate.format('YYYY/MM/DD'));
} catch (err: any) {
  check('Browser Global evaluation without errors', false, err.message);
}

// 5. Package Configuration Integrity
console.log('\n📋 5. Package Configuration & CDN Fields Integrity:');
console.log('-'.repeat(70));
const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'));

check('package.json has "sideEffects: false"', pkg.sideEffects === false, 'Enables tree-shaking');
check('package.json has modern "exports" map', typeof pkg.exports === 'object' && pkg.exports['.'] !== undefined, 'Dual ESM/CJS exports defined');
check('package.json exports types properly', pkg.exports?.['.']?.types === './dist/index.d.ts', pkg.exports?.['.']?.types);
check('package.json exports import (ESM)', pkg.exports?.['.']?.import === './dist/index.js', pkg.exports?.['.']?.import);
check('package.json exports require (CJS)', pkg.exports?.['.']?.require === './dist/index.cjs', pkg.exports?.['.']?.require);
check('package.json has main pointing to ./dist/index.cjs', pkg.main === './dist/index.cjs', pkg.main);
check('package.json has module pointing to ./dist/index.js', pkg.module === './dist/index.js', pkg.module);
check('package.json has browser pointing to global bundle', pkg.browser === './dist/index.global.min.js', pkg.browser);
check('package.json has unpkg pointing to global bundle', pkg.unpkg === './dist/index.global.min.js', pkg.unpkg);
check('package.json has jsdelivr pointing to global bundle', pkg.jsdelivr === './dist/index.global.min.js', pkg.jsdelivr);

// Summary Report
console.log('\n' + '='.repeat(70));
if (allPassed) {
  console.log('🎉 ALL PRODUCTION BUILD & BUNDLE VERIFICATION CHECKS PASSED (100%)');
  console.log('='.repeat(70) + '\n');
} else {
  console.error('⚠️ ONE OR MORE BUILD VERIFICATION CHECKS FAILED');
  console.log('='.repeat(70) + '\n');
  process.exit(1);
}
