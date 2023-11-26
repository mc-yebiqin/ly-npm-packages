// 将主题对象转化为CSS变量
export const convertToCssVars = (customTheme: any) => {
  const theme = customTheme;

  const flatTokens = flattenTokens(theme);
  console.log(
    "%c >>>>> flatTokens -6",
    "font-size:13px; background:pink; color:#000;",
    flatTokens
  );

  return theme;
};

// -------------------------------------
export function flattenTokens(theme: any) {
  const result: any = {};

  walkObject(theme, (value, path) => {
    if (value == null) return;
    result[path.join(".")] = value;
  });

  return result;
}
// -------------------------------------

const isObject = (value: Record<string, any>) => {
  return typeof value === "object" && value != null && !Array.isArray(value);
};

type Predicate<R = any> = (value: any, path: string[]) => R;

// 扁平化样式对象
export const walkObject = <T, K>(target: T, predicate: Predicate<K>) => {
  function inner(value: any, path: string[] = []): any {
    if (isObject(value) || Array.isArray(value)) {
      const result: Record<string, string> = {};
      for (const [key, child] of Object.entries(value)) {
        const childPath = [...path, key];
        result[key] = inner(child, childPath);
      }
      return result;
    }

    return predicate(value, path);
  }

  return inner(target);
};
