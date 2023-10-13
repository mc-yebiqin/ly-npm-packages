import visualizer from "rollup-plugin-visualizer";

export default {
  // 其他 Rollup 配置...
  plugins: [
    // 其他插件...
    visualizer({
      open: false, // 设置为 false，禁止自动打开可视化分析页面
      // 其他插件配置...
    }),
  ],
};
