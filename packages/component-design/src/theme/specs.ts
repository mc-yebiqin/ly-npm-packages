import { generateColorPalette } from "./generator";

export const defaultThemeSpecs = {
  color: {
    red: generateColorPalette({ baseColor: "#f5222d" }),
    green: generateColorPalette({ baseColor: "#52c41a" }),
    blue: generateColorPalette({ baseColor: "#1890ff" }),
    orange: generateColorPalette({ baseColor: "#faad14" }),
    yellow: generateColorPalette({ baseColor: "#fadb14" }),
    gray: generateColorPalette({ baseColor: "#bfbfbf" }),
  },
  padding: {
    small: "4px",
    medium: "8px",
    large: "12px",
  },
  radius: {
    small: "4px",
    medium: "8px",
    large: "12px",
  },
  gap: {
    small: "4px",
    medium: "8px",
    large: "12px",
  },
};
