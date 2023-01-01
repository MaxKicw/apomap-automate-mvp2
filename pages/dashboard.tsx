import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nConfig from "../next-i18next.config";
import type { FunctionComponent } from "react";
import { Button, Loader, Title } from "@mantine/core";

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useStore } from "../src/hooks/useStore";
import { useAuth } from "../src/hooks/useAuth";
import { withAuth } from "../src/hocs/withAuth";
import { GetServerSidePropsContext } from "next";
import { auth } from "../firebaseClient";

const Dashboard: FunctionComponent = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const store = useStore();
  const { signOut } = useAuth({ router });
  const user = auth.currentUser;

  const request = () => {
    fetch("http://localhost:3000/api/createTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Markus",
      }),
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center  bg-primary-500 bg-opacity-20">
      <Title>{t("dashboard.title", { businessName: user?.uid })}</Title>
      <Button className="mt-2" radius="xl" onClick={() => request()}>
        {t("dashboard.createTask")}
      </Button>
      <Button
        onClick={() => signOut("/")}
        variant="subtle"
        className="mt-2"
        radius="xl"
      >
        LogOut
      </Button>
    </div>
  );
};

export const getServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    const res = await serverSideTranslations(
      context.locale ?? "de",
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

export default Dashboard;
