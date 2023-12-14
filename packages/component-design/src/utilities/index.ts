export function createNestedObject(base: any, path: string, value: any) {}

export function flattenTokens(themeSpec: any) {
  const themeVars: any = {};
  const themeToken: any = {};

  walkObject(themeSpec, (value, paths) => {
    if (value == null) return;
    const token = paths.join(".");

    const cssStyleVar = `--${token}`;
    const cssTokenVar = `var(${cssStyleVar})`;
  });

  return themeToken;
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

// -------------------------------------

export const extractCSSVars = (flatTokens: any) => {
  const themeTokens: any = {};
  const themeCSSVars: any = {};

  for (const token in flatTokens) {
    if (Object.prototype.hasOwnProperty.call(flatTokens, token)) {
      const value = flatTokens[token];
      const cssVar = `--${token}`;
      themeTokens[token] = `var(${cssVar})`;
      themeCSSVars[cssVar] = value;
    }
  }

  return { themeTokens, themeCSSVars };
};

// -------------------------------------
