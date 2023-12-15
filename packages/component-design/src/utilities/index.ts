export function flattenTokens(themeSpec: any) {
  const themeTokens: any = {};

  const themeCSSVars = walkObject(themeSpec, (value, paths) => {
    if (value == null) return;

    const token = paths.join("-");

    const cssVar = `--${token}`;
    themeTokens[cssVar] = value;

    return `var(${cssVar})`;
  });

  return { themeTokens, themeCSSVars };
}

const isObject = (value: Record<string, any>) => {
  return typeof value === "object" && value != null && !Array.isArray(value);
};

type Predicate<R = any> = (value: any, path: string[]) => R;

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
