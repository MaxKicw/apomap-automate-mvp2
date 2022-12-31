import type { FunctionComponent } from "react";
import { Button, Loader, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useStore } from "../../hooks/useStore";
import { useRouter } from "next/router";

export interface SignInFormProps {
  close?: boolean;
}

export const SignInForm: FunctionComponent<SignInFormProps> = ({
  close = true,
}) => {
  const store = useStore();
  const { t } = useTranslation();
  const router = useRouter();
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
      try {
        setLoading(true);
        router.replace("/dashboard");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("error");
    }
  };

  return (
    <div className=" min-w-[400px] ">
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
        {close ? (
          <Button
            onClick={() => store.closeDialog()}
            radius="xl"
            variant="outline"
          >
            {t("signInModal.cancel")}
          </Button>
        ) : (
          <span />
        )}
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
  );
};
