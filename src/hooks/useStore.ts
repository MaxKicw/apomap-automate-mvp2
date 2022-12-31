import create from "zustand";
import type { Store } from "../types/Store.js";

export const useStore = create<Store>()((set) => ({
  //Test
  number: 0,
  increase: (by) => set((state) => ({ number: state.number + by })),
  decrease: (by) => set((state) => ({ number: state.number - by })),
}));
