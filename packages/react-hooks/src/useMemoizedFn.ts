import { useMemo, useRef } from "react";

type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>;

export function useMemoizedFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn);

  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() => fn, [fn]);

  const memoizedFn = useRef<PickFunction<T>>();
  if (!memoizedFn.current) memoizedFn.current = (...args) => fnRef.current(...args);

  return memoizedFn.current as T;
}

export function useMemoizedData<T>(data: T) {
  const fnRef = useRef<T>(data);

  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() => data, [data]);

  const memoizedFn = useRef<PickFunction<any>>();
  if (!memoizedFn.current) memoizedFn.current = () => fnRef.current;

  return memoizedFn.current;
}
