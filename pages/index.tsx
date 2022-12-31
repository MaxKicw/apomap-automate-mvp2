import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Text } from "@mantine/core";
import { useStore } from "../src/hooks/useStore";
import { useTranslation } from "next-i18next";
import nextI18nConfig from "../next-i18next.config";

export default function Home() {
  const store = useStore();
  //!!! always autoimports react-i18next instead of next-i18next
  const { t } = useTranslation();

  return (
    <div className="flex w-full h-full items-center justify-center">
      <Text>{store.number}</Text>
      <Button onClick={() => store.increase(1)}>
        {t("common.terms.increment")}
      </Button>
    </div>
  );
}

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
