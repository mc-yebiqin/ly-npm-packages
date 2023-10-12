import * as nodeUtils from "./node";
import * as markUtils from "./mark";
import * as pluginUtils from "./plugin";
import * as commonUtils from "./common";

const PMUtils = {
  ...nodeUtils,
  ...markUtils,
  ...pluginUtils,
  ...commonUtils,
};

export * from "./typescript";

export default PMUtils;
