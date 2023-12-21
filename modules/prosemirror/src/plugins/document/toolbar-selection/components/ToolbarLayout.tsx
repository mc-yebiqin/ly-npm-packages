import React, { memo } from "react";

import styles from "./index.module.scss";
import NodeGroups from "./NodeGroups";
import AlignGroups from "./AlignGroups";
import MarkActions from "./MarkActions";
import CommentAction from "./CommentAction";

type ToolbarLayoutProps = {};
const ToolbarLayout = (props: ToolbarLayoutProps) => {
  return (
    <div className={styles.toolbar_layout}>
      <NodeGroups />
      <AlignGroups />
      <MarkActions />
      <CommentAction />
    </div>
  );
};

export default memo(ToolbarLayout);
