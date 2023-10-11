#!/usr/bin/env node

const pkg = require("./package.json")
const esbuild = require("esbuild")

esbuild.buildSync({
  bundle: true,
  platform: "neutral",
  sourcemap: true,

  outfile: "./dist/index.js",
  entryPoints: ["./src/index.ts"],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
});

esbuild.buildSync({
  format: "cjs",
  bundle: true,
  platform: "neutral",
  sourcemap: true,

  outfile: "./dist/index.cjs",
  entryPoints: ["./src/index.ts"],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
});

esbuild.buildSync({
  format: "esm",
  bundle: true,
  platform: "neutral",
  sourcemap: true,

  outfile: "./dist/index.esm.js",
  entryPoints: ["./src/index.ts"],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
});
