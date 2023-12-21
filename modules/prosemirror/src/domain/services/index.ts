import { create } from "zustand";

import { AggregateSlice, createAggregateSlice } from "./aggregate";
import { CommonSlice, createCommonSlice } from "./common";
import { createEditorSlice, EditorSlice } from "./editor";

export type DocumentSlice = EditorSlice & CommonSlice & AggregateSlice;

export const useDocumentDomain = create<DocumentSlice>((...args) => ({
  ...createCommonSlice(...args),
  ...createEditorSlice(...args),
  ...createAggregateSlice(...args),
}));

export const documentDomain = useDocumentDomain;
