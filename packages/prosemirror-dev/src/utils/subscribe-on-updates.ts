import { EditorState, Transaction } from "prosemirror-state";

import { ViewTool } from "../types";
import { toolsDomain } from "../domain";

type DestroyCallback = (id: number) => void;

type DispatchCallback = (
  id: number,
  tr: Transaction,
  oldState: EditorState,
  newState: EditorState
) => void;

type SubscribeViewProps = {
  view: ViewTool;
  destroyHandler: DestroyCallback;
  dispatchHandler: DispatchCallback;
};

/** 替换销毁函数 */
function replaceDestroyFn(view: ViewTool, destroyHandler: DestroyCallback) {
  // @ts-expect-error
  const maybeDestroy = view._props.destroy;
  const destroy = (maybeDestroy || view.destroy).bind(view);

  const handleDestroy = () => {
    destroy();
    destroyHandler(view.id);
  };

  if (maybeDestroy) {
    // @ts-expect-error
    view._props.destroy = handleDestroy;
  } else {
    view.destroy = handleDestroy;
  }
}

/** 替换更新函数 */
function replaceDispatchFn(view: ViewTool, dispatchHandler: DispatchCallback) {
  // @ts-expect-error
  const maybeDispatchTransaction = view._props.dispatchTransaction;
  const dispatch = (maybeDispatchTransaction || view.dispatch).bind(view);

  const handleDispatch = function (tr: Transaction) {
    const oldState = view.state;
    dispatch(tr);
    dispatchHandler(view.id, tr, view.state, oldState);
  };

  if (maybeDispatchTransaction) {
    // @ts-expect-error
    view._props.dispatchTransaction = handleDispatch;
  } else {
    view.dispatch = handleDispatch;
  }
}

export function subscribeOnHandler(props: SubscribeViewProps) {
  const { view, destroyHandler, dispatchHandler } = props;

  view.id = Date.now();
  toolsDomain.addView(view);
  replaceDestroyFn(view, destroyHandler);
  replaceDispatchFn(view, dispatchHandler);
}
