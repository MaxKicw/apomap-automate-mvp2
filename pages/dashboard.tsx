import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nConfig from "../next-i18next.config";
import type { FunctionComponent } from "react";
import { Button, Loader, Title } from "@mantine/core";

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useStore } from "../src/hooks/useStore";

const Dashboard: FunctionComponent = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const store = useStore();

  // TODO:
  if (false) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center  bg-primary-500 bg-opacity-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center  bg-primary-500 bg-opacity-20">
      <Title>{t("dashboard.title", { businessName: "PLACEHOLDEr" })}</Title>
      <Button
        className="mt-2"
        radius="xl"
        onClick={() => store.showDialog({ type: "taskModal" })}
      >
        {t("dashboard.createTask")}
      </Button>
      <Button variant="subtle" className="mt-2" radius="xl">
        LogOut
      </Button>
    </div>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const res = await serverSideTranslations(locale, ["common"], nextI18nConfig, [
    "en",
    "de",
  ]);

  return {
    props: {
      ...res,
    },
  };
};

export default Dashboard;
