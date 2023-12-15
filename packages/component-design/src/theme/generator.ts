/**
 * 将十六进制颜色值转换为RGB格式
 * @param {string} hex - 十六进制颜色值，格式为"#RRGGBB"
 * @returns {{r: number, g: number, b: number}} - 包含RGB颜色值的对象
 */
function hexToRgb(hex: string) {
  // 利用正则表达式提取RGB分量
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * 将RGB颜色值转换为十六进制格式
 * @param {{r: number, g: number, b: number}} rgb - 包含RGB颜色值的对象
 * @returns {string} - 十六进制颜色值，格式为"#RRGGBB"
 */
function rgbToHex(rgb: any) {
  return `#${((1 << 24) | (rgb.r << 16) | (rgb.g << 8) | rgb.b).toString(16).slice(1)}`;
}

/**
 * 插值计算两个颜色之间的颜色
 * @param {{r: number, g: number, b: number}} color1 - 第一个颜色
 * @param {{r: number, g: number, b: number}} color2 - 第二个颜色
 * @param {number} weight - 权重，范围在0到1之间
 * @returns {{r: number, g: number, b: number}} - 插值计算后的颜色
 */
function interpolateColor(color1: any, color2: any, weight: number) {
  return {
    r: Math.ceil(color1.r + (color2.r - color1.r) * weight),
    g: Math.ceil(color1.g + (color2.g - color1.g) * weight),
    b: Math.ceil(color1.b + (color2.b - color1.b) * weight),
  };
}

/**
 * 生成颜色深度对应的调色板
 * @param config - 配置对象
 * @param config.depths - 要生成的颜色深度数组
 * @param config.baseColor - 基准颜色，使用十六进制表示
 * @param config.baseWeight - 基准权重，默认值为0.6
 * @returns 生成的颜色深度对应的调色板对象
 */
export function generateColorPalette(config: {
  depths?: number[];
  baseColor: string;
  baseWeight?: number;
}): Record<number, string> {
  // 解构配置对象，提供默认值
  const {
    depths = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95],
    baseColor,
    baseWeight = 0.6,
  } = config;

  // 将传入的基准色转换为RGB格式
  const baseRGB = hexToRgb(baseColor);

  // 计算颜色步长
  const stepSize = 1 / 100;

  // 生成颜色板
  const colorPalette: Record<number, string> = {};
  depths.map((depth) => {
    // 计算当前步数的权重
    const weight = depth * stepSize;

    // 如果步数小于等于0.6，采用从白色插值到基准色
    // 如果步数大于0.6，采用从基准色插值到黑色
    let startColor, endColor, colorWeight;
    if (weight <= baseWeight) {
      startColor = { r: 255, g: 255, b: 255 };
      endColor = baseRGB;
      colorWeight = Math.floor((weight / baseWeight) * 100) / 100;
    } else {
      startColor = baseRGB;
      endColor = { r: 0, g: 0, b: 0 };
      colorWeight = Math.ceil(((weight - baseWeight) / (1 - baseWeight)) * 100) / 100;
    }

    // 插值计算得到最终颜色
    const depthColor = interpolateColor(startColor, endColor, colorWeight);

    // 将颜色转换为十六进制格式,并赋值给对应的深度
    colorPalette[depth] = rgbToHex(depthColor);
  });

  return colorPalette;
}
