import create from "zustand";
import type { Store } from "../types/Store.js";

export const useStore = create<Store>()((set) => ({
  //Test
  number: 0,
  increase: (by) => set((state) => ({ number: state.number + by })),
  decrease: (by) => set((state) => ({ number: state.number - by })),
  //Dialog-Management
  shownDialog: { shown: false },
  closeDialog: () => set(() => ({ shownDialog: { shown: false } })),
  showDialog: ({ type, task, driver, taskDetails }) =>
    set(() => ({ shownDialog: { shown: true, type, task, driver, taskDetails } })),
  // User-Management
  user: null,
  setUser: (user) => set(() => ({ user: user })),
  // Color Scheme Management
  colorScheme: "light",
  setColorScheme: (colorScheme: string) =>
    set(() => ({ colorScheme: colorScheme })),
  // Toast Management
  toast: {
    show: false,
    toastType: "",
    message: ""
  },
  showToast: ({toastType, message}) => set(() => ({toast: {
    show: true,
    toastType: toastType,
    message: message
  }})),
}));
