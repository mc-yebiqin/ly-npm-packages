import { createElement } from "react";
import PMUtils from "laoye-prosemirror-utils";
import ReactDOM from "react-dom";
import { EditorView } from "prosemirror-view";
import { NodeSelection, Plugin } from "prosemirror-state";

import GraphicToolbar, { GraphicInfo } from "./components";
import { NodeTypeEnum } from "@ly/prosemirror";
import { GraphicEditor, GraphicMarkers } from "@notta/graphic";

function createGraphicElement(Component: React.FunctionComponent): {
  unmount: () => void;
} {
  const pluginElemt = document.createElement("div");
  document.body.appendChild(pluginElemt);
  ReactDOM.render(createElement(Component), pluginElemt);
  return {
    unmount: () => {
      ReactDOM.unmountComponentAtNode(pluginElemt);
    },
  };
}

export const documentToolbarByGraphic = (): Plugin => {
  const pluginViewer = PMUtils.createPluginViewer(GraphicToolbar);

  /** 获取工具条的 Y 轴坐标 */
  const getGraphicInfo = (view: EditorView) => {
    const { doc, selection } = view.state;
    const { from, to } = selection;

    let tempGraphicInfo: GraphicInfo = null;
    PMUtils.findBlockBetween(doc, from, to, (node, pos, index) => {
      if (node.type.name === NodeTypeEnum.Graphic) {
        const path = `&>div:nth-child(${index + 1})`;
        const element = view.dom.querySelector(path) as HTMLElement;

        tempGraphicInfo = {
          offsetY: element.offsetTop,
          graphicId: node.attrs.graphic_id,
        };
      }
    });

    return tempGraphicInfo;
  };

  const pluginObj = new Plugin({
    view(view: any) {
      pluginViewer.mount(view.dom.parentElement);
      const editorElement = createGraphicElement(GraphicEditor);
      const markerElement = createGraphicElement(GraphicMarkers);

      return {
        update(view: EditorView) {
          let graphicInfo: GraphicInfo = null;
          const { selection } = view.state;

          const isNodeSelection = selection instanceof NodeSelection;
          if (isNodeSelection) graphicInfo = getGraphicInfo(view);

          pluginViewer.updateGraphicInfo(graphicInfo);
        },
        destroy() {
          pluginViewer.unmount();
          editorElement.unmount();
          markerElement.unmount();
        },
      };
    },
  });

  return pluginObj;
};
