import type { FunctionComponent } from "react";
import { useStore } from "../../hooks/useStore";
import { DriverModal } from "./DriverModal/DriverModal";
import { SignInModal } from "./SignInModal/SignInModal";
import { SignUpModal } from "./SignUpModal/SignUpModal";
import TaskDetailsModal from "./TaskDetails/TaskDetailsModal";
import { TaskModal } from "./TaskModal/TaskModal";

export const DialogManager: FunctionComponent = () => {
  const store = useStore();
  switch (store.shownDialog.type) {
    case "signUpModal":
      return <SignUpModal />;
    case "signInModal":
      return <SignInModal />;
    case "taskModal":
      return <TaskModal />;
    case "driverModal":
      return <DriverModal />;
    case "taskDetails":
      return <TaskDetailsModal />;
    default:
      return <div></div>;
  }
};
