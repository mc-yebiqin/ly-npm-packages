import {
  ListTypeEnum,
  NodeTypeEnum,
  setTextblockType,
  setTextblockToTable,
  setLeafBlockType,
} from "@ly/prosemirror";

import { ShortcutOption } from "../typescript";

export function getBasicOptions() {
  const paragraph: ShortcutOption = {
    id: "paragraph",
    title: "文段段落",
    subtext: "Set as text paragraph.",
    execute: setTextblockType(NodeTypeEnum.Paragraph),
  };

  const heading1: ShortcutOption = {
    id: "heading1",
    title: "标题1",
    subtext: "Set as heading 1.",
    shortcut: "h1",
    execute: setTextblockType(NodeTypeEnum.Heading, { level: 1 }),
  };

  const heading2: ShortcutOption = {
    id: "heading2",
    title: "标题2",
    subtext: "Set as heading 2.",
    shortcut: "h2",
    execute: setTextblockType(NodeTypeEnum.Heading, { level: 2 }),
  };

  const heading3: ShortcutOption = {
    id: "heading3",
    title: "标题3",
    subtext: "Set as heading 3.",
    shortcut: "h3",
    execute: setTextblockType(NodeTypeEnum.Heading, { level: 3 }),
  };

  const orderedItem: ShortcutOption = {
    id: "orderedItem",
    title: "有序列表",
    subtext: "Set as ordered list.",
    shortcut: "ol",
    execute: setTextblockType(NodeTypeEnum.ListItem, {
      type: ListTypeEnum.Ordered,
    }),
  };

  const unorderedItem: ShortcutOption = {
    id: "unorderedItem",
    title: "无序列表",
    subtext: "Set as unordered list.",
    shortcut: "ol",
    execute: setTextblockType(NodeTypeEnum.ListItem, {
      type: ListTypeEnum.Unordered,
    }),
  };

  const blockquote: ShortcutOption = {
    id: "blockquote",
    title: "引用内容",
    subtext: "Set as blockquote.",
    shortcut: "quote",
    execute: setTextblockType(NodeTypeEnum.BlockQuote),
  };

  const codeblock: ShortcutOption = {
    id: "codeblock",
    title: "代码块",
    subtext: "Set as codeblock.",
    shortcut: "code",
    execute: setTextblockType(NodeTypeEnum.BlockCode),
  };

  const table: ShortcutOption = {
    id: "table",
    title: "表格",
    subtext: "Set as table.",
    shortcut: "table",
    execute: setTextblockToTable,
  };

  const graphicItem: ShortcutOption = {
    id: "graphicItem",
    title: "绘图",
    subtext: "Set as graphic item.",
    shortcut: "graphic",
    execute: setLeafBlockType(NodeTypeEnum.Graphic),
  };

  return [
    graphicItem,
    table,
    paragraph,
    heading1,
    heading2,
    heading3,
    orderedItem,
    unorderedItem,
    blockquote,
    codeblock,
  ];
}
