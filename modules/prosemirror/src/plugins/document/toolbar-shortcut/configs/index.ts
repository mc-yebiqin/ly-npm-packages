import { ShortcutList } from "../typescript";
import { getBasicOptions } from "./basic";

function getShortcutList() {
  const shortcutList: ShortcutList[] = [
    {
      label: "Basic Blocks",
      options: getBasicOptions(),
    },
  ];

  return shortcutList;
}

export default getShortcutList;
