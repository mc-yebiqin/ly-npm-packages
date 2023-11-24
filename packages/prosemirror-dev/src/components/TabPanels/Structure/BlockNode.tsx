import React, { memo } from "react";
import { Node } from "prosemirror-model";

import styles from "./index.module.scss";
import BlockContents from "./BlockContents";
import { toolsDomain } from "../../../domain";

type BlockNodeProps = {
  node: Node;
  from: number;
};
const BlockNode = ({ node, from }: BlockNodeProps) => {
  const to = from + node.nodeSize;

  const handleClickEvt = () => {
    Object.assign(node, { pos: from });
    toolsDomain.set({ selectNode: node });
  };

  return (
    <div className={styles.block_node}>
      <div
        className={styles.node_info}
        style={{ backgroundColor: toolsDomain.getNodeColor(node.type.name) }}
        onClick={handleClickEvt}
      >
        <div className={styles.node_info__inner}>
          <div className={styles.node_pos}>{from}</div>
          <div className={styles.node_type}>{node.type.name}</div>
          <div className={styles.node_pos}>{to}</div>
        </div>
      </div>

      <BlockContents pos={from} node={node} />
    </div>
  );
};

export default BlockNode;
