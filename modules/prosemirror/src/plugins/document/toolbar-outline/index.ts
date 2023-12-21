import PMUtils from "laoye-prosemirror-utils";
import { Plugin } from "prosemirror-state";

import styles from "./components/index.module.scss";
import OutlineToolbar from "./components";

export const documentToolbarByOutline = (): Plugin => {
  const pluginViewer = PMUtils.createPluginViewer(OutlineToolbar);

  const pluginObj = new Plugin({
    view(view: any) {
      pluginViewer.mount(view.dom.parentElement.parentElement, {
        className: styles.outline_plugin,
      });

      return {
        update: async (view, prevState) => {
          pluginViewer?.updateOutline(view.state.doc);
        },
        destroy() {
          pluginViewer?.unmount();
        },
      };
    },
  });

  return pluginObj;
};
