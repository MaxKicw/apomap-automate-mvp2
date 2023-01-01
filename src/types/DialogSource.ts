import { Task } from "./Task";

export interface DialogSource {
  shown: boolean;
  type?: string;
  task?: Task;
}
