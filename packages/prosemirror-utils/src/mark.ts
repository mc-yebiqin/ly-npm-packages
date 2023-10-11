import { MarkType } from "prosemirror-model";
import { EditorView } from "prosemirror-view";

export const hasMarkInSelection = (view: EditorView, mark: MarkType) => {
  let hasMark = true;
  const { doc, selection } = view.state;
  const { from, to } = selection;
  doc.nodesBetween(from, to, (node) => {
    if (!hasMark) return false;
    if (!node.type.isText) return true;
    hasMark = !!mark.isInSet(node.marks);
  });
  return hasMark;
};
