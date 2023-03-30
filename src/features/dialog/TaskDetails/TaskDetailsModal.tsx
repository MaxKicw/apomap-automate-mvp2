import { useState } from "react";
import {
  Drawer,
  Button,
  Group,
  TextInput,
  Box,
  Select,
  MultiSelect,
  Accordion,
  Radio,
  Textarea,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import {
  IconCalendarTime,
  IconClock,
  IconStatusChange,
  IconCalendar,
} from "@tabler/icons";
import { useTranslation } from "next-i18next";
import { useStore } from "../../../hooks/useStore";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import createTask from "../../../mutations/createTask";
import { scheduleTask } from "../../../actions/actions";
import updateTask from "../../../mutations/updateTask";
type Props = {};

export default function TaskDetailsModal({}: Props) {
  const store = useStore();
  const { t } = useTranslation();
  const { isLoading, mutate: create } = useMutation(createTask);
  const { mutate: schedule } = useMutation(scheduleTask);
  const { isLoading: isUpdating, mutate: update } = useMutation(updateTask);

  // #######################
  const form = useForm({
    initialValues: {
      customerName: store.shownDialog.task?.customerName ?? "",

      scheduleStatus: " ",
      autoTimeScheduled: "",
    },
  });

  const submit = async () => {
    create(
      {
        customerName: form.values.customerName,
        lat: parseFloat(form.values.lat),
        lon: parseFloat(form.values.lon),
      },
      {
        onSuccess: (data) => {
          form.values.scheduleStatus !== " "
            ? handleSchedule(
                data,
                form.values.scheduleStatus,
                dayjs(form.values.autoTimeScheduled).toISOString()
              )
            : Segment.track({
                anonymousId: "create-task-modal",
                type: "Track",
                event: "Create New Task",
                properties: {
                  origin: "Task Modal",
                },
              });
          store.closeDialog();
        },
        onError: (err) => {
          errorLogger("Error while creating task", err);
        },
      }
    );

    const handleSchedule = (id: string, status: string, time: string) => {
      schedule(
        {
          id,
          status,
          time,
        },
        {
          onSuccess: () => {
            Segment.track({
              anonymousId: "create-task-schedule",
              type: "Track",
              event: "Create New Schedule",
              properties: {
                origin: "Task Modal",
              },
            });
            store.closeDialog();
          },
          onError: (err) => {
            errorLogger("Error while scheduling task", err);
          },
        }
      );
    };
  };

  const save = async () => {
    store.shownDialog.task &&
      update(
        {
          id: store.shownDialog.task.id,
          customerName: form.values.customerName,
          coords: {
            lat: parseFloat(form.values.lat),
            lon: parseFloat(form.values.lon),
          },
        },
        {
          onSuccess: () => {
            Segment.track({
              anonymousId: "update-task-info",
              type: "Track",
              event: "Update Task",
              properties: {
                origin: "Task Modal",
              },
            });
            store.closeDialog();
          },
          onError: (err) => {
            errorLogger("Error while updating task", err);
          },
        }
      );
  };

  const tagsData = [
    { value: "btm", label: "BTM" },
    { value: "kuhl", label: "Kuhlware" },
    { value: "test", label: "Test" },
  ];

  const [textInputStyle, setTExtInputStyle] = useState("unstyled");
  // #######################
  return (
    <>
      <Drawer
        opened={store.shownDialog.shown}
        onClose={() => store.closeDialog()}
        title="Task Details"
        // transition="rotate-left"
        // transitionDuration={250}
        // transitionTimingFunction="ease"
        lockScroll
        padding="xl"
        size="54%"
        withOverlay={false}
        className="rounded-lg"
      >
        {/* Drawer content */}
        {/*  */}
        <Box className="flex flex-col justify-between items-center w-full">
          <TextInput
            // label={t("taskModal.customerName.label")}
            // placeholder={t("taskModal.customerName.placeholder")}
            {...form.getInputProps("customerName")}
            variant={textInputStyle}
            size="xl"
            className="w-full uppercase"
          />
          {/* <Box className="flex justify-between items-start w-full gap-4">
            <Box className="flex flex-col justify-center items-start w-[55%] gap-4">
              <TextInput
                label={t("Task Address")}
                placeholder={t("Musterstraße 13, 34654 Musterland")}
                {...form.getInputProps("task_address")}
                className="w-full"
              />

              <Box className="flex flex-row items-center justify-between gap-2">
                <TextInput
                  label={t("Email Address")}
                  placeholder={t("max-mustermann@email.de")}
                  {...form.getInputProps("customer_mail")}
                  className="w-full"
                />
                <DatePicker
                  label={t("Date")}
                  placeholder="Pick Date"
                  icon={<IconCalendar size={16} />}
                  {...form.getInputProps("task_date")}
                />
              </Box>
            </Box>
            <Box className="flex flex-col justify-center items-start w-[45%] gap-4">
              <Box className="flex flex-row items-center justify-between gap-2">
                <Select
                  data={[
                    { value: "delivery", label: "Delivery" },
                    { value: "pickup", label: "Pickup" },
                  ]}
                  label={t("Type")}
                  {...form.getInputProps("task_type")}
                />
                <MultiSelect
                  data={tagsData}
                  label="Tags"
                  placeholder="Choose tags"
                  {...form.getInputProps("task_tags")}
                />
              </Box>
              <Box className="flex flex-row items-center justify-between gap-6">
                <TextInput
                  className="w-[40%]"
                  label={t("Amount")}
                  placeholder={t("1267,99€")}
                  {...form.getInputProps("task_open_amount")}
                />
                <Radio.Group
                  name="priority"
                  label={t("Priority")}
                  withAsterisk
                  size="sm"
                  spacing="sm"
                  className="w-[60%]"
                  {...form.getInputProps("task_priority")}
                >
                  <Radio value="true" label="Yes" />
                  <Radio value="false" label="No" />
                </Radio.Group>
              </Box>
              <Box className="flex flex-row items-center justify-between gap-2">
                <TextInput
                  label={t("Phone")}
                  placeholder={t("014323456")}
                  {...form.getInputProps("customer_phone")}
                />
                <TextInput
                  label={t("Mobile")}
                  placeholder={t("+4914563745656")}
                  {...form.getInputProps("customer_mobile")}
                />
              </Box>
            </Box>
          </Box>
          <Textarea
            label={t("Note")}
            {...form.getInputProps("task_note")}
            placeholder="Important information about task"
            autosize
            minRows={4}
            className="w-full"
          />
          <Box sx={{ width: "100%", marginTop: "0.5rem" }}>
            <Accordion variant="contained">
              <Accordion.Item value="task-schedule">
                <Accordion.Control
                  icon={<IconCalendarTime size={20} color="#ccc" />}
                >
                  {t("Automatic Schedule?")}
                </Accordion.Control>
                <Accordion.Panel>
                  <TimeInput
                    label={t("Pick time")}
                    placeholder={t("Pick time")}
                    icon={<IconClock size={16} />}
                    {...form.getInputProps("autoTimeScheduled")}
                  />
                  <TextInput
                    label={t("New Status")}
                    placeholder={t("ready")}
                    icon={<IconStatusChange size={14} />}
                    {...form.getInputProps("scheduleStatus")}
                  />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Box> */}
        </Box>
        {/*  */}
      </Drawer>

      {/* <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Drawer</Button>
      </Group> */}
    </>
  );
}
