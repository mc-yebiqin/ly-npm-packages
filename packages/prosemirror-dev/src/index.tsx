import React from "react";
import ReactDOM from "react-dom";
import { EditorView } from "prosemirror-view";
import { EditorState, Transaction } from "prosemirror-state";

import "./styles/global.css";
import DevTools from "./components";
import { ViewTool } from "./types";
import { subscribeOnHandler } from "./utils";
import { DEVTOOLS_ID_NAME, toolsDomain, ToolSlotFn } from "./domain";

const dispatchHandler = (id: number, tr: Transaction, newState: EditorState) => {
  const { view, isOpen } = toolsDomain.state;
  // 工具面板展开 & 视图内容发生改变 & 变化的Id处于激活状态
  if (isOpen && tr.docChanged && view?.id === id) {
    toolsDomain.set({ updateState: newState });
  }
};

const destroyHandler = (id: number) => {
  toolsDomain.destroyView(id);
};

const createToolsContainer = () => {
  // 判断是否已经创建工具视图组件
  const container = document.getElementById(DEVTOOLS_ID_NAME);
  if (!container) {
    const place = document.createElement("div");
    place.id = DEVTOOLS_ID_NAME;
    document.body.appendChild(place);
    ReactDOM.render(<DevTools />, place);
  }
};

/** 初始化编辑器视图调试工具 */
const initDeveloperTools = (slot?: ToolSlotFn) => {
  // 优先初始化面板的调试插槽
  toolsDomain.set({ slot });

  // 其次再初始化面板容器及编辑器视图实例
  return (editorView: EditorView) => {
    const view = editorView as ViewTool;
    subscribeOnHandler({ view, destroyHandler, dispatchHandler });
    createToolsContainer();
  };
};

export { initDeveloperTools };
export default initDeveloperTools;
