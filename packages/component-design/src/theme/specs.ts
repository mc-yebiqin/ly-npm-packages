import { generateColorPalette } from "./generator";

export const defaultThemeSpecs = {
  color: {
    red: generateColorPalette({ baseColor: "#e61a1a" }),
    green: generateColorPalette({ baseColor: "#29d680" }),
    blue: generateColorPalette({ baseColor: "#0080ff" }),
    orange: generateColorPalette({ baseColor: "#f9a806" }),
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
