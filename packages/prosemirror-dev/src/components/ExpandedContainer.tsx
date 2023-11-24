import React, { memo } from "react";

import styles from "./index.module.scss";
import TabItem from "./TabItem";
import { TabStructure } from "./TabPanels";
import PanelSelector from "./PanelSelector";
import { TabKeys, toolsDomain } from "../domain";

const TABS_CONFIG = [
  {
    key: TabKeys.Structure,
    label: "结构",
  },
  {
    key: TabKeys.State,
    label: "状态",
  },
];

const TAB_SLOT = {
  key: TabKeys.Slot,
  label: "插槽",
};

const ExpandedContainer = () => {
  const handleCloseEvt = () => {
    toolsDomain.set({ isOpen: false });
  };

  return (
    <div className={styles.expand_container}>
      <div className={styles.container_header}>
        <div className={styles.container_tabs}>
          {TABS_CONFIG.map((item) => (
            <TabItem key={item.key} item={item} />
          ))}
        </div>

        <div className={styles.container_action}>
          <TabItem item={TAB_SLOT} />

          <PanelSelector />

          <div className={styles.container_close} onClick={handleCloseEvt}>
            x
          </div>
        </div>
      </div>

      <div className={styles.container_content}>
        <TabStructure />
      </div>
    </div>
  );
};

export default memo(ExpandedContainer);
