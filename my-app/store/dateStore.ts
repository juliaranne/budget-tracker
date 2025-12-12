import { create } from "zustand";

interface DateState {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date) => void;
}

export const useDateStore = create<DateState>((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (date: Date) => set({ selectedDate: date }),
}));
