import { stat } from "fs";
import { NodeFactory } from "../../../core";
import { NodeTypeEnum } from "../../../shared";

export const table_td = NodeFactory.TextBlock({
  key: NodeTypeEnum.TableTd,
  isolating: true,
  parseHTML: () => [{ tag: "td" }],
  renderHTML: (node) => ["td", 0],
  keyboard: {
    Backspace: (state) => {
      const { empty, $from } = state.selection;
      if (empty && $from.parent.type.name === NodeTypeEnum.TableTd) {
        if (!$from.nodeBefore) return true;
      }
      return false;
    },
  },
});
