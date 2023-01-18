import {
  Box,
  Button,
  Image,
  Paper,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import {
  IconShoppingCart,
  IconHome2,
  IconRoute2,
  IconStar,
  IconFile,
  IconTrendingUp,
  IconBook,
  IconSettings,
  IconCalendar,
  IconCirclePlus,
} from "@tabler/icons";
import { DatePicker } from "@mantine/dates";
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
import { Driver } from "../src/types/Driver";
import { Toggle } from "../src/components/Toggle";
import { Segment } from "../src/analytics.ts/segmentAnalyticsLogger";
import DriverComponent from "../src/features/core/DriverComponent";

const Dashboard: NextPage<{ uid: string }> = ({ uid }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const store = useStore();
  const [tasks, setTasks] = useState<Task[]>();
  const { signOut } = useAuth({ router });
  const [drivers, setDrivers] = useState<Driver[]>();

  const [driverSnapshot, driverLoading] = useCollection(
    query(collection(db, "drivers"), where("employer", "==", uid))
  );
  const [tasksSnapshot, tasksLoading] = useCollection(
    query(collection(db, "tasks"), where("owner", "==", uid))
  );

  useEffect(() => {
    driverSnapshot &&
      setDrivers(driverSnapshot?.docs.map((doc) => doc.data() as Driver));
    tasksSnapshot &&
      setTasks(tasksSnapshot?.docs.map((doc) => doc.data() as Task));
  }, [driverSnapshot, tasksSnapshot]);

  return (
    <Box className="flex justify-between items-center h-screen w-screen p-2 gap-4 overflow-hidden">
      {/* Side Bar */}
      <Paper
        withBorder
        radius="md"
        shadow="md"
        className="flex flex-col justify-between items-center p-4 gap-4 h-full w-[8%] overflow-hidden"
      >
        <Image fit="cover" src="/img/logo.png" alt="apomap logo" />
        <Box className="flex flex-col justify-between items-center gap-4 my-4 p-2">
          <Box className="flex flex-col justify-center items-center p-2 cursor-pointer w-full hover:bg-sky-700">
            <IconShoppingCart />
            <Text size={12} className="capitalize text-center">
              Jetzt Upgraden
            </Text>
          </Box>
          <Box className="flex flex-col justify-center items-center p-2 cursor-pointer w-full hover:bg-sky-700">
            <IconHome2 />
            <Text size={12} className="capitalize text-center">
              Home
            </Text>
          </Box>
          <Box className="flex flex-col justify-center items-center p-2 cursor-pointer w-full hover:bg-sky-700">
            <IconRoute2 />
            <Text size={12} className="capitalize text-center">
              Touren Planung
            </Text>
          </Box>
          <Box className="flex flex-col justify-center items-center p-2 cursor-pointer w-full hover:bg-sky-700">
            <IconStar />
            <Text size={12} className="capitalize text-center">
              Favoriten
            </Text>
          </Box>
          <Box className="flex flex-col justify-center items-center p-2 cursor-pointer w-full hover:bg-sky-700">
            <IconFile />
            <Text size={12} className="capitalize text-center">
              Dokumentation
            </Text>
          </Box>
          <Box className="flex flex-col justify-center items-center p-2 cursor-pointer w-full hover:bg-sky-700">
            <IconTrendingUp />
            <Text size={12} className="capitalize text-center">
              Statistiken
            </Text>
          </Box>
          <Box className="flex flex-col justify-center items-center p-2 cursor-pointer w-full hover:bg-sky-700">
            <IconBook />
            <Text size={12} className="capitalize text-center">
              Handbuch
            </Text>
          </Box>
        </Box>
        <Box className="cursor-pointer">
          <IconSettings />
        </Box>
      </Paper>
      {/* Main Window */}
      <Box className="flex flex-col justify-between items-start h-full w-[92%] gap-4">
        {/* Top Bar */}
        <Paper
          withBorder
          radius="md"
          shadow="md"
          className="flex justify-between items-center w-full h-[8%] p-4"
        >
          <Title order={5}>{t("dashboard.title", { businessName: uid })}</Title>
          <Box className="flex justify-between items-center gap-4">
            <Button
              onClick={() => {
                signOut("/");
                Segment.track({
                  anonymousId: "logout-btn",
                  event: "User Logged Out",
                });
              }}
              variant="subtle"
              radius="xl"
            >
              LogOut
            </Button>
            <Toggle />
          </Box>
        </Paper>
        {/* Main Section */}
        <Box className="flex justify-between items-start w-full h-[92%] gap-4 p-4 ">
          {/* Tasks Block */}
          <Box className="flex flex-col justify-start items-start gap-4 h-full w-1/2 overflow-hidden">
            {/* Taskbar */}
            <Paper
              withBorder
              radius="md"
              shadow="xs"
              className="flex justify-evenly items-center gap-4 p-2 w-full h-[15%] overflow-hidden rounded-md "
            >
              <Box className="flex flex-col justify-start items-start w-[40%] gap-2 py-4">
                <Text transform="uppercase" size={24} weight="900">
                  Aufträge
                </Text>
                <DatePicker
                  placeholder="Pick a Date"
                  icon={<IconCalendar size={16} />}
                />
              </Box>
              <Box className="flex justify-end items-center gap-4 w-[60%]">
                <Button
                  leftIcon={<IconCirclePlus />}
                  radius="lg"
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
                  radius="lg"
                  variant="light"
                  onClick={() => {
                    store.showDialog({ type: "driverModal" });
                    Segment.track({
                      anonymousId: "create-driver-btn",
                      event: "Add Driver Button Clicked",
                    });
                  }}
                >
                  {t("Add Driver")}
                </Button>
              </Box>
            </Paper>
            {/* Tasks Table */}
            <Paper
              radius="md"
              shadow="md"
              className="flex flex-col justify-start items-start gap-2 w-full h-[75%] p-4 rounded-md overflow-auto scrollbar-hide "
            >
              {tasksLoading ? (
                <Skeleton height={70} width="100%" />
              ) : (
                tasks?.map((task, index) => (
                  <TaskComponent key={task.id} index={index} task={task} />
                ))
              )}
            </Paper>
            <Box className="flex justify-center items-center w-full h-[10%] ">
              <Button fullWidth compact size="xl" radius="md">
                Plan Tour
              </Button>
            </Box>
          </Box>
          {/* Map and Tour Block */}
          <Box className="flex flex-col justify-start items-start gap-4 h-full w-1/2 overflow-hidden">
            {/* Map */}
            <Box className="w-full h-3/5 overflow-hidden rounded-md">
              <Image
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1hcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="map"
                fit="cover"
                height="500px"
              />
            </Box>
            {/* Tour Table */}
            <Box className="flex flex-col justify-start items-start gap-4 w-full h-2/5 rounded-md">
              {driverLoading ? (
                <Skeleton height={70} width="100%" />
              ) : (
                drivers?.map((driver) => (
                  <DriverComponent
                    key={driver.id}
                    driver={driver}
                    initialSpacing={0}
                  />
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
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
