import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import sourcemap from "rollup-plugin-sourcemaps";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";

const plugins = (declarationDir) => [
  json(),
  typescript({ tsconfig: "./tsconfig.json", declarationDir }),
  commonjs(),
  resolve(),
  sourcemap(),
];

/** @type {import('rollup').RollupOptions[]} */
const config = [
  {
    input: "./src/index.ts",
    output: [
      { dir: "./dist/module", format: "esm", sourcemap: true },
    ],
    plugins: plugins("./dist/module/types")
  },
  {
    input: "./src/index.ts",
    output: [
      {
        dir: "./dist/main",
        exports: "auto",
        format: "commonjs",
        sourcemap: true,
      },
    ],
    plugins: plugins("./dist/main/types")
  },
];

export default config;
