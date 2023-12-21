import React from "react";
import ShortcutItem from "./ShortcutItem";

import styles from "./index.module.scss";
import { ShortcutList } from "../typescript";

type GroupsProps = {
  list: ShortcutList[];
};
const ShortcutGroups = (props: GroupsProps) => {
  const { list } = props;

  return (
    <div className={styles.shortcut_group}>
      {list.map(({ label, options }, groupIndex) => (
        <div key={label} className={styles.group_item}>
          <div className={styles.group_title}>{label}</div>
          <div className={styles.group_content}>
            {options.map((item, itemIndex) => (
              <ShortcutItem
                key={item.id}
                item={item}
                itemIndex={itemIndex}
                groupIndex={groupIndex}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShortcutGroups;
