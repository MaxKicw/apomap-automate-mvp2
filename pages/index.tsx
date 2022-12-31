import type { NextApiRequest } from "next";
import { type NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import nextI18nConfig from "../next-i18next.config";
import { motion } from "framer-motion";
import type { StaticImageData } from "next/image.js";
import Image from "next/image.js";
import { Button, Card, Space, Text, Title } from "@mantine/core";
import type { FunctionComponent } from "react";

import logo from "../public/img/logo.png";
import car from "../public/img/xiao_car.png";
import pos from "../public/img/kasse.png";
import system from "../public/img/abfrage.png";
import { useRouter } from "next/router";
import { useStore } from "../src/hooks/useStore";
import { CommandMenu } from "../src/features/cmdk/CommandMenu";

const FeatureCard: FunctionComponent<{
  title: string;
  subtitle: string;
  image?: StaticImageData;
}> = ({ image, title, subtitle }) => {
  const { t } = useTranslation("common");
  return (
    <Card shadow="sm" className="flex flex-col rounded-lg p-10">
      {image && <Image src={image} alt="apomap logo" width={90} />}
      <Title className="py-4  text-blue-gray-500" order={2}>
        {t(title)}
      </Title>
      <Text>{t(subtitle)}</Text>
    </Card>
  );
};

export const Header: FunctionComponent = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div className="item-center flex flex-row justify-between px-10 py-4">
      <div>
        <Image src={logo} alt="apomap logo" width={90} />
      </div>
      <div className="flex flex-row">
        {/* TODO: */}
        {false ? (
          <>
            <Button
              onClick={() => router.push("/auth/sign-in")}
              radius="xl"
              color="white"
              variant="outline"
            >
              {t("header.dashboard")}
            </Button>
            <Space w="sm" />
            <Button
              onClick={() => router.push("/auth/sign-up")}
              radius="xl"
              color="blue"
              variant="filled"
            >
              {t("common.terms.logOut")}
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => router.push("/auth/sign-in")}
              radius="xl"
              color="white"
              variant="outline"
            >
              {t("common.terms.signIn")}
            </Button>
            <Space w="sm" />
            <Button
              onClick={() => router.push("/auth/sign-up")}
              radius="xl"
              color="blue"
              variant="filled"
            >
              {t("common.terms.signUp")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export interface SignInBoxProps {
  auth?: any;
}

const Home: NextPage = () => {
  const { t } = useTranslation("common");
  const store = useStore();

  return (
    <div className="flex h-full w-full flex-col">
      <div className="z-2 h-full w-full  bg-primary-500 bg-opacity-20">
        <Header />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex w-full flex-col p-10"
        >
          <Title order={1} className=" text-blue-gray-500">
            {t("index.title")}
          </Title>
          <Text className=" text-blue-gray-500">{t("index.title")}</Text>
          <Text className=" text-blue-gray-500">{store.number}</Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex w-full flex-col p-10"
        >
          <div className="flex h-full w-full justify-center py-10 pb-20">
            <CommandMenu />
          </div>
        </motion.div>
      </div>
      <div className="flex w-full flex-col items-center p-10 ">
        <Title className=" font-bold text-blue-gray-500">
          {t("index.featureSection.title")}
        </Title>
        <div className="grid w-full grid-cols-1 gap-10 py-10 lg:grid-cols-3">
          <FeatureCard
            image={pos}
            title="index.connect.title"
            subtitle="index.connect.subtitle"
          />
          <FeatureCard
            image={system}
            title="index.define.title"
            subtitle="index.define.subtitle"
          />
          <FeatureCard
            image={car}
            title="index.automate.title"
            subtitle="index.automate.subtitle"
          />
        </div>
        <div className=" flex h-[250px] w-full items-center justify-center bg-blue-gray-500 text-white"></div>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async ({
  locale,
}: {
  locale: string;
  req: NextApiRequest;
}) => {
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
