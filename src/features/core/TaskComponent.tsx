import { ActionIcon, Badge, CloseButton, Text, Tooltip } from "@mantine/core";
import { FunctionComponent } from "react";
import { useTranslation } from "next-i18next";
import { Task } from "../../types/Task";
import { motion } from "framer-motion";
import { useMutation } from "react-query";
import deleteTask from "../../mutations/deleteTask";
import { IconSettings } from "@tabler/icons";
import { useStore } from "../../hooks/useStore";
import { useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import { Segment } from "../../analytics.ts/segmentAnalyticsLogger";
export interface TaskComponentProps {
  task: Task;
  index: number;
}

const TaskComponent: FunctionComponent<TaskComponentProps> = ({
  task,
  index,
}) => {
  const { t } = useTranslation();
  const { isLoading, mutate } = useMutation(deleteTask);
  const store = useStore();
  const theme = useMantineTheme();
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.4 * (index + 0.5) }}
      className="w-full rounded-md p-2 flex shadow-sm items-center justify-between"
      style={{
        backgroundColor:
          store.colorScheme === "dark"
            ? theme.colors.gray[9]
            : theme.colors.gray[3],
        color: store.colorScheme === "dark" ? theme.white : theme.black,
      }}
    >
      <div className="flex justify-between items-center w-full">
        <div>
          <Text className="font-bold">{task.customerName}</Text>
          <div className="flex flex-row items-center">
            <Text c="dimmend" fz="xs">
              {dayjs(task.createdAt).format("DD.MM.YY / HH:mm")}
            </Text>
            {task.updatedAt && (
              <Text fz="xs" className="ml-2" c={theme.colors.orange[8]}>
                {`(${dayjs(task.updatedAt).format("DD.MMM")})`}
              </Text>
            )}
          </div>
        </div>
        <Badge
          sx={{ backgroundColor: theme.colors.blue[9], color: theme.white }}
        >
          {task.status}
        </Badge>
        <div className="flex">
          <ActionIcon
            onClick={() => {
              store.showDialog({ type: "taskModal", task });
              Segment.track({
                anonymousId: "update-task-info",
                type: "Track",
                event: "Update Task",
                properties: {
                  origin: "Settings Button on Task Component",
                },
              });
            }}
            className="mr-2"
            variant="default"
          >
            <IconSettings size={16} />
          </ActionIcon>
          <Tooltip label={t("common.terms.delete")}>
            <CloseButton
              loading={isLoading}
              onClick={() => {
                mutate({ id: task.id });
                Segment.track({
                  anonymousId: "delete-task",
                  type: "Track",
                  event: "Delete Task",
                  properties: {
                    origin: "Close Button on Task Component",
                  },
                });
              }}
            />
          </Tooltip>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskComponent;
