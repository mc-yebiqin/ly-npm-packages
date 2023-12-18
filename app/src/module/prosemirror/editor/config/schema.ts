import { Schema } from "prosemirror-model";

export const initDocumentSchema = () => {
  return new Schema({
    nodes: {
      doc: {
        content: "block+",
      },
      paragraph: {
        group: "block",
        content: "inline*",
        toDOM: (node) => ["p", { "data-indent": node.attrs.indent }, 0],
        parseDOM: [{ tag: "p" }],
      },
      text: {
        group: "inline",
      },
    },
    marks: {},
  });
};
