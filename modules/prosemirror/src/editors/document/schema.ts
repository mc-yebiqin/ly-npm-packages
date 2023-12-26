import { Schema } from "prosemirror-model";
import {
  documentDoc,
  text,
  paragraph,
  bold,
  code,
  link,
  italic,
  heading,
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
    heading,
    ai_block,
    paragraph,
  };

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

  const documentSchema = new Schema({ nodes, marks });
  return documentSchema;
};

export default initDocumentSchema;
