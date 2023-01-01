import { ActionIcon, CloseButton, Text, Tooltip } from "@mantine/core";
import { FunctionComponent } from "react";
import { useTranslation } from "next-i18next";
import { Task } from "../../types/Task";
import { motion } from "framer-motion";
import { useMutation } from "react-query";
import deleteTask from "../../mutations/deleteTask";
import { IconSettings } from "@tabler/icons";
import { useStore } from "../../hooks/useStore";
import dayjs from "dayjs";

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
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.4 * (index + 0.5) }}
      className="w-full my-2 rounded-md  p-4 flex flex-ro bg-white shadow-sm items-center justify-between"
    >
      <div>
        <Text className="font-bold">{task.customerName}</Text>
        <div className="flex flex-row items-center">
          <Text c="dimmend" fz="xs">
            {dayjs(task.createdAt).format("DD.MM.YY / HH:mm")}
          </Text>
          {task.updatedAt && (
            <Text fz="xs" className=" text-primary-500 ml-2">
              {`(${dayjs(task.updatedAt).format("DD.MMM")})`}
            </Text>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center">
        <ActionIcon
          onClick={() => store.showDialog({ type: "taskModal", task })}
          className="mr-2"
          variant="default"
        >
          <IconSettings size={16} />{" "}
        </ActionIcon>
        <Tooltip label={t("common.terms.delete")}>
          <CloseButton
            loading={isLoading}
            onClick={() => mutate({ id: task.id })}
          />
        </Tooltip>
      </div>
    </motion.div>
  );
};

export default TaskComponent;
