import { Command } from "prosemirror-state";
import { KeymapCommand } from "../shared";

/**
 * 检测当前操作系统是否为 macOS。
 */
const isMac = /Mac|iP(hone|[oa]d)/.test(window.navigator.platform);

/**
 * 将键盘事件中的 "Mod-" 替换为 "Meta-"（在 macOS 上）或 "Ctrl-"（在其他系统上）。
 * @param {string} key - 原始按键名称
 * @returns {string} - 替换后的按键名称
 */
export function replaceKey(key: string): string {
  return key.replace(/Mod-/g, isMac ? "Meta-" : "Ctrl-");
}

/**
 * 根据键盘事件的修饰键生成修饰后的按键名称。
 * @param {string} name - 原始按键名称
 * @param {KeyboardEvent} event - 键盘事件对象
 * @returns {string} - 修饰后的按键名称
 */
export function modifiersKeyboard(name: string, event: KeyboardEvent): string {
  if (event.altKey) name = "Alt-" + name;
  if (event.ctrlKey) name = "Ctrl-" + name;
  if (event.metaKey) name = "Meta-" + name;
  if (event.shiftKey) name = "Shift-" + name;
  return name;
}

/**
 * 注册键盘映射对象，将其中的按键名称进行替换。
 * @param {object} keymap - 原始键盘映射对象
 * @returns {object} - 替换后的键盘映射对象
 */
export function registerKeyboardShortcuts(keymap: KeymapCommand): {
  [key: string]: Command;
} {
  let copy: { [key: string]: Command } = Object.create(null);
  for (let key in keymap) {
    const revisedKey = replaceKey(key);
    copy[revisedKey] = keymap[key];
  }
  return copy;
}
