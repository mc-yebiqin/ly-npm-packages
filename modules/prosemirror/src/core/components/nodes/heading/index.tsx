import { HeadingLevelEnum, NodeViewProps } from "@ly/prosemirror";
import React, { forwardRef } from "react";

type WrapperProps = {
  level: number;
  children: React.ReactNode;
};
const HeadingWrapper = (props: WrapperProps) => {
  const { level, children } = props;

  switch (level) {
    case HeadingLevelEnum.H1:
      return <h1>{children}</h1>;

    case HeadingLevelEnum.H2:
      return <h2>{children}</h2>;

    case HeadingLevelEnum.H3:
      return <h3>{children}</h3>;

    default:
      return <h4>{children}</h4>;
  }
};

export const Heading = forwardRef<any, NodeViewProps>((props, ref) => {
  const { node } = props;
  const { attrs } = node;

  return (
    <HeadingWrapper level={attrs.level}>
      <div ref={ref} />
    </HeadingWrapper>
  );
});
