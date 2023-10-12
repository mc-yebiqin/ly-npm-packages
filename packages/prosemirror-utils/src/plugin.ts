import ReactDOM from "react-dom";
import { createElement } from "react";

import { PluginElement } from "./typescript";

/**
 * 创建一个插件元素并将其挂载到指定的容器上。
 * @param {HTMLElement} container - 插件元素的容器，如果为 null 或 undefined，则默认挂载到 document.body 上。
 * @param {React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<any>>} Component - 要渲染的 React 组件。
 * @param {CreateConfig} [config] - 可选自定义配置项，例如 className 和其他自定义的属性传递给组件。
 * @returns {PluginElement} - 返回创建的插件元素，包含组件的销毁函数（destroy）和挂载属性（mountedRef）。
 */
export function createPluginElement(
  container: HTMLElement | null | undefined,
  Component: React.ForwardRefExoticComponent<
    Pick<any, string | number | symbol> & React.RefAttributes<any>
  >,
  className: string,
  props?: any
): PluginElement {
  // 如果容器为 null 或 undefined，则默认挂载到 document.body 上
  const containerRef = container ?? document.body;

  // 创建外层元素
  const pluginWrapper: PluginElement = document.createElement("div");
  // 定义销毁方法，用于在需要时卸载组件
  pluginWrapper.destroy = () => ReactDOM.unmountComponentAtNode(pluginWrapper);
  pluginWrapper.className = "plugin-wrapper";
  // 添加用户指定的类名
  if (className) pluginWrapper.classList.add(className);
  containerRef.appendChild(pluginWrapper);

  // 创建内层元素，并将其挂载到外层元素上
  const pluginComp = createElement(Component, {
    ...props,
    // 将外层元素的引用传递给组件，以便在组件中获取外层元素的引用
    ref: (refObj) => {
      pluginWrapper.mountedRef = refObj;
    },
  });

  // 将 React 组件渲染到外层元素上
  ReactDOM.render(pluginComp, pluginWrapper);

  // 返回创建的插件元素
  return pluginWrapper;
}
