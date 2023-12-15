"use client";

import classNames from "classnames";
import {
  design,
  ComponentAttributes,
  useStylesClassnames,
} from "laoye-react-component_design";
import { useState } from "react";

const myArray = Array.from({ length: 1000 });

interface BoxProps extends ComponentAttributes {}

const Box = (props: BoxProps) => {
  const { css, className, children, ...others } = props;

  const stylesClassname = useStylesClassnames(css);

  return (
    <div className={classNames(className, stylesClassname)} {...others}>
      {children}
    </div>
  );
};

const UserItem = ({ active }: any) => {
  return (
    <Box
      css={{
        gap: design.gap.medium,
        color: design.color.gray[90],
        cursor: "pointer",
        display: "flex",
        padding: design.padding.medium,
        borderRadius: design.radius.medium,
        backgroundColor: active ? design.color.blue[10] : design.color.gray[10],
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: active ? design.color.blue[30] : "transparent",
      }}
    >
      <Box
        css={{
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
        头像
      </Box>

      <Box>
        <Box css={{ gap: design.gap.medium, display: "flex", alignItems: "end" }}>
          <Box>BiQin Ye</Box>
          <Box css={{ color: design.color.gray[60], fontSize: "12px" }}>
            biqin.ye@qq.com
          </Box>
        </Box>

        <Box>这是一个简单的自我介绍～</Box>
      </Box>
    </Box>
  );
};

function HomePage() {
  const [active, setActive] = useState(false);

  const handleClickEvt = () => setActive(!active);

  return (
    <Box
      css={{
        gap: design.gap.medium,
        height: "100vh",
        padding: design.gap.medium,
        display: "flex",
        overflowX: "hidden",
        flexDirection: "column",
      }}
      onClick={handleClickEvt}
    >
      {myArray.map((value, index) => (
        <UserItem key={index} active={active} />
      ))}
    </Box>
  );
}

export default HomePage;
