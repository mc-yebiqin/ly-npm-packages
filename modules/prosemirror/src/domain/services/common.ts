import { StateCreator } from 'zustand';

interface CommonState {
  isEditable: boolean;
}

const initCommonState = (): CommonState => ({
  isEditable: true,
});

export interface CommonSlice extends CommonState {
  destroyCommonSlice: () => void;
}

export const createCommonSlice: StateCreator<CommonSlice> = (set) => ({
  ...initCommonState(),
  destroyCommonSlice: () => {
    set({ ...initCommonState() });
  },
});
