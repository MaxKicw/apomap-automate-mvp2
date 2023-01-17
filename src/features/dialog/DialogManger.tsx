import type { FunctionComponent } from "react";
import { useStore } from "../../hooks/useStore";
import { DriverModal } from "./DriverModal/DriverModal";
import { SignInModal } from "./SignInModal/SignInModal";
import { SignUpModal } from "./SignUpModal/SignUpModal";
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
      return <SignInModal />;
    case "driverModal":
      return <DriverModal />;
    default:
      return <div></div>;
  }
};
