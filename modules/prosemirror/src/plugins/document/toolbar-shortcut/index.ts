import { Plugin } from "prosemirror-state";
import PMUtils from "laoye-prosemirror-utils";

import ShortcutMenu from "./components";

export const documentToolbarByShortcut = (): Plugin => {
  const pluginViewer = PMUtils.createPluginViewer(ShortcutMenu);

  const pluginObj = new Plugin({
    view(view) {
      const container = view.dom.parentElement!;
      pluginViewer.mount(container, { view });

      return {
        update(view) {
          const { empty, $from } = view.state.selection;
          if (empty) {
            const { textContent } = $from.parent;

            if (textContent.startsWith("/")) {
              const elemt = view.domAtPos($from.start()).node as HTMLElement;
              const boundingRect = PMUtils.calculateRelativeBoundingRect(
                elemt,
                container
              );

              const { top, left, height } = boundingRect;
              pluginViewer?.updateVisible?.({
                offsetX: left,
                offsetY: top + height,
                keyword: textContent.substring(1),
              });
              return;
            }
          }

          pluginViewer?.updateVisible?.();
        },
        destroy() {
          pluginViewer?.unmount?.();
        },
      };
    },
  });

  return pluginObj;
};
