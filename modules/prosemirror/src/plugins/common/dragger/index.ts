import PMUtils from "laoye-prosemirror-utils";
import { NodeSelection, Plugin, TextSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

import Divider from "./Divider";
import { Node, Slice } from "prosemirror-model";
import { dropPoint } from "prosemirror-transform";
import { PMStyles } from "../../../styles";

/**
 * ProseMirror 拖拽控制插件
 * - 该插件用于在 ProseMirror 编辑器中实现拖拽功能。
 * - 主要功能包括在指定位置开始拖拽，确定拖拽目标位置，以及完成拖拽操作。
 */
export function commonDraggerPlugin() {
  /** 缓存光标的落点 */
  let dropPos: number = -1;
  /** 缓存的拖拽数据 */
  let dragging: { node: Node; slice: Slice } | null = null;
  /** 缓存落点的容器 */
  let dropBlock: HTMLElement | null = null;

  /** 拖拽线条的实例对象 */
  const pluginView = PMUtils.createPluginViewer(Divider);

  /**
   * 完成拖拽操作时的处理函数
   * 重置缓存的状态，更新拖拽线条的位置
   * @returns {boolean} 拖拽完成状态
   */
  const onDragComplete = () => {
    // 将拖拽线条的位置设为 null，表示隐藏
    pluginView.updateVisible(null);
    //
    dropBlock?.classList.remove(PMStyles.block_drop);

    // 将缓存的数据重置为初始值
    dropPos = -1;
    dragging = null;
    dropBlock = null;

    // 返回 true，表示拖拽操作已经完成
    return true;
  };

  return new Plugin({
    view(view) {
      pluginView.mount(view.dom.parentElement);
      return {
        destroy: () => pluginView?.unmount(),
      };
    },
    // 定义插件的属性，用于处理拖拽相关的 DOM 事件
    props: {
      handleDOMEvents: {
        dragstart(view, event) {
          // 调用编辑器的内部方法，完成鼠标按下的操作，这里不需要关心具体的实现，只需要知道这是必要的步骤
          view.input?.mouseDown?.done();

          // 根据鼠标的坐标，获取编辑器中对应的位置信息
          const cursorPos = view.posAtCoords({ left: event.clientX, top: event.clientY });
          // 如果位置信息存在，说明鼠标在编辑器的有效范围内
          if (cursorPos) {
            // 获取编辑器的当前选区，强制转换为节点选区类型
            let sel = view.state.selection as NodeSelection;
            // 获取位置信息中的 inside 属性，表示鼠标所在的节点的起始位置
            const nodeStart = cursorPos.inside;

            // 判断当前选区是否是节点选区，并且选区的起始位置是否和鼠标所在的节点的起始位置一致
            // 如果是，说明当前选区是有效的，不需要修正
            const isSelValid = sel instanceof NodeSelection && sel.from === nodeStart;
            // 如果不是，说明当前选区是无效的，需要修正
            if (!isSelValid) {
              // 获取编辑器的状态和分发方法
              const { state, dispatch } = view;
              // 获取编辑器的事务和文档对象
              const { tr, doc } = state;
              // 根据鼠标所在的节点的起始位置，创建一个新的节点选区
              sel = NodeSelection.create(doc, nodeStart);
              // 用分发方法，将事务中的选区设置为新的节点选区
              dispatch(tr.setSelection(sel));
            }

            // 获取当前选区节点的 slice 数据，表示选区节点的内容和结构
            // 并将其和选区节点一起，组装到拖拽数据的缓存对象中
            const slice = sel.content();
            dragging = { slice, node: sel.node };
          } else {
            // 如果位置信息不存在，说明鼠标在编辑器的无效范围内
            // 阻止默认的拖拽行为，不做任何处理
            event.preventDefault();
          }
          // 返回 true，表示拖拽开始事件已经处理完毕
          return true;
        },
        // 定义拖拽进入时的处理函数
        dragenter: (view: EditorView, event: DragEvent) => {
          if (dragging) {
            // 获取拖拽的数据
            const { node, slice } = dragging;
            // 获取鼠标的坐标
            const { clientX, clientY } = event;
            // 根据鼠标的坐标，获取编辑器中对应的位置信息
            const cursorPos = view.posAtCoords({ left: clientX, top: clientY });
            // 如果位置信息存在，说明鼠标在编辑器的有效范围内
            if (cursorPos) {
              // 调用一个外部的函数，根据编辑器的文档，鼠标所在的位置，和拖拽数据的缓存对象中的 slice 数据
              // 计算出一个合适的落点位置，表示拖拽内容可以插入的位置
              // 如果没有合适的位置，返回 -1
              dropPos = dropPoint(view.state.doc, cursorPos.pos, slice) ?? -1;
              // 如果落点位置大于 -1，说明有合适的位置
              if (dropPos > -1) {
                // 根据落点位置，获取编辑器中对应的坐标信息，表示落点的左上角的坐标
                const { top: cTop } = view.coordsAtPos(dropPos);
                // 获取编辑器的 DOM 元素的边界信息，表示编辑器的左上角的坐标
                const { top: eTop } = view.dom.getBoundingClientRect();
                // 计算出落点的相对偏移量，表示落点相对于编辑器的左上角的偏移量
                const offsetY = cTop - eTop;
                // 调用拖拽线条的实例对象的方法，更新拖拽线条的位置和宽度
                pluginView.updateVisible({ y: offsetY, node });

                // 获取落点位置处的上下文信息
                const resolve = view.state.doc.resolve(dropPos);
                const parentPos = resolve.pos - resolve.parentOffset - 1;
                const parentDOM = view.nodeDOM(parentPos) as HTMLElement | null;
                if (dropBlock !== parentDOM) {
                  parentDOM?.classList.add(PMStyles.block_drop);
                  dropBlock?.classList.remove(PMStyles.block_drop);
                  dropBlock = parentDOM;
                }

                return true; // 返回 true，表示拖拽进入事件已经处理完毕
              }
            }
          }

          // 如果拖拽数据的缓存对象不存在，或者位置信息不存在，或者落点位置小于 -1
          // 调用拖拽线条的实例对象的方法，将拖拽线条的位置设为 null，表示隐藏
          pluginView.updateVisible(null);
          return true; // 返回 true，表示拖拽进入事件已经处理完毕
        },
        dragleave(view, event: any) {
          // 如果拖拽数据的缓存对象不存在，直接返回 true，表示拖拽离开事件已经处理完毕
          if (!dragging) return true;
          // 如果拖拽数据的缓存对象存在，判断事件的来源元素是否包含在编辑器的父元素中
          // 如果不包含，说明鼠标已经离开了编辑器的范围
          if (!view.dom.parentElement?.contains(event.fromElement)) {
            // 调用拖拽线条的实例对象的方法，将拖拽线条的位置设为 null，表示隐藏
            pluginView.updateVisible(null);
          }
          // 返回 true，表示拖拽离开事件已经处理完毕
          return true;
        },
        drop(view) {
          // 如果落点位置大于 -1，且拖拽数据的缓存对象存在，说明有有效的拖拽内容和位置
          if (dropPos > -1 && dragging) {
            // 获取拖拽数据的缓存对象中的 slice 数据，表示拖拽内容的内容和结构
            const { content } = dragging.slice;
            // 获取编辑器的状态和分发方法
            const { state, dispatch } = view;

            // 创建一个新的事务，用于删除当前的选区
            let tr = state.tr.deleteSelection();

            // 根据事务的映射，将落点位置映射到新的文档中，表示拖拽内容可以插入的位置
            let insertPos = tr.mapping.map(dropPos);
            // 在插入位置处，将事务中的文档插入拖拽内容
            tr = tr.insert(insertPos, content);

            // 计算出修正后的位置，表示拖拽内容的末尾位置
            const selectPos = insertPos + content.size - 1;
            // 将事务中的选区设置为拖拽内容的末尾位置，表示选中拖拽内容
            tr = tr.setSelection(TextSelection.create(tr.doc, selectPos));
            // 用分发方法，将事务应用到编辑器中，并滚动到视图中
            dispatch(tr.scrollIntoView());
          }
          return onDragComplete();
        },
        dragend() {
          return onDragComplete();
        },
      },
    },
  });
}
