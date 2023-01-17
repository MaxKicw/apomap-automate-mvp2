import { Task } from "./Task";
import { Driver } from "./Driver"

export interface DialogSource {
  shown: boolean;
  type?: string;
  task?: Task;
  driver?: Driver;
}
