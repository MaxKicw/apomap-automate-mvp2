import { User } from "firebase/auth";
import type { DialogSource } from "./DialogSource";
export interface Store {
  number: number;
  increase: (input: number) => void;
  decrease: (input: number) => void;
  shownDialog: DialogSource;
  closeDialog: () => void;
  showDialog: ({ type }: { type: string }) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}
