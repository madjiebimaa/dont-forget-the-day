import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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

const layoutStore = create<LayoutState & LayoutActions>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        toggleOpenSidebar: () =>
          set((state) => ({ openSidebar: !state.openSidebar })),
      },
    }),
    {
      name: 'layout-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        openSidebar: state.openSidebar,
      }),
    }
  )
);

export const useOpenSidebar = () => layoutStore((state) => state.openSidebar);
export const useLayoutActions = () => layoutStore((state) => state.actions);
