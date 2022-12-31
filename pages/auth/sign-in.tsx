import { type NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import nextI18nConfig from "../../next-i18next.config.js";
import { AuthLayout } from "../../src/features/auth/AuthLayout";
import { SignInForm } from "../../src/features/auth/SignInForm";

const SignIn: NextPage = () => {
  return (
    <AuthLayout>
      <SignInForm close={false} />
    </AuthLayout>
  );
};

export default SignIn;

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
