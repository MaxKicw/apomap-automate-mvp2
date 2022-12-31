import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";
import { useTranslation } from "next-i18next";

export interface AuthLayoutProps {
  children: React.ReactElement;
}

export const AuthLayout: FunctionComponent<AuthLayoutProps> = ({
  children,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-row items-center justify-start  bg-primary-500 bg-opacity-20">
      <div className="flex h-full w-full flex-col items-center justify-center bg-primary-500 bg-opacity-20 p-4 lg:w-[40%] lg:bg-white lg:bg-opacity-100">
        <div className="rounded-lg bg-white p-4">{children}</div>
      </div>
      <div className="absolute top-8 right-8">
        <Button
          variant="light"
          radius="xl"
          onClick={() => router.replace("/auth/sign-in")}
        >
          {t("common.terms.signIn")}
        </Button>
        <Button
          className="ml-4"
          radius="xl"
          onClick={() => router.replace("/auth/sign-up")}
        >
          {t("common.terms.signUp")}
        </Button>
      </div>
    </div>
  );
};
