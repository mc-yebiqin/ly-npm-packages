"use client";

import React, { useState } from "react";
import "./index.css";

const myArray = Array.from({ length: 1000 });

const UserItem = () => {
  const [active, setActive] = useState(false);

  const handleClickEvt = () => setActive(!active);

  return (
    <div className="user_container" data-active={active} onClick={handleClickEvt}>
      <div className="user_avatar">类名</div>

      <div>
        <div className="user_info">
          <div>BiQin Ye</div>
          <div className="user_email">biqin.ye@qq.com</div>
        </div>

        <div>这是一个简单的自我介绍～</div>
      </div>
    </div>
  );
};

const PerformanceClassPage = () => {
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

export default PerformanceClassPage;
