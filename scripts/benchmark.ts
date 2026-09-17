import { gregorianToPersian, persianToGregorian, PersianDate } from '../src/index';
const shamsi = require('shamsi');

console.log('='.repeat(65));
console.log('🚀 persian-date-native — Micro-Benchmark Runner');
console.log(`Environment: Node ${process.version} | Platform: ${process.platform} (${process.arch})`);
console.log('='.repeat(65));

const ITERS = 500_000;
const WARMUP = 10_000;

function formatOps(ops: number): string {
  if (ops >= 1_000_000) return `${(ops / 1_000_000).toFixed(1)}M ops/sec`;
  return `${(ops / 1_000).toFixed(1)}k ops/sec`;
}

// 1. Gregorian -> Persian (persian-date-native)
for (let i = 0; i < WARMUP; i++) gregorianToPersian(2024, 9, 2);
let t0 = performance.now();
for (let i = 0; i < ITERS; i++) gregorianToPersian(2024, 9, 2);
const g2pTime = performance.now() - t0;
const g2pOps = Math.round(ITERS / (g2pTime / 1000));

// Shamsi competitor (G -> P)
for (let i = 0; i < WARMUP; i++) shamsi.gregorianToJalali(2024, 9, 2);
t0 = performance.now();
for (let i = 0; i < ITERS; i++) shamsi.gregorianToJalali(2024, 9, 2);
const shamsiG2PTime = performance.now() - t0;
const shamsiG2POps = Math.round(ITERS / (shamsiG2PTime / 1000));

// 2. Persian -> Gregorian (persian-date-native)
for (let i = 0; i < WARMUP; i++) persianToGregorian(1403, 6, 12);
t0 = performance.now();
for (let i = 0; i < ITERS; i++) persianToGregorian(1403, 6, 12);
const p2gTime = performance.now() - t0;
const p2gOps = Math.round(ITERS / (p2gTime / 1000));

// Shamsi competitor (P -> G)
for (let i = 0; i < WARMUP; i++) shamsi.jalaliToGregorian(1403, 6, 12);
t0 = performance.now();
for (let i = 0; i < ITERS; i++) shamsi.jalaliToGregorian(1403, 6, 12);
const shamsiP2GTime = performance.now() - t0;
const shamsiP2GOps = Math.round(ITERS / (shamsiP2GTime / 1000));

// 3. PersianDate Instantiation
const sampleDate = new Date(2024, 8, 2);
for (let i = 0; i < WARMUP; i++) new PersianDate(sampleDate);
t0 = performance.now();
for (let i = 0; i < ITERS; i++) new PersianDate(sampleDate);
const instTime = performance.now() - t0;
const instOps = Math.round(ITERS / (instTime / 1000));

console.log('\n📊 Measured Results (500,000 iterations):');
console.log('-'.repeat(65));
console.log(`1. Pure G -> P (persian-date-native):  ${formatOps(g2pOps).padEnd(16)} (${g2pTime.toFixed(1)} ms)`);
console.log(`   Pure G -> P (shamsi):               ${formatOps(shamsiG2POps).padEnd(16)} (${shamsiG2PTime.toFixed(1)} ms)`);
console.log(`2. Pure P -> G (persian-date-native):  ${formatOps(p2gOps).padEnd(16)} (${p2gTime.toFixed(1)} ms)`);
console.log(`   Pure P -> G (shamsi):               ${formatOps(shamsiP2GOps).padEnd(16)} (${shamsiP2GTime.toFixed(1)} ms)`);
console.log(`3. Object Instantiation (PersianDate): ${formatOps(instOps).padEnd(16)} (${instTime.toFixed(1)} ms)`);
console.log('-'.repeat(65));
console.log('✅ Benchmark run complete.\n');
