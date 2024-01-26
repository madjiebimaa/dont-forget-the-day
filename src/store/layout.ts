import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type LayoutState = {
  openSidebar: boolean;
  openCollapsible: boolean;
};

type LayoutActions = {
  actions: {
    toggleOpenSidebar: () => void;
    toggleOpenCollapsible: () => void;
  };
};

const initialState: LayoutState = {
  openSidebar: false,
  openCollapsible: false,
};

const layoutStore = create<LayoutState & LayoutActions>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        toggleOpenSidebar: () =>
          set((state) => ({ openSidebar: !state.openSidebar })),
        toggleOpenCollapsible: () =>
          set((state) => ({ openCollapsible: !state.openCollapsible })),
      },
    }),
    {
      name: 'layout-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        openSidebar: state.openSidebar,
        openCollapsible: state.openCollapsible,
      }),
    }
  )
);

export const useOpenSidebar = () => layoutStore((state) => state.openSidebar);
export const useOpenCollapsible = () =>
  layoutStore((state) => state.openCollapsible);
export const useLayoutActions = () => layoutStore((state) => state.actions);
