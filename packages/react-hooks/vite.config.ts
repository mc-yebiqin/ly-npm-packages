import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      name: "MyLibrary", // 这是你的函数库的名称，它将作为全局变量暴露出去
      entry: "src/index.ts", // 这里是你的 JavaScript 函数库入口文件的路径
    },
  },
});
