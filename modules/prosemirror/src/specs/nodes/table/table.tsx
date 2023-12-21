import React from "react";
import { Node } from "prosemirror-model";
import { EditorView } from "prosemirror-view";

import { Table } from "../../../core/components";
import { NodeTypeEnum } from "../../../shared";
import { TemplateNodeView, NodeFactory } from "../../../core";

class TableNodeView extends TemplateNodeView {
  constructor(
    node: Node,
    view: EditorView,
    getPos: () => number,
    Component: React.ForwardRefExoticComponent<any & React.RefAttributes<HTMLDivElement>>
  ) {
    super(node, view, getPos, Component);
  }

  _createContentElement(): HTMLElement {
    return document.createElement("table");
  }
}

export const table = NodeFactory.Block({
  key: NodeTypeEnum.Table,
  content: `${NodeTypeEnum.TableTr}+`,
  parseHTML: () => [{ tag: "table" }],
  renderHTML: (node) => ["table", 0],
  renderView: (node, view, getPos) => new TableNodeView(node, view, getPos, Table),
});
