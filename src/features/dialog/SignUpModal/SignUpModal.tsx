import { Modal } from "@mantine/core";
import type { FunctionComponent } from "react";
import { useTranslation } from "next-i18next";
import { useStore } from "../../../hooks/useStore";
import { SignUpForm } from "../../auth/SignUpForm";

export const SignUpModal: FunctionComponent = ({}) => {
  const store = useStore();
  const { t } = useTranslation();

  return (
    <Modal
      centered
      overlayOpacity={0.5}
      opened={store.shownDialog.shown}
      onClose={() => store.closeDialog()}
      title={t("signUpModal.title")}
    >
      <SignUpForm />
    </Modal>
  );
};
