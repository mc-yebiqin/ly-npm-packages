"use client";

import { design } from "laoye-react-component_design";
import React, { memo } from "react";

type ColorPageProps = {};
const ColorPage = (props: ColorPageProps) => {
  return (
    <div
      style={{
        gap: "8px",
        padding: "12px",
        height: "100vh",
        overflowX: "hidden",
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "black",
      }}
    >
      {Object.entries(design.color).map(([color, depths]) => (
        <div
          key={color}
          style={{ width: "10%", flexGrow: "1", overflow: "hidden", borderRadius: "8px" }}
        >
          {Object.entries(depths).map(([depth, value]) => (
            <div
              key={depth}
              style={{
                color: depth > 50 ? "white" : "black",
                padding: "16px",
                backgroundColor: value,
              }}
            >
              {depth} - {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default memo(ColorPage);
