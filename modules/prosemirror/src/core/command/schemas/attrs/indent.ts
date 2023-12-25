import PMUtils from "laoye-prosemirror-utils";
import { Command, Transaction } from "prosemirror-state";

import { UICommand } from "../UICommand";
import { GroupSpecEnum } from "@ly/prosemirror";

/**
 * 限制 indent 最大等级的常量数值
 */
const MAX_INDENT_LEVEL = 2;

/**
 * 缩进值接收增加｜缩减事件的标识类型
 */
type EventType = "increase" | "decrease";

class IndentCommand extends UICommand {
  _event: EventType;

  constructor(data: EventType) {
    super();
    this._event = data;
  }

  execute: Command = (state, dispatch) => {
    if (dispatch) {
      const { doc, selection } = state;
      const { from, to } = selection;

      let tr = state.tr;
      PMUtils.findBlockBetween(doc, from, to, (node, pos) => {
        if (node.type.spec.group?.includes(GroupSpecEnum.BasicTextBlock)) {
          tr = this._updateCommand(tr, pos, node.attrs.indent);
        }
      });

      dispatch(tr.scrollIntoView());
      return true;
    }
    return false;
  };

  /** 更新缩进命令的内部处理函数 */
  _updateCommand = (tr: Transaction, pos: number, indent: number) => {
    // 判断是增加缩进还是减少缩进
    const isIncrease = this._event === "increase";

    // 获取要运行的具体命令函数
    const runCommand = isIncrease ? this._increaseCommand : this._decreaseCommand;

    // 执行命令函数
    return runCommand(tr, pos, indent);
  };

  /** 增加缩进的内部处理函数 */
  _increaseCommand = (tr: Transaction, pos: number, indent: number) => {
    // 如果当前缩进已经达到最大级别，直接返回原始事务
    if (indent >= MAX_INDENT_LEVEL) return tr;

    // 增加缩进级别并更新节点属性
    return tr.setNodeAttribute(pos, "indent", indent + 1);
  };

  /** 减少缩进的内部处理函数 */
  _decreaseCommand = (tr: Transaction, pos: number, indent: number) => {
    // 如果当前缩进已经为最小级别，直接返回原始事务
    if (indent <= 0) return tr;

    // 减少缩进级别并更新节点属性
    return tr.setNodeAttribute(pos, "indent", indent - 1);
  };
}

export const INDENT_COMMAND = {
  /** 增加缩减 */
  increase: new IndentCommand("increase"),
  /** 减少缩进 */
  decrease: new IndentCommand("decrease"),
};
