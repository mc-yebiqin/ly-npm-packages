import React, { memo } from "react";
import { Node } from "prosemirror-model";

type NodePlaceholderProps = { node: Node };
const NodePlaceholder = ({ node }: NodePlaceholderProps) => {
  return <div>this is NodePlaceholder component</div>;
};

export default memo(NodePlaceholder);
