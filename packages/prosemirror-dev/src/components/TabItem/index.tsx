import React, { memo } from "react";
import { useToolsDomain } from "../../domain";
import styles from "./index.module.scss";

const TabItem = ({ item }: any) => {
  const { key, label } = item;

  const activeTab = useToolsDomain((state) => state.activeTab);

  return (
    <div className={styles.tab_item} data-active={activeTab === key}>
      {label}
    </div>
  );
};

export default memo(TabItem);
