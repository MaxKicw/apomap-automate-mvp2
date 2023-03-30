import { User } from "firebase/auth";
import { string } from "zod";
import type { DialogSource } from "./DialogSource";
import { Task } from "./Task";
import { Driver } from './Driver';
export interface Store {
  number: number;
  increase: (input: number) => void;
  decrease: (input: number) => void;
  shownDialog: DialogSource;
  closeDialog: () => void;
  showDialog: ({ type, task }: { type: string; task?: Task; driver?: Driver, taskDetails?: Task }) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  colorScheme: string;
  setColorScheme: (colorScheme: string) => void;
  toast: {
    show: boolean,
    toastType: string,
    message: string
  };
  showToast: ({toastType, message}:{toastType:string; message:string}) => void;
 
 
 
}
