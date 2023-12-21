import React, { memo } from "react";

import styles from "./index.module.scss";
import ActionItem from "./ActionItem";
import ColorPopover from "./ColorActions/FontColor";
import { getMarkActionList } from "../../configs";
import ColorTrigger from "./ColorActions";

const MarkActions = () => {
  const actionList = getMarkActionList();

  return (
    <div className={styles.mark_actions}>
      {actionList.map((item, index) => (
        <ActionItem key={index} item={item} />
      ))}

      <ColorTrigger />
    </div>
  );
};

export default memo(MarkActions);
