import { Button, MediaQuery } from "@mantine/core";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";
import { useTranslation } from "next-i18next";
import { useMantineTheme } from "@mantine/core";
import { Segment } from "../../analytics.ts/segmentAnalyticsLogger";

export interface AuthLayoutProps {
  children: React.ReactElement;
}

export const AuthLayout: FunctionComponent<AuthLayoutProps> = ({
  children,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <div
      className="flex h-full w-full flex-row items-center justify-start"
      style={{ backgroundColor: theme.colors.blue[0] }}
    >
      <MediaQuery
        query="(min-width: 1024px)"
        styles={(theme) => ({
          backgroundColor: theme.white,
        })}
      >
        <div className="flex h-full w-full flex-col items-center justify-center p-4 lg:w-[40%]">
          <div className="rounded-lg p-4">{children}</div>
        </div>
      </MediaQuery>
      <div className="absolute top-8 right-8">
        <Button
          variant="light"
          radius="xl"
          onClick={() => {
            router.replace("/auth/sign-in");
            Segment.track({
              anonymousId: "sign-in-nav-btn",
              type: "Track",
              event: "NAVBAR: Sign-In Button Clicked",
            });
          }}
        >
          {t("common.terms.signIn")}
        </Button>
        <Button
          className="ml-4"
          radius="xl"
          onClick={() => {
            router.replace("/auth/sign-up");
            Segment.track({
              anonymousId: "sign-up-nav-btn",
              type: "Track",
              event: "NAVBAR: Sign-Up Button Clicked",
            });
          }}
        >
          {t("common.terms.signUp")}
        </Button>
      </div>
    </div>
  );
};
