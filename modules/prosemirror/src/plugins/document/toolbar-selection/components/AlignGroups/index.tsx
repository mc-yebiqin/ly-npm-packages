import React, { memo, useEffect, useState } from "react";
import PMUtils from "laoye-prosemirror-utils";
import { Popover } from "antd";

import styles from "./index.module.scss";
import ActionItem from "./ActionItem";
import { getAlignList } from "../../configs";

import { AlignIconMap, AlignTypeEnum, GroupSpecEnum } from "@ly/prosemirror";
import { useDocumentEditorDomain } from "@notta/domain";
import ActionButton from "../ActionButton";

const PopoverOverlay = () => {
  const actionList = getAlignList();
  return (
    <div className={styles.node_groups}>
      {actionList.map((item) => (
        <ActionItem key={item.label} item={item} />
      ))}
    </div>
  );
};

const AlignGroups = () => {
  const editorState = useDocumentEditorDomain((state) => state.editorState);

  const [active, setActive] = useState(false);
  const [showed, setShowed] = useState(false);
  const [selectionIcon, setSelectionIcon] = useState<AlignTypeEnum>(AlignTypeEnum.Left);

  useEffect(() => {
    if (editorState) {
      const { doc, selection } = editorState;
      const { from, to } = selection;

      let isShow = true;
      let alignType = AlignTypeEnum.Left;
      PMUtils.findBlockBetween(doc, from, to, (node) => {
        if (!node.type.groups.includes(GroupSpecEnum.BasicTextBlock)) {
          isShow = false;
          return true;
        }

        if (!alignType) {
          alignType = node.attrs.align;
        } else if (node.attrs.align !== alignType) {
          alignType = AlignTypeEnum.Left;
          return true;
        }
      });

      setShowed(isShow);
      setSelectionIcon(alignType);
    }
  }, [editorState]);

  if (!showed) return null;

  return (
    <Popover
      trigger={"hover"}
      content={<PopoverOverlay />}
      placement="bottomLeft"
      onOpenChange={(open) => setActive(open)}
      getPopupContainer={(target) => target}
    >
      <ActionButton data-active={active}>{AlignIconMap[selectionIcon]}</ActionButton>
    </Popover>
  );
};

export default memo(AlignGroups);
