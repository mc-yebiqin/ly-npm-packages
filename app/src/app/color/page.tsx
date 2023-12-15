"use client";

import { theme } from "laoye-react-component_design";
import React, { memo } from "react";

type ColorPageProps = {};
const ColorPage = (props: ColorPageProps) => {
  return (
    <div
      style={{ height: "100vh", overflowX: "hidden", display: "flex", flexWrap: "wrap" }}
    >
      {/* {Object.entries(theme.color).map(([color, depths]) => (
        <div key={color} style={{ width: "33%", flexGrow: "1" }}>
          {Object.entries(depths).map(([depth, value]) => (
            <div
              key={depth}
              style={{
                color: "white",
                padding: "24px",
                backgroundColor: value,
              }}
            >
              {depth} - {value}
            </div>
          ))}
        </div>
      ))} */}
    </div>
  );
};

export default memo(ColorPage);
