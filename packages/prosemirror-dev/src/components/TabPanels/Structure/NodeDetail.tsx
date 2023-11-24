import React, { memo, useEffect } from "react";
import { JSONTree } from "react-json-tree";

import { jsonTheme } from "../../../styles";
import { useToolsDomain } from "../../../domain";

let timer: any;
let activeElement: HTMLElement;

const NodeDetail = () => {
  const view = useToolsDomain((state) => state.view);
  const node = useToolsDomain((state) => state.selectNode);

  useEffect(() => {
    if (node && view) {
      const dom = view.domAtPos(node.pos)?.node as any;
      const element = dom?.offsetParent || dom?.parentElement.offsetParent;
      if (element) {
        element.scrollIntoView?.({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });

        clearTimeout(timer);
        activeElement?.classList.remove("anchor-point");

        activeElement = element;
        activeElement.classList.add("anchor-point");
        timer = setTimeout(() => activeElement.classList.remove("anchor-point"), 1500);
      }
    }
  }, [node]);

  return (
    <JSONTree
      hideRoot
      data={node?.toJSON() || {}}
      theme={jsonTheme}
      invertTheme={false}
      shouldExpandNodeInitially={() => true}
    />
  );
};

export default memo(NodeDetail);
