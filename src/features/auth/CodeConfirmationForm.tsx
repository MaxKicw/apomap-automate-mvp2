import type { FunctionComponent } from "react";
import { Button, Loader, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useStore } from "../../hooks/useStore";
import { useRouter } from "next/router";

export interface CodeConfirmationFormProps {
  close?: boolean;
}

export const CodeConfirmationForm: FunctionComponent<
  CodeConfirmationFormProps
> = ({ close = true }) => {
  const store = useStore();
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      code: "",
    },
  });

  const submit = async () => {
    if (!form.validate().hasErrors) {
      try {
        setLoading(true);

        router.replace("/auth/sign-in");
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
    <div className="w-[400px]">
      <Text className="mb-4">
        {t("codeConfirmation.title", { email: "PLACEHOLDER" })}
      </Text>
      <TextInput
        label={t("codeConfirmation.code.label")}
        placeholder={t("codeConfirmation.code.placeholder")}
        {...form.getInputProps("code")}
      />
      <div className="mt-2 flex w-full items-center justify-between py-2">
        {close ? (
          <Button
            onClick={() => store.closeDialog()}
            radius="xl"
            variant="outline"
          >
            {t("codeConfirmation.cancel")}
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
          {t("codeConfirmation.confirm")}
        </Button>
      </div>
    </div>
  );
};
