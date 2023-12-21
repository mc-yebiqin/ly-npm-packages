import React, { memo, useEffect, useState } from "react";
import PMUtils from "laoye-prosemirror-utils";
import { Popover } from "antd";

import styles from "./index.module.scss";
import ActionItem from "./ActionItem";
import ActionButton from "../ActionButton";
import { getNodeActionGroup } from "../../configs";

import { NodeIconMap } from "@ly/prosemirror";
import { useDocumentEditorDomain } from "@notta/domain";

const PopoverOverlay = () => {
  const actionList = getNodeActionGroup();

  return (
    <div className={styles.node_groups}>
      {actionList.map((group) =>
        group.map((item) => <ActionItem key={item.label} item={item} />)
      )}
    </div>
  );
};

const NodeGroups = () => {
  const editorState = useDocumentEditorDomain((state) => state.editorState);

  const [active, setActive] = useState(false);
  const [selectionIcon, setSelectionIcon] = useState<any>();

  useEffect(() => {
    if (editorState) {
      const { doc, selection } = editorState;
      const { from, to } = selection;

      let icon: any = null;
      PMUtils.findBlockBetween(doc, from, to, (node) => {
        const nodeIcon = node.type.spec.getTypename(node);

        if (!icon) {
          icon = nodeIcon;
        } else if (nodeIcon !== icon) {
          icon = null;
          return true;
        }
      });
      setSelectionIcon(icon);
    }
  }, [editorState]);

  return (
    <Popover
      trigger={"hover"}
      content={<PopoverOverlay />}
      placement="bottomLeft"
      onOpenChange={(open) => setActive(open)}
      getPopupContainer={(target) => target}
    >
      <ActionButton data-active={active}>
        {selectionIcon ? NodeIconMap[selectionIcon] : "混合节点"}
      </ActionButton>
    </Popover>
  );
};

export default memo(NodeGroups);
