"use client";

import { design } from "laoye-react-component_design";
import React, { useState } from "react";

const myArray = Array.from({ length: 1000 });

const UserItem = () => {
  const [active, setActive] = useState(false);

  const handleClickEvt = () => setActive(!active);

  return (
    <div
      style={{
        gap: design.gap.medium,
        color: design.color.gray[90],
        cursor: "pointer",
        display: "flex",
        padding: design.padding.medium,
        borderRadius: design.radius.medium,
        backgroundColor: active ? design.color.blue[5] : design.color.gray[10],
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: active ? design.color.blue[30] : "transparent",
      }}
      onClick={handleClickEvt}
    >
      <div
        style={{
          color: "white",
          width: "42px",
          height: "42px",
          display: "flex",
          alignItems: "center",
          borderRadius: "100%",
          justifyContent: "center",
          backgroundColor: design.color.blue[60],
        }}
      >
        属性
      </div>

      <div>
        <div style={{ gap: design.gap.medium, display: "flex", alignItems: "end" }}>
          <div>BiQin Ye</div>
          <div style={{ color: design.color.gray[60], fontSize: "12px" }}>
            biqin.ye@qq.com
          </div>
        </div>

        <div>这是一个简单的自我介绍～</div>
      </div>
    </div>
  );
};

const PerformanceStylePage = () => {
  return (
    <div
      style={{
        gap: "12px",
        height: "100vh",
        padding: "12px",
        display: "flex",
        overflowX: "hidden",
        flexDirection: "column",
      }}
    >
      {myArray.map((value, index) => (
        <UserItem key={index} />
      ))}
    </div>
  );
};

export default PerformanceStylePage;
