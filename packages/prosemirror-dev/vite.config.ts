import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      // 这是你的函数库的名称，它将作为全局变量暴露出去
      name: "PMDevTools",
      // 这里是你的 JavaScript 函数库入口文件的路径
      entry: resolve(__dirname, "src/index.tsx"),
      // the proper extensions will be added
      fileName: "index",
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["react", "react-dom"],
      // output: {
      //   chunkFileNames: "[name]-[hash].js", // 引入文件名的名称
      //   entryFileNames: "[name]-[hash].js", // 包的入口文件名称
      //   assetFileNames: "[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
      // },
    },
  },
  plugins: [
    visualizer({
      open: true, // 在默认用户代理中打开生成的文件
      gzipSize: true, // 收集 gzip 大小并将其显示
      brotliSize: true, // 收集 brotli 大小并将其显示
      filename: "visualizer.html", // 分析图生成的文件名
    }),
  ],
});
