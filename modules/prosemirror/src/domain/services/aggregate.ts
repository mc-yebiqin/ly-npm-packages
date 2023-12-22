import { StateCreator } from "zustand";

import { DocumentSlice } from "./index";

export interface AggregateSlice {
  destroyDocument: () => void;
}

export const createAggregateSlice: StateCreator<DocumentSlice, [], [], AggregateSlice> = (
  set,
  get
) => ({
  destroyDocument: () => {
    get().destroyCommonSlice();
    get().destroyEditorSlice();
  },
});
