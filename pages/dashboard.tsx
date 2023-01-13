import { Button, Skeleton, Title } from "@mantine/core";
import { GetServerSidePropsContext, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Link from "next/link";
import nookies from "nookies";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebaseClient";
import nextI18nConfig from "../next-i18next.config";
import { withAuth } from "../src/hocs/withAuth";
import { useAuth } from "../src/hooks/useAuth";
import { useStore } from "../src/hooks/useStore";

import { collection, query, where } from "firebase/firestore";
import { firebaseAdmin } from "../firebaseServer";
import TaskComponent from "../src/features/core/TaskComponent";
import { Task } from "../src/types/Task";
import { Toggle } from "../src/components/Toggle";
import { Segment } from "../src/analytics.ts/segmentAnalyticsLogger";

const Dashboard: NextPage<{ uid: string }> = ({ uid }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const store = useStore();
  const [tasks, setTasks] = useState<Task[]>();
  const { signOut } = useAuth({ router });

  const [snapshot, loading] = useCollection(
    query(collection(db, "tasks"), where("owner", "==", uid))
  );

  useEffect(() => {
    snapshot && setTasks(snapshot?.docs.map((doc) => doc.data() as Task));
  }, [snapshot]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-between p-4 gap-8">
      <div className="flex justify-between items-center w-full">
        <Title order={5}>{t("dashboard.title", { businessName: uid })}</Title>
        <Toggle />
      </div>
      <div className="flex flex-col justify-start items-center w-full h-full">
        {loading ? (
          <div className="flex flex-col">
            <Skeleton height={70} width="100%" />
            <Skeleton height={70} width="100%" />
            <Skeleton height={70} width="100%" />
            <Skeleton height={70} width="100%" />
          </div>
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
          onClick={() => {
            store.showDialog({ type: "taskModal" });
            Segment.track({
              anonymousId: "create-task-btn",
              event: "Create Task Button Clicked",
            });
          }}
        >
          {t("dashboard.createTask")}
        </Button>
        <Button
          onClick={() => {
            signOut("/");
            Segment.track({
              anonymousId: "logout-btn",
              event: "User Logged Out",
            });
          }}
          variant="subtle"
          className="mt-2"
          radius="xl"
        >
          LogOut
        </Button>
        <Link href="/testPage">
          <Button
            onClick={() =>
              Segment.page({
                anonymousId: "test-page",
                type: "Page",
                properties: {
                  origin: "Dashboard: Test Page Button",
                  action: "Navigates to test page",
                },
              })
            }
            variant="subtle"
            className="mt-2"
            radius="xl"
          >
            Test Page
          </Button>
        </Link>
        {/* <Button
          onClick={() => {
            throw new Error("Error Button Clicked");
          }}
          variant="subtle"
          className="mt-2"
          radius="xl"
        >
          Error Button
        </Button> */}
      </div>
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
    try {
      const cookies = nookies.get(context);
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
      const { uid } = token;
      return {
        props: {
          ...res,
          uid,
        },
      };
    } catch (error) {
      return {
        props: {
          ...res,
        },
      };
    }
  }
);

export default Dashboard;
