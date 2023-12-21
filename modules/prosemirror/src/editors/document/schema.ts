import { Schema } from "prosemirror-model";
import {
  documentDoc,
  text,
  paragraph,
  bold,
  code,
  link,
  italic,
  comment,
  underline,
  ai_block,
  strike_through,
  color_font,
  color_background,
} from "../../specs";

const initDocumentSchema = () => {
  const nodes = {
    doc: documentDoc,
    text,
    ai_block,
    paragraph,
  };
  console.log(
    "%c >>>>> nodes -19",
    "font-size:13px; background:pink; color:#000;",
    nodes
  );

  const marks = {
    bold,
    code,
    link,
    italic,
    comment,
    underline,
    strike_through,
    color_font,
    color_background,
  };

  return new Schema({ nodes, marks });
};

export default initDocumentSchema;
