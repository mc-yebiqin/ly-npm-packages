import React, { memo } from "react";
import styles from "./index.module.scss";
import { toolsDomain } from "../domain";

const CollapsedButton = () => {
  const handleOpenEvt = () => toolsDomain.set({ isOpen: true });

  return (
    <div className={styles.collapsed_button} onClick={handleOpenEvt}>
      🛠
    </div>
  );
};

export default memo(CollapsedButton);
