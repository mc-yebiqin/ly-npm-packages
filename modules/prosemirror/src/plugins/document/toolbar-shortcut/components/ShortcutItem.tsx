import React from "react";
import styles from "./index.module.scss";

type ShortcutItemProps = {
  item: any;
  itemIndex: number;
  groupIndex: number;
};
const ShortcutItem = (props: ShortcutItemProps) => {
  const { item, itemIndex, groupIndex } = props;
  return (
    <div className={styles.shortcut_item} data-scope={`${groupIndex}-${itemIndex}`}>
      <div className={styles.shortcut_item__wrapper}>
        <div className={styles.shortcut_logo}></div>

        <div className={styles.shortcut_info}>
          <div className={styles.shortcut_header}>
            <div className={styles.shortcut_title}>{item.title}</div>

            {item.shortcut && (
              <div className={styles.shortcut_keyword}>/{item.shortcut}</div>
            )}
          </div>

          <div className={styles.shortcut_subtext}>{item.subtext}</div>
        </div>
      </div>
    </div>
  );
};

export default ShortcutItem;
