import { Button, Loader, Modal, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useStore } from "../../../hooks/useStore";

export const SignInModal: FunctionComponent = ({}) => {
  const store = useStore();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const submit = async () => {
    if (!form.validate().hasErrors) {
      setLoading(true);
      // TODO:
      setLoading(false);
    } else {
      console.log("error");
    }
  };

  return (
    <Modal
      centered
      overlayOpacity={0.5}
      opened={store.shownDialog.shown}
      onClose={() => store.closeDialog()}
      title={t("signInModal.title")}
    >
      <div>
        <TextInput
          label={t("signInModal.email.label")}
          placeholder={t("signInModal.email.placeholder")}
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label={t("signInModal.password.label")}
          placeholder={t("signInModal.password.placeholder")}
          {...form.getInputProps("password")}
        />
        <div className="mt-2 flex w-full items-center justify-between py-2">
          <Button
            onClick={() => store.closeDialog()}
            radius="xl"
            variant="outline"
          >
            {t("signInModal.cancel")}
          </Button>
          <Button
            leftIcon={
              loading ? <Loader variant="dots" color="white" scale="s" /> : null
            }
            onClick={submit}
            radius="xl"
          >
            {t("signInModal.confirm")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
