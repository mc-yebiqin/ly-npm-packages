import { CalculatePositionProps } from "./typescript";

/**
 * 计算给定位置的元素在编辑器视图上的偏移量。
 * @param {number} props.pos - 要计算的位置。
 * @param {EditorView} props.view - 编辑器视图对象。
 * @param {HTMLElement} props.element - 弹窗组件的容器元素。
 * @param {"auto" | "left" | "center" | "right"} [props.align="auto"] - 容器对齐方式，默认为 "auto"。
 * @param {[number, number]} [props.offset=[0, 0]] - 相对偏移量，表示为 [水平偏移, 垂直偏移]，默认为 [0, 0]。
 * @returns {Promise<{ x: number, y: number }>} - 返回一个 Promise，包含计算得到的元素的偏移量 { x: number, y: number }。
 */
export const calculatePosition = async (
  props: CalculatePositionProps
): Promise<{ x: number; y: number }> => {
  const { pos, view, element, align = "auto", offset = [0, 24] } = props;

  // 只有位置存在时才进行处理
  if (pos) {
    // 获取容器和光标的坐标信息
    const nodeViewRect = view.dom.getBoundingClientRect();
    const { left: cursorX, top: cursorY } = view.coordsAtPos(pos);

    // 获取弹窗容器的宽高
    const elementWidth = element.clientWidth;
    const elementHeight = element.clientHeight;
    const elementCenter = elementWidth / 2;

    // 计算相对偏移量
    const tempOffsetX = cursorX - nodeViewRect.left;
    const tempOffsetY = cursorY - nodeViewRect.top;

    // 获取偏移结果
    let x = tempOffsetX;
    let y = tempOffsetY;

    switch (align) {
      case "auto":
        // 判断X轴右侧是否溢出，如果没有溢出则判断中间是否存在位置
        const safetyLeft = tempOffsetX - elementWidth >= 0;
        const safetyCenter =
          tempOffsetX - elementCenter >= 0 &&
          tempOffsetX + elementCenter <= nodeViewRect.width;
        const safetyRight = tempOffsetX + elementWidth <= nodeViewRect.width;

        /**
         * 根据可用空间选择合适的位置
         * 优先判断右侧展示是否超出视图，再判断居中展示是否超出视图，最后再判断左侧是否超出视图
         * 如果，三种布局方向都超出了视图，根据显示位置的偏移量所占容器的百分比使用印象相对较小的方向布局
         * 则使用影响较小的居中布局
         */
        if (safetyCenter) {
          x = tempOffsetX - elementCenter;
        } else if (safetyRight) {
          x = tempOffsetX;
        } else if (safetyLeft) {
          x = tempOffsetX - elementWidth;
        }

        // 判断Y轴是否溢出（根据视图的滚动位置和容器高度）
        const { scrollTop, clientHeight } = view.dom;
        const safetyTop = y - elementHeight - offset[1] <= scrollTop + clientHeight;
        const safetyBottom = y + elementHeight + offset[1] <= scrollTop + clientHeight;

        // 根据可用空间选择合适的位置
        if (safetyBottom) {
          y = tempOffsetY + offset[1];
        } else if (safetyTop) {
          y = tempOffsetY - elementHeight;
        }
        break;

      case "left":
        x = tempOffsetX;
        y = tempOffsetY - elementHeight;
        break;

      case "center":
        x = tempOffsetX - elementCenter;
        y = tempOffsetY - elementHeight;
        break;

      case "right":
        x = tempOffsetX - elementWidth;
        y = tempOffsetY - elementHeight;
        break;
    }

    // 返回一个 Promise，解析为包含修正后的偏移量的对象
    return Promise.resolve({ x, y });
  }

  // 如果位置不存在，返回一个拒绝的 Promise
  return Promise.reject(new Error("位置参数未提供"));
};
