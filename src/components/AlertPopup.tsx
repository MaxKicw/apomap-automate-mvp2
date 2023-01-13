import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";
import { useStore } from "../hooks/useStore";

type AlertPopupProps = {
  // title?: string;
  // message?: string;
  // color: string;
};

export default function AlertPopup({}: AlertPopupProps) {
  const store = useStore();

  const handleCloseToast = () => {
    // store.setShowToast(false);
  };

  setTimeout(() => {
    handleCloseToast();
  }, 1000);

  return (
    <Notification
      icon={<IconX size={18} />}
      color="red"
      onClose={() => {
        store.closeToast();
      }}
    >
      Toast Works Here
    </Notification>
  );
}

/*IconAlertCircle size={16} />*/
