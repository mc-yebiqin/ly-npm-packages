"use client";

import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from "react";
import PMUtils from "laoye-prosemirror-utils";

interface ContainerRef {
  active: boolean;
}
const A = forwardRef<ContainerRef, any>((props, ref) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  useImperativeHandle(ref, () => ({ active }), [active]);

  return (
    <button onClick={handleClick} style={{ pointerEvents: "all" }}>
      点击更改值
    </button>
  );
});

export const PluginDemo = memo(() => {
  const [pluginView, setPluginView] = useState();

  useEffect(() => {
    const pluginView = PMUtils.createPluginView(document.body, A);
    setPluginView(pluginView);
    return () => {
      pluginView.unmount();
    };
  }, []);

  const handleClick = () => {
    console.log(
      "%c >>>>> pluginView -21",
      "font-size:13px; background:pink; color:#000;",
      pluginView
    );
  };

  return (
    <div>
      <div>我是首页</div>
      <button onClick={handleClick}>打印最新值</button>
    </div>
  );
});
