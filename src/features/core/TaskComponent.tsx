import {
  ActionIcon,
  Badge,
  CloseButton,
  Text,
  Tooltip,
  Box,
  createStyles,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FunctionComponent } from "react";
import { useTranslation } from "next-i18next";
import { Task } from "../../types/Task";
import { motion } from "framer-motion";
import { useMutation } from "react-query";
import deleteTask from "../../mutations/deleteTask";
import { IconSettings, IconStatusChange } from "@tabler/icons";
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
  const [state, handlers] = useListState(task);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.4 * (index + 0.5) }}
      className="w-full rounded-md p-2 flex shadow-sm items-center justify-between h-24"
      // onClick={() => {
      //   store.showDialog({ type: "taskDetails", task });
      //   // Segment.track({
      //   //   anonymousId: "delete-task",
      //   //   type: "Track",
      //   //   event: "Delete Task",
      //   //   properties: {
      //   //     origin: "Close Button on Task Component",
      //   //   },
      //   // });
      // }}
      style={{
        backgroundColor:
          store.colorScheme === "dark"
            ? theme.colors.gray[9]
            : theme.colors.gray[3],
        color: store.colorScheme === "dark" ? theme.white : theme.black,
      }}
    >
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          handlers.reorder({ from: source.index, to: destination?.index || 0 })
        }
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full"
            >
              <Draggable key={task.id} index={index} draggableId={task.id}>
                {(provided, snapshot) => (
                  <Box
                    // className={cx(classes.item, {
                    //   [classes.itemDragging]: snapshot.isDragging,
                    // })}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="flex justify-between items-center w-full"
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "blueviolet",
                      }}
                    ></Box>
                    <Box className="flex flex-col justify-center items-start ml-6 gap-1 w-[60%]">
                      <Text size="xl">{task.customerName}</Text>
                      <Text color="dimmed" size="sm">
                        {task.task_address}
                      </Text>
                      <Badge size="sm">{task.task_status}</Badge>
                    </Box>
                    <Box className="flex justify-evenly items-center flex-1 gap-2">
                      <ActionIcon variant="transparent">
                        <IconStatusChange size={18} />
                      </ActionIcon>
                      <ActionIcon variant="transparent">
                        <IconStatusChange size={18} />
                      </ActionIcon>
                      <ActionIcon variant="transparent">
                        <IconStatusChange size={18} />
                      </ActionIcon>
                      <ActionIcon variant="transparent">
                        <IconStatusChange size={18} />
                      </ActionIcon>
                      <ActionIcon variant="transparent">
                        <IconStatusChange size={18} />
                      </ActionIcon>
                      <ActionIcon variant="transparent">
                        <IconStatusChange size={18} />
                      </ActionIcon>
                    </Box>
                  </Box>
                )}
              </Draggable>
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </motion.div>
  );
};
export default TaskComponent;

// const TaskComponent: FunctionComponent<TaskComponentProps> = ({
//   task,
//   index,
// }) => {
//   const { t } = useTranslation();
//   const { isLoading, mutate } = useMutation(deleteTask);
//   const store = useStore();
//   const theme = useMantineTheme();
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5, delay: 0.4 * (index + 0.5) }}
//       className="w-full rounded-md p-2 flex shadow-sm items-center justify-between"
//       // onClick={() => {
//       //   store.showDialog({ type: "taskDetails", task });
//       //   // Segment.track({
//       //   //   anonymousId: "delete-task",
//       //   //   type: "Track",
//       //   //   event: "Delete Task",
//       //   //   properties: {
//       //   //     origin: "Close Button on Task Component",
//       //   //   },
//       //   // });
//       // }}
//       style={{
//         backgroundColor:
//           store.colorScheme === "dark"
//             ? theme.colors.gray[9]
//             : theme.colors.gray[3],
//         color: store.colorScheme === "dark" ? theme.white : theme.black,
//       }}
//     >
//       <Box className="flex justify-between items-center w-full group">
//         <Box
//           onClick={() => {
//             store.showDialog({ type: "taskDetails", task });
//           }}
//           className="cursor-pointer"
//         >
//           <Text className="font-bold">{task.customerName}</Text>
//           <Box className="flex flex-row items-center">
//             <Text c="dimmend" fz="xs">
//               {dayjs(task.task_created).format("DD.MM.YY / HH:mm")}
//             </Text>
//             {task.updatedAt && (
//               <Text fz="xs" className="ml-2" c={theme.colors.orange[8]}>
//                 {`(${dayjs(task.updatedAt).format("DD.MMM")})`}
//               </Text>
//             )}
//           </Box>
//         </Box>
//         <Badge
//           sx={{ backgroundColor: theme.colors.blue[9], color: theme.white }}
//         >
//           {task.task_status}
//         </Badge>
//         <Box className="flex">
//           <ActionIcon
//             onClick={() => {
//               store.showDialog({ type: "taskModal", task });
//               Segment.track({
//                 anonymousId: "update-task-info",
//                 type: "Track",
//                 event: "Update Task",
//                 properties: {
//                   origin: "Settings Button on Task Component",
//                 },
//               });
//             }}
//             className="mr-2 visible group-hover:invisible"
//             variant="default"
//           >
//             <IconSettings size={16} />
//           </ActionIcon>
//           <Tooltip label={t("common.terms.delete")}>
//             <CloseButton
//               iconSize={24}
//               className="invisible group-hover:visible"
//               loading={isLoading}
//               onClick={() => {
//                 mutate({ id: task.id });
//                 Segment.track({
//                   anonymousId: "delete-task",
//                   type: "Track",
//                   event: "Delete Task",
//                   properties: {
//                     origin: "Close Button on Task Component",
//                   },
//                 });
//               }}
//             />
//           </Tooltip>
//         </Box>
//       </Box>
//     </motion.div>
//   );
// };

// export default TaskComponent;
