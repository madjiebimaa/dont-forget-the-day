import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';

type DateState = {
  selectedDate: Dayjs;
};

type DateActions = {
  actions: {
    prevMonth: () => void;
    nextMonth: () => void;
  };
};

const initialState: DateState = {
  selectedDate: dayjs(),
};

const dateStore = create<DateState & DateActions>()((set) => ({
  ...initialState,
  actions: {
    prevMonth: () =>
      set((state) => {
        const year = state.selectedDate.year();
        const month = state.selectedDate.month();
        const date = state.selectedDate.date();

        return {
          selectedDate: dayjs(new Date(year, month - 1, date)),
        };
      }),
    nextMonth: () =>
      set((state) => {
        const year = state.selectedDate.year();
        const month = state.selectedDate.month();
        const date = state.selectedDate.date();

        return {
          selectedDate: dayjs(new Date(year, month + 1, date)),
        };
      }),
  },
}));

export const useSelectedDate = () => dateStore((state) => state.selectedDate);
export const useDateActions = () => dateStore((state) => state.actions);
