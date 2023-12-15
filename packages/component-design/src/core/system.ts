import { AllHTMLAttributes, CSSProperties, useRef } from "react";
import { design } from "../theme";

export interface ComponentAttributes extends AllHTMLAttributes<any> {
  css?: CSSProperties;
}

export const useStylesClassnames = (cssObject?: CSSProperties) => {
  return design.assembleClassNames(cssObject);
};
