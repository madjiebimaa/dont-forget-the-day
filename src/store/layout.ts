import { create } from 'zustand';

type LayoutState = {
  openSidebar: boolean;
};

type LayoutActions = {
  actions: {
    toggleOpenSidebar: () => void;
  };
};

const initialState: LayoutState = {
  openSidebar: false,
};

const layoutStore = create<LayoutState & LayoutActions>()((set) => ({
  ...initialState,
  actions: {
    toggleOpenSidebar: () =>
      set((state) => ({ openSidebar: !state.openSidebar })),
  },
}));

export const useOpenSidebar = () => layoutStore((state) => state.openSidebar);
export const useLayoutActions = () => layoutStore((state) => state.actions);
