"use client";
import React from "react";
// eslint-disable-next-line
import { render } from "react-dom";
import { Node } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { createRoot } from "react-dom/client";
import NodeHandler from "./NodeHandler";
import { AttrsSpec, PMStyles, UN_IGNORABLE_MUTATION } from "@ly/prosemirror";

export class TemplateNodeView {
  node: Node;
  /** 节点的 DOM 元素 */
  dom: HTMLElement;
  /** 节点内容的 DOM 元素 */
  contentDOM?: HTMLElement;
  /** 是否阻止拖拽事件 */
  preventDrag = false;

  /**
   * 构造函数，用于创建类的实例。
   * @param {Node} node - 节点对象，表示文档中的一个节点。
   * @param {EditorView} view - 编辑器视图对象，表示编辑器的视图。
   * @param {() => number} getPos - 一个函数，用于获取节点的位置。
   * @param {React.ForwardRefExoticComponent<any & React.RefAttributes<HTMLDivElement>>} Component - 一个 React 组件，用于渲染节点。
   */
  constructor(
    node: Node,
    view: EditorView,
    getPos: () => number,
    Component: React.ForwardRefExoticComponent<any & React.RefAttributes<HTMLDivElement>>
  ) {
    this.node = node;
    this.dom = this._createDOMElement();
    this.dom.className = PMStyles.block_item;
    this._applyCustomAttributesToElement(this.dom, node);

    if (!node.isLeaf) {
      this.contentDOM = this._createContentElement();
      this.contentDOM.className = PMStyles.block_content;
    }

    // eslint-disable-next-line
    render(
      <Component
        ref={(container: HTMLElement) => {
          if (!this.contentDOM) return;
          container?.parentElement?.replaceChild?.(this.contentDOM, container);
        }}
        dom={this.dom}
        node={node}
        view={view}
        getPos={getPos}
      />,
      this.dom
    );

    // createRoot(this.dom).render(
    //   <Component
    //     ref={(container: HTMLElement) => {
    //       if (!this.contentDOM) return;
    //       container?.parentElement?.replaceChild?.(this.contentDOM, container);
    //     }}
    //     dom={this.dom}
    //     node={node}
    //     view={view}
    //     getPos={getPos}
    //   />
    // );

    this._mountHandleController(view, getPos);
    this._checkNodeContentIsEmpty(node);
  }

  /**
   * `update` 方法用于更新节点的状态
   * @param {Node} node - 新的节点对象
   * @returns {boolean} - 如果返回 false 节点会被重新渲染，返回 true 则不会重新渲染节点
   */
  update(node: Node) {
    this._checkNodeContentIsEmpty(node);
    return node.sameMarkup(this.node);
  }

  /**
   * `stopEvent` 方法用于阻止特定事件的传递。
   * @param {Event} event - 事件对象。这个对象包含了事件的所有信息，例如事件类型、目标元素等。
   */
  stopEvent(event: Event) {
    // 如果不存在则执行默认的事件行为
    if (event.type === "mousedown") {
      const target = event.target as HTMLElement;
      // 如果触发元素不是拖拽把手，则阻止拖拽事件的后续行为
      this.preventDrag = !target.classList.contains(PMStyles.handle_dragger);
    }

    // 当前节点触发拖拽事件，执行自定义行为
    if (event.type === "dragstart") {
      if (this.preventDrag) {
        event.preventDefault();
        return true;
      } else if (event.target === this.dom) {
        this.dom.classList.add(PMStyles.block_draggable);
      }
    }

    // 当前节点拖拽结束，则移除拖拽的状态类名
    if (event.type === "dragend") {
      this.dom.classList.remove(PMStyles.block_draggable);
    }

    return this._customStopEvent(this.node, event);
  }

  /**
   * 控制突变的忽略类型 - 返回 true 则阻止重新渲染，反之则更新。
   * @param {MutationRecord} mutation - DOM 变动记录
   * @returns {boolean} - 返回 true 阻止重新渲染，返回 false 允许更新
   */
  ignoreMutation(mutation: MutationRecord): boolean {
    // 根据 mutation 的类型来决定是否忽略该突变
    return !UN_IGNORABLE_MUTATION.includes(mutation.type);
  }

  /**
   * 内部方法 `_customStopEvent` 用于自定义执行阻止事件传递的操作。
   * @param {Event} event - 事件对象。
   * @returns {boolean} - 返回 `true` 表示阻止事件传递，返回 `false` 表示允许事件传递。
   */
  _customStopEvent(node: Node, event: Event) {
    return false;
  }

  /**
   * 检查节点内容是否为空的方法，如果为空则添加状态类名`block_empty`
   * @param {Node} node - 要检查的节点对象。
   */
  _checkNodeContentIsEmpty(node: Node) {
    // 判断节点内容是否为空
    const isEmpty = node.content.size === 0;
    this.dom.classList.toggle(PMStyles.block_empty, isEmpty);
  }

  /**
   * `_createDOMElement` 方法用于创建一个节点的外层 DOM 元素。
   * @returns {HTMLElement} 返回一个新创建的 DOM 元素。
   */
  _createDOMElement(): HTMLElement {
    return document.createElement("div");
  }

  /**
   * 创建一个用于放置内容的 contentDOM 元素。
   *
   * @returns {HTMLElement} 返回新创建的用于放置内容的 DOM 元素。
   */
  _createContentElement(): HTMLElement {
    return document.createElement("div");
  }

  /**
   * `_mountHandleController` 方法用于在视图中添加一个处理器控制器。
   * @param {EditorView} view - 编辑器视图。这个对象包含了编辑器的所有信息，例如编辑器的状态、配置等。
   * @param {() => number} getPos - 一个函数，用于获取处理器的位置。
   */
  private _mountHandleController(view: EditorView, getPos: () => number) {
    setTimeout(() => {
      // 创建一个新的 div 元素作为处理器的容器，设置类名并且不允许被编辑
      const handler = document.createElement("div");
      handler.className = PMStyles.block_handler;
      handler.setAttribute("contentEditable", "false");

      this.dom.appendChild(handler);
      // eslint-disable-next-line
      render(<NodeHandler view={view} getPos={getPos} />, handler);

      // createRoot(handler).render(<NodeHandler view={view} getPos={getPos} />);
    });
  }

  /**
   * 将节点的自定义属性应用到 DOM 元素上。
   * @param node 节点对象，包含需要应用到 DOM 元素上的属性信息
   */
  private _applyCustomAttributesToElement(dom: HTMLElement, node: Node) {
    // 获取节点类型的规范和名称
    const { spec, name } = node.type;

    // 设置 DOM 元素的类型属性为节点名称
    dom.setAttribute("type", name);

    // 获取节点规范中定义的自定义属性
    const specAttrs = spec.attrs;
    // 遍历自定义节点属性，将节点属性设置为 DOM 元素的属性。
    for (const key in specAttrs) {
      if (Object.prototype.hasOwnProperty.call(specAttrs, key)) {
        const value = specAttrs[key] as AttrsSpec;

        /**
         * [请填充后续代码]
         * 如果 setAttribute 是 Boolean 值，则直接将属性值挂载到元素属性上
         * 如果 setAttribute 是 Function 类型，则将 node 对象传递进去处理后将新值挂载到元素属性上
         */
        if (value.setAttribute) {
          const isFunction = typeof value.setAttribute === "function";
          const result = isFunction
            ? (value.setAttribute as (node: Node) => any)(node)
            : node.attrs[key];
          dom.setAttribute(key, result);
        }
      }
    }
  }
}
