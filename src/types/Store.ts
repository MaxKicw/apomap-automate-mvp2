import { User } from "firebase/auth";
import type { DialogSource } from "./DialogSource";
import { Task } from "./Task";
export interface Store {
  number: number;
  increase: (input: number) => void;
  decrease: (input: number) => void;
  shownDialog: DialogSource;
  closeDialog: () => void;
  showDialog: ({ type, task }: { type: string; task?: Task }) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}
