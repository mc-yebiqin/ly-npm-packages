import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import rollupNodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import path from "path";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "./src/index.ts",
    external: ["aws-sdk/clients/s3", "aws-sdk/clients/kinesis"],
    output: [
      {
        dir: "dist",
        format: "esm",
        entryFileNames: "[name].js",
      },
    ],
    plugins: [
      json(),
      rollupNodeResolve({ jsnext: true, preferBuiltins: true, browser: true }),
      alias({
        entries: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
      }),
      commonjs(),
      typescript(),
      terser(),
    ],
  },
];
