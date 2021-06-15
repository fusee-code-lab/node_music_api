import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import sourcemap from "rollup-plugin-sourcemaps";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";

/** @type {import('rollup').RollupOptions} */
const config = {
  input: "./src/index.ts",
  output: [
    {
      file: "./dist/main.js",
      exports: "auto",
      format: "commonjs",
      sourcemap: true,
    },
    { file: "./dist/module.js", format: "esm", sourcemap: true },
  ],
  plugins: [
    json(),
    typescript({ tsconfig: "./tsconfig.json" }),
    commonjs(),
    resolve(),
    sourcemap(),
  ],
};

export default config;
