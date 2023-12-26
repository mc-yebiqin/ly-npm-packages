export * from "./attrs";

/**
 * 枚举类型，表示列表的类型。
 */
export enum ListTypeEnum {
  /** 有序列表 */
  Ordered = "ordered", // 有序列表
  /** 无序列表 */
  Unordered = "unordered", // 无序列表
}

/**
 * 定义了编辑器中可能的不同节点类型的枚举。
 * 包括文档、表格、表格行、表格表头、表格单元格、标题、段落、列表项、代码块、图像、操作项、引用块、提示框和水平分隔线等。
 *
 * @enum {string}
 */
export enum NodeTypeEnum {
  /**
   * 文档节点类型
   */
  Doc = "doc",

  /**
   * 表格节点类型
   */
  Table = "table",

  /**
   * 表格行节点类型
   */
  TableTr = "table_tr",

  /**
   * 表格表头节点类型
   */
  TableTh = "table_th",

  /**
   * 表格单元格节点类型
   */
  TableTd = "table_td",

  /**
   * 标题节点类型
   */
  Heading = "heading",

  /**
   * 段落节点类型
   */
  Paragraph = "paragraph",

  /**
   * 列表项节点类型
   */
  ListItem = "list_item",

  /**
   * 绘图节点
   */
  Graphic = "graphic",

  /**
   * 图像节点类型
   */
  ImageItem = "image_item",

  /**
   * 代码块节点类型
   */
  BlockCode = "block_code",

  /**
   * 内联容器
   */
  BlockInline = "block_inline",

  /**
   * 操作项节点类型
   */
  ActionItem = "action_item",

  /**
   * 引用块节点类型
   */
  BlockQuote = "block_quote",

  /**
   * 提示框节点类型（用于引起注意的特殊信息）
   */
  BlockCallout = "block_callout",

  /**
   * 水平分隔线节点类型
   */
  HorizontalRule = "horizontal_rule",

  /**
   * AI Block
   */
  AI_Block = "ai_block",
}

/**
 * 定义了文本标记的类型枚举。
 * 包括粗体、链接、斜体、下划线、字体颜色、删除线和背景色等文本标记类型。
 *
 * @enum {string}
 */
export enum MarkTypeEnum {
  /**
   * 粗体文本标记类型
   */
  Bold = "bold",

  /**
   * 代码片段文本标记类型
   */
  Code = "code",

  /**
   * 链接文本标记类型
   */
  Link = "link",

  /**
   * 斜体文本标记类型
   */
  Italic = "italic",

  /**
   * 链接文本标记类型
   */
  Comment = "comment",

  /**
   * 下划线文本标记类型
   */
  Underline = "underline",

  /**
   * 字体颜色文本标记类型
   */
  ColorFont = "color_font",

  /**
   * 删除线文本标记类型
   */
  Strikethrough = "strike_through",

  /**
   * 背景色文本标记类型
   */
  ColorBackground = "color_background",
}

/**
 * 枚举类型，表示文本对齐的可能选项。
 */
export enum AlignTypeEnum {
  /** 左对齐 */
  Left = "left",
  /** 居中对齐 */
  Center = "center",
  /** 右对齐 */
  Right = "right",
}

/**
 * ProseMirror 节点群组规格的枚举对象。
 */
export enum GroupSpecEnum {
  /**
   * 叶子节点群组，包含所有叶子节点类型，如image, hard_break, text等。
   */
  Leaf = "leaf",
  /**
   * 行内节点群组，包含所有可以作为文本块节点的子节点的节点类型，如text, link, code, emoji等。
   */
  Inline = "inline",
  /**
   * 块级节点群组，包含所有可以作为文档或其他块级节点的子节点的节点类型，如ul, ol, table, blockquote等。
   */
  Block = "block",
  /**
   * 文本块节点群组，包含所有可以包含文本节点的块级节点类型，如paragraph, heading, code_block, table_cell等。
   */
  TextBlock = "text_block",
  /**
   * 基本文本块节点群组（根据业务划分），包含所有只能包含文本节点的块级节点类型，如paragraph, heading, list_item 等。
   */
  BasicTextBlock = "basic_text_block",
}

export enum FontColorEnum {
  Black = "black",
  Gray = "gray",
  Red = "red",
  Green = "green",
  Blue = "blue",
  Orange = "orange",
  Yellow = "yellow",
  Purple = "purple",
}

export enum BackgroundColorEnum {
  // 浅色
  White = "white",
  Lightgray = "lightgray",
  Pink = "pink",
  Palegreen = "palegreen",
  Lightskyblue = "lightskyblue",
  Orange = "orange",
  Yellow = "yellow",
  Mediumpurple = "mediumpurple",
  // 深色
  Black = "black",
  Darkgray = "darkgray",
  Red = "red",
  Green = "green",
  Blue = "blue",
  Darkorange = "darkorange",
  Gold = "gold",
  Purple = "purple",
}
