import React, { useState, forwardRef, useLayoutEffect, useImperativeHandle } from "react";
import { useMemoizedFn } from "ahooks";

import styles from "./index.module.scss";
import ShortcutGroups from "./ShortcutGroups";
import initShortcutList from "../configs";

type activeVisible = {
  offsetX: number;
  offsetY: number;
  keyword: string;
};

interface ForwardRef {
  updateVisible: (props?: activeVisible) => void;
}

const ShortcutMenu = forwardRef<ForwardRef, any>(({ view }, ref) => {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [visible, setVisible] = useState(false);
  const [shortcutGroups, setShortcutGroups] = useState<any[]>([]);

  const updateVisible = useMemoizedFn((props?: activeVisible) => {
    if (!props) return setVisible(false);

    const { offsetX, offsetY, keyword } = props;
    setVisible(true);
    setOffsetX(offsetX);
    setOffsetY(offsetY);
    setKeyword(keyword);
  });

  const handleClickMenu = useMemoizedFn((event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const scope = event.target.getAttribute("data-scope");
    if (scope) {
      const [groupIdx, itemIdx] = scope.split("-");
      shortcutGroups[groupIdx]?.options?.[itemIdx]?.execute?.(view);
    }
  });

  useLayoutEffect(() => {
    const shortcutList = initShortcutList();

    // 如果不存在关键词，则直接返回整个菜单
    if (!keyword) return setShortcutGroups(shortcutList);

    const tempGroups: any[] = [];
    shortcutList.forEach(({ label, options }) => {
      const filterItems = options.filter(
        (item: any) => !keyword || item?.shortcut?.includes(keyword)
      );
      if (filterItems.length) tempGroups.push({ label, options: filterItems });
    });
    setShortcutGroups(tempGroups);
  }, [keyword]);

  useImperativeHandle(ref, () => ({ updateVisible }));

  return (
    <div
      style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}
      className={styles.shortcut_container}
      data-visible={visible}
      onMouseDown={handleClickMenu}
    >
      {shortcutGroups.length > 0 ? (
        <ShortcutGroups list={shortcutGroups} />
      ) : (
        <span className={styles.shortcut_empty}>该指令不存在对应的 Block</span>
      )}
    </div>
  );
});

export default ShortcutMenu;
