import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nConfig from "../next-i18next.config";
import { useEffect, useState } from "react";
import { Button, Loader, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useStore } from "../src/hooks/useStore";
import { useAuth } from "../src/hooks/useAuth";
import { withAuth } from "../src/hocs/withAuth";
import { GetServerSidePropsContext, NextPage } from "next";
import { db } from "../firebaseClient";
import { useCollection } from "react-firebase-hooks/firestore";

import { collection, query } from "firebase/firestore";
import { Task } from "../src/types/Task";
import TaskComponent from "../src/features/core/TaskComponent";

const Dashboard: NextPage = (props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const store = useStore();
  const [tasks, setTasks] = useState<Task[]>();
  const { signOut } = useAuth({ router });

  const [snapshot, loading] = useCollection(query(collection(db, "tasks")));

  useEffect(() => {
    snapshot && setTasks(snapshot?.docs.map((doc) => doc.data() as Task));
  }, [snapshot]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center  bg-primary-500 bg-opacity-20">
      <Title order={5} className="absolute  top-4 left-4">
        {t("dashboard.title", { businessName: store.user?.uid })}
      </Title>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[90%] lg:w-[30%]">
          {tasks?.map((task, index) => (
            <TaskComponent key={task.id} index={index} task={task} />
          ))}
        </div>
      )}
      <Button
        className="mt-2"
        radius="xl"
        onClick={() => store.showDialog({ type: "taskModal" })}
      >
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
