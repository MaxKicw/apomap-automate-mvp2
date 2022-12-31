import { FunctionComponent } from "react";
import { Button, Loader, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useStore } from "../../hooks/useStore";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";

export interface SignUpFormProps {
  close?: boolean;
}

export const SignUpForm: FunctionComponent<SignUpFormProps> = ({
  close = true,
}) => {
  const store = useStore();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth({});
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      passwordRepeat: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const submit = async () => {
    if (!form.validate().hasErrors) {
      setLoading(true);
      try {
        const user = await signUp({
          email: form.values.email,
          password: form.values.password,
        });
        console.log(user);
        router.replace(`/auth/confirm`);
      } catch (error) {
        alert("Error");
      } finally {
        setLoading(false);
      }
    } else {
      console.log("error");
    }
  };

  return (
    <div className="min-w-[400px]">
      <TextInput
        label={t("signUpModal.email.label")}
        placeholder={t("signUpModal.email.placeholder")}
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label={t("signUpModal.password.label")}
        placeholder={t("signUpModal.password.placeholder")}
        {...form.getInputProps("password")}
      />
      <PasswordInput
        label={t("signUpModal.passwordRepeat.label")}
        placeholder={t("signUpModal.passwordRepeat.placeholder")}
        {...form.getInputProps("passwordRepeat")}
      />
      <div className="mt-2 flex w-full items-center justify-between py-2">
        {close ? (
          <Button
            onClick={() => store.closeDialog()}
            radius="xl"
            variant="outline"
          >
            {t("signUpModal.cancel")}
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
          {t("signUpModal.confirm")}
        </Button>
      </div>
    </div>
  );
};
