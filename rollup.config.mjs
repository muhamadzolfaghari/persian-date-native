import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import watch from "rollup-plugin-watch";

const terserOptions = {
  ecma: 2020,
  compress: {
    passes: 3,
    pure_getters: true,
    unsafe_arrows: true,
    drop_debugger: true,
    dead_code: true,
  },
  format: {
    comments: false,
    ascii_only: true,
  },
  mangle: {
    toplevel: true,
  },
};

const terserBrowserOptions = {
  ...terserOptions,
  mangle: {
    toplevel: false,
  },
};

export default {
  input: "src/index.ts",
  output: [
    // Standard ESM & backward compatible bundle
    {
      file: "dist/index.js",
      format: "esm",
      exports: "named",
      sourcemap: false,
      plugins: [terser(terserOptions)],
    },
    {
      file: "dist/bundle.min.esm.js",
      format: "esm",
      exports: "named",
      sourcemap: false,
      plugins: [terser(terserOptions)],
    },
    // Standard CommonJS & backward compatible bundle
    {
      file: "dist/index.cjs",
      format: "cjs",
      exports: "named",
      sourcemap: false,
      plugins: [terser(terserOptions)],
    },
    {
      file: "dist/bundle.min.cjs.js",
      format: "cjs",
      exports: "named",
      sourcemap: false,
      plugins: [terser(terserOptions)],
    },
    // Browser Global (IIFE) unminified & minified for CDN (unpkg / jsDelivr)
    {
      file: "dist/index.global.js",
      format: "iife",
      name: "PersianDateNative",
      exports: "named",
      sourcemap: false,
    },
    {
      file: "dist/index.global.min.js",
      format: "iife",
      name: "PersianDateNative",
      exports: "named",
      sourcemap: false,
      plugins: [terser(terserBrowserOptions)],
    },
    // Universal Module Definition (UMD)
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: "PersianDateNative",
      exports: "named",
      sourcemap: false,
      plugins: [terser(terserBrowserOptions)],
    },
  ],
  external: ["dayjs"],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true,
    }),
    watch({ dir: "./src", include: ["**/*.ts"] }),
  ],
};
