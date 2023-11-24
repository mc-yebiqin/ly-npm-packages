import React from "react";

import ExpandedTrigger from "./ExpandedTrigger";
import ExpandedContainer from "./ExpandedContainer";
import { useToolsDomain } from "../domain";

const DevTools = () => {
  const isOpen = useToolsDomain((state) => state.isOpen);
  return isOpen ? <ExpandedContainer /> : <ExpandedTrigger />;
};

export default DevTools;
