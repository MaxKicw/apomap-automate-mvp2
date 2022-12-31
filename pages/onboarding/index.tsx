import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nConfig from "../../next-i18next.config.js";
import type { FunctionComponent } from "react";
import type { GetServerSidePropsContext } from "next";

import { useTranslation } from "next-i18next";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router.js";
import { AuthLayout } from "../../src/features/auth/AuthLayout";
import { withAuth } from "../../src/hocs/withAuth";
import { useAuth } from "../../src/hooks/useAuth";

const Onboarding: FunctionComponent = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { deleteUser } = useAuth({ router });

  const form = useForm({
    initialValues: {
      businessName: "",
    },
  });

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
            onClick={() => deleteUser("/")}
            variant="light"
            className="mt-2"
            radius="xl"
          >
            {t("common.terms.back")}
          </Button>
          <Button className="mt-2" radius="xl">
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
