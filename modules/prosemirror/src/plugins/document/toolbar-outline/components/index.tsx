import React, { useState, forwardRef, useImperativeHandle } from "react";
import PMUtils from "laoye-prosemirror-utils";
import { Node } from "prosemirror-model";
import { useMemoizedFn, useMount } from "ahooks";

import styles from "./index.module.scss";
import { NodeTypeEnum } from "../../../../shared";
import { documentEditorDomain } from "@notta/domain";

interface ForwardRef {
  updateOutline: (doc: Node) => void;
}

interface OutlineItem {
  id: number;
  level: number;
  content: string;
}

const OutlineToolbar = forwardRef<ForwardRef, any>((props, ref) => {
  const [outlineList, setOutlineList] = useState<OutlineItem[]>([]);

  const updateOutline = useMemoizedFn((doc) => {
    const tempList: OutlineItem[] = [];

    PMUtils.findNodeDescendant(doc, (node) => {
      if (node.type.name === NodeTypeEnum.Heading) {
        tempList.push({
          id: node.attrs.id,
          level: node.attrs.level,
          content: node.textContent,
        });
      }

      if (node.isTextblock) return false;
    });

    setOutlineList(tempList);
  });

  useMount(() => {
    const { editorView } = documentEditorDomain.getState();
    if (editorView) updateOutline(editorView.state.doc);
  });

  useImperativeHandle(ref, () => ({ updateOutline }));

  return (
    <div className={styles.outline_container}>
      {outlineList.map((item, index) => (
        <div key={index} className={styles.outline_item} data-level={item.level}>
          <a href={`#${item.id}`}> {item.content}</a>
        </div>
      ))}
    </div>
  );
});

export default OutlineToolbar;
