import { MarkSpec, NodeSpec, Schema } from 'prosemirror-model';

/**
 * 组装自定义节点视图
 *
 * @param schema ProseMirror模式对象
 * @returns 自定义节点视图对象
 */
export const assembleNodeViews = ({ nodes, marks }: Schema): Record<string, any> => {
  const combinedSpecs: Record<string, NodeSpec | MarkSpec> = { ...nodes, ...marks };
  const customNodeViews: Record<string, any> = {};

  // 遍历所有节点和标记规范，提取自定义节点视图
  for (const key in combinedSpecs) {
    const spec = combinedSpecs[key];
    const { renderView } = spec.spec;

    // 如果存在自定义视图渲染函数，则添加到customNodeViews对象中
    if (renderView) customNodeViews[key] = renderView;
  }

  return customNodeViews;
};
