import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nConfig from "../../../next-i18next.config.mjs";
import type { FunctionComponent } from "react";
import type { GetServerSidePropsContext } from "next";

import { withAuth } from "../../hocs/withAuth";
import { useTranslation } from "next-i18next";
import { Button, TextInput } from "@mantine/core";
import { AuthLayout } from "../../features/auth/AuthLayout";
import { useForm } from "@mantine/form";
import { trpc } from "../../utils/trpc";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router.js";

const Onboarding: FunctionComponent = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const createAccount = trpc.protected.createAccount.useMutation();
  const { deleteUser } = useAuth(router);

  const form = useForm({
    initialValues: {
      businessName: "",
    },
  });

  const submit = async () => {
    await createAccount.mutate({ businessName: form.values.businessName });
    router.replace("/dashboard");
  };

  return (
    <AuthLayout>
      <>
        <TextInput
          label={t("onboarding.businessName.label")}
          placeholder={t("onboarding.businessName.placeholder")}
          {...form.getInputProps("businessName")}
        />
        <div className="flex flex-row items-center justify-between">
          <Button
            onClick={deleteUser}
            variant="light"
            className="mt-2"
            radius="xl"
          >
            {t("common.terms.back")}
          </Button>
          <Button
            loading={createAccount.isLoading}
            onClick={submit}
            className="mt-2"
            radius="xl"
          >
            {t("common.terms.confirm")}
          </Button>
        </div>
      </>
    </AuthLayout>
  );
};

export const getServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    const res = await serverSideTranslations(
      context.locale!,
      ["common"],
      nextI18nConfig,
      ["en", "de"]
    );

    return {
      props: {
        ...res,
      },
    };
  }
);

export default Onboarding;
