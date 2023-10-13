import React, { memo } from "react";
import classnames from "classnames";
import { EditorState } from "prosemirror-state";

import styles from "./index.module.scss";
import BlockNode from "./BlockNode";
import { TabKeys, toolsDomain, useToolsDomain } from "../../domain";
import NodeDetail from "./NodeDetail";

type ContainerProps = {
  state: EditorState;
};
const StructurePanel = ({ state }: ContainerProps) => {
  const handleConsoleNode = () => {
    console.log(toolsDomain.state.selectNode);
  };

  return (
    <div className={styles.container}>
      <div className={classnames(styles.col, styles.block_viewer)}>
        <div className={styles.heading}>文档结构</div>
        <div className={styles.content}>
          <BlockNode node={state.doc} from={0} />
        </div>
      </div>

      <div className={classnames(styles.col, styles.block_details)}>
        <div className={styles.heading}>
          <span>节点信息</span>
          <button onClick={handleConsoleNode}>打印数据</button>
        </div>
        <div className={styles.content}>
          <NodeDetail />
        </div>
      </div>
    </div>
  );
};

const TabStructure = () => {
  const isActive = useToolsDomain((state) => state.activeTab === TabKeys.Structure);
  const updateState = useToolsDomain((state) => state.updateState);

  const isRender = isActive && updateState;
  return isRender ? <StructurePanel state={updateState} /> : null;
};

export default memo(TabStructure);
