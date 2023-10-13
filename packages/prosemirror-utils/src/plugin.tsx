import React from "react";
import { createRoot } from "react-dom/client";

import { PluginConfigs } from "./typescript";

/**
 * 创建插件视图并将其渲染到指定容器中。
 * @param container - 插件视图的容器元素，如果为null或undefined，则默认为document.body。
 * @param Component - 要渲染的React组件或元素。
 * @param configs - 插件的配置选项，包括className等。
 * @returns 返回插件视图的根节点。
 */
export const createPluginView = (
  container: HTMLElement | null | undefined,
  Component: any,
  configs: PluginConfigs
) => {
  // 如果容器不存在，则使用document.body作为默认容器
  const containerRef = container ?? document.body;

  // 创建插件元素,设置类名之后挂载到元素上
  const pluginElemt = document.createElement("div");
  pluginElemt.className = "plugin-wrapper";
  containerRef.appendChild(pluginElemt);

  // 如果设置了类名则应用上去，否则赋予默认的样式
  if (configs?.className) {
    pluginElemt.classList.add(configs?.className);
  } else {
    // 如果没有指定className，则设置默认样式
    pluginElemt.style.cssText = `
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      height: 0px;
      z-index: 99;
      pointer-events: none;
    `;
  }

  // 创建插件视图的根节点
  const pluginRoot = createRoot(pluginElemt);
  // 渲染传入的组件或元素到插件视图中
  pluginRoot.render(
    <Component ref={(data: any) => Object.assign(pluginRoot, data)} {...configs} />
  );
  // 返回插件视图的根节点
  return pluginRoot;
};
