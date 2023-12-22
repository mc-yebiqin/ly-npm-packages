import { PMStyles } from "@ly/prosemirror";
import { NodeSelection, Plugin, TextSelection } from "prosemirror-state";
import { Decoration, DecorationSet, EditorView } from "prosemirror-view";

/**
 * 概要描述:
 * 该插件用于处理 ProseMirror 编辑器的交互操作，包括选区的装饰、焦点事件等。
 *
 * 关键细节说明:
 * - decorations 函数根据文档的选区上下文生成装饰器，标识已聚焦、已选中和活跃状态的块级元素。
 * - 当选择区域为空时，在光标所在的块级元素上添加表示“已聚焦”的装饰器。
 * - 当选择区域不为空时，遍历选区内的块级元素，添加表示“已选中”的装饰器。
 * - 如果选区的锚点和焦点的深度相同，且达到了二级以上，则给父级节点添加表示“活跃”状态的类名。
 * - handleDOMEvents 对焦点和失焦事件进行处理，为编辑器添加或移除“已聚焦”的状态类名。
 */
export function commonUIInteractionPlugin() {
  let editorView: EditorView;

  return new Plugin({
    view(view) {
      editorView = view;
      return {
        update() {},
        destroy() {},
      };
    },
    props: {
      /**
       * decorations - 根据文档的选区上下文生成装饰器的函数
       * @param {EditorState} state - 当前编辑器状态
       * @returns {DecorationSet} - 返回一个装饰器集合
       */
      decorations(state) {
        const decors: Decoration[] = [];
        const { doc, selection } = state;
        const { empty, $from, $to, from, to } = selection;

        if (empty) {
          // 如果选择区域为空（即用户只是将光标放在了一个块级元素中）,则为该块级元素添加一个表示“已聚焦”的装饰器
          if (selection instanceof TextSelection) {
            // 顶级节点之后已经没有位置可以获取了
            const from = $from.depth ? $from.before() : $from.pos;
            const to = $to.depth ? $to.after() : $to.pos;
            // 单节点选择所以添加聚焦状态类名
            decors.push(Decoration.node(from, to, { class: PMStyles.block_focused }));
          }
        } else if (selection instanceof NodeSelection) {
          decors.push(
            Decoration.node(from, to, { class: PMStyles.block_selected_block })
          );
        }

        // ❗️初始化的时候 editorView 视图还不存在，所以判断时还需要判断存不存在
        if (editorView?.hasFocus?.()) {
          // 如果选区的锚点和焦点的深度相同，且达到了二级以上，则给父级节点添加一个状态类名
          if ($from.depth === $to.depth && $to.depth > 1) {
            const fParentNode = $from.node($from.depth - 1);
            const tParentNode = $to.node($to.depth - 1);

            // 如果两点节点的父节点都不相同，则终止处理
            if (fParentNode !== tParentNode) return;

            const parentFrom = $from.before($from.depth - 1);
            const parentTo = $to.after($to.depth - 1);
            decors.push(
              Decoration.node(parentFrom, parentTo, { class: PMStyles.block_active })
            );
          }
        }

        return DecorationSet.create(doc, decors);
      },
      handleDOMEvents: {
        /**
         * focus - 处理焦点事件，为编辑器添加“已聚焦”的状态类名
         * @param {EditorView} view - 当前编辑器视图
         */
        focus(view) {
          view.dom.classList.add(PMStyles.editor_focused);
        },
        /**
         * blur - 处理失焦事件，移除编辑器的“已聚焦”的状态类名
         * @param {EditorView} view - 当前编辑器视图
         */
        blur(view) {
          view.dom.classList.remove(PMStyles.editor_focused);
        },
      },
      handleDoubleClick(view, pos, event) {
        const { state, dispatch } = view;
        const { tr, doc, selection } = state;
        const { $from } = selection;
        const end = $from.end();
        const start = $from.start();
        dispatch(tr.setSelection(TextSelection.create(doc, start, end)));
        return true;
      },
    },
  });
}
