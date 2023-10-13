import { StoreApi, UseBoundStore, create } from "zustand";

class Store<T> {
  private data: T;
  private useStore: UseBoundStore<StoreApi<T>>;

  constructor(data: T) {
    this.data = data;
    this.useStore = create<T>(() => data);
  }

  /** 访问 Store 中的 State 数据 */
  get state(): T {
    return this.useStore.getState();
  }

  use = <U>(callback: (state: T) => U) => {
    return this.useStore(callback);
  };

  /** 设置 Store 作用域中的 State 数据 */
  set = (data: Partial<T>) => {
    this.useStore.setState({ ...data });
  };

  /** 订阅监听某个数据的变化 */
  subscribe = <K extends keyof T>(key: K, callback: (value: T[K]) => void) => {
    this.useStore.subscribe((newState: T, oldState: T) => {
      if (newState[key] !== oldState[key]) callback?.(newState[key]);
    });
  };

  /** 销毁并重置当前 Store 的 State 数据 */
  destroy = () => {
    this.set(this.data);
  };
}

export default Store;
