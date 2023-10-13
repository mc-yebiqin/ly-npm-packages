import React from "react";

import CollapsedButton from "./CollapsedButton";
import ExpandedContainer from "./ExpandedContainer";
import { useToolsDomain } from "../domain";

const DevTools = () => {
  const isOpen = useToolsDomain((state) => state.isOpen);
  return isOpen ? <ExpandedContainer /> : <CollapsedButton />;
};

export default DevTools;
