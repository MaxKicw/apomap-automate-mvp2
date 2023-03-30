import { useState } from "react";
import {
  Accordion,
  Box,
  Button,
  Modal,
  TextInput,
  Textarea,
  Radio,
  Select,
  SegmentedControl,
  MultiSelect,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
  IconCalendarTime,
  IconClock,
  IconStatusChange,
  IconCalendar,
} from "@tabler/icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useTranslation } from "next-i18next";
import type { FunctionComponent } from "react";
import { useMutation } from "react-query";
import { scheduleTask } from "../../../actions/actions";
import { useStore } from "../../../hooks/useStore";
import createTask from "../../../mutations/createTask";
import updateTask from "../../../mutations/updateTask";
import { Segment } from "../../../analytics.ts/segmentAnalyticsLogger";
import { errorLogger } from "../../../../ErrorLogger/errorLogger";
dayjs.extend(utc);

export interface TaskModalProps {
  // TODO:
  task?: any;
}
export const TaskModal: FunctionComponent<TaskModalProps> = ({}) => {
  const store = useStore();
  const { t } = useTranslation();
  const { isLoading, mutate: create } = useMutation(createTask);
  const { mutate: schedule } = useMutation(scheduleTask);
  const { isLoading: isUpdating, mutate: update } = useMutation(updateTask);

  const form = useForm({
    initialValues: {
      customerName: store.shownDialog.task?.customerName ?? "",
      customer_mail: store.shownDialog.task?.customer_mail ?? "",
      customer_mobile: store.shownDialog.task?.customer_mobile ?? "",
      customer_phone: store.shownDialog.task?.customer_phone ?? "",
      task_address: store.shownDialog.task?.task_address ?? "",
      task_date: store.shownDialog.task?.task_date ?? "",
      task_note: store.shownDialog.task?.task_note ?? "",
      task_open_amount: store.shownDialog.task?.task_open_amount ?? "",
      task_priority: store.shownDialog.task?.task_priority ?? "",
      task_tags: store.shownDialog.task?.task_tags ?? [],
      task_type: store.shownDialog.task?.task_type ?? "delivery",
      scheduleStatus: " ",
      autoTimeScheduled: "",
    },
  });

  const submit = async () => {
    create(
      {
        customerName: form.values.customerName,
        customer_mail: form.values.customer_mail,
        customer_mobile: form.values.customer_mobile,
        customer_phone: form.values.customerName,
        task_address: form.values.task_address,
        task_date: form.values.task_date,
        task_note: form.values.task_note,
        task_open_amount: form.values.task_open_amount,
        task_priority: form.values.task_priority,
        task_tags: form.values.task_tags,
        task_type: form.values.task_type,
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
          customer_mail: form.values.customer_mail,
          customer_mobile: form.values.customer_mobile,
          customer_phone: form.values.customerName,
          task_address: form.values.task_address,
          task_date: form.values.task_date,
          task_note: form.values.task_note,
          task_open_amount: form.values.task_open_amount,
          task_priority: form.values.task_priority,
          task_tags: form.values.task_tags,
          task_type: form.values.task_type,
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

  return (
    <Modal
      centered
      size="50%"
      overlayOpacity={0.5}
      opened={store.shownDialog.shown}
      onClose={() => store.closeDialog()}
      title={t("taskModal.title")}
    >
      <Box className="flex flex-col justify-between items-center w-full">
        <Box className="flex justify-between items-start w-full gap-4">
          <Box className="flex flex-col justify-center items-start w-[55%] gap-4">
            <TextInput
              label={t("taskModal.customerName.label")}
              placeholder={t("taskModal.customerName.placeholder")}
              {...form.getInputProps("customerName")}
              className="w-full"
            />
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
        </Box>
      </Box>
      <div className="mt-4 flex flex-row items-center justify-end">
        {store.shownDialog.task ? (
          <Button
            disabled={!form.isTouched()}
            loading={isUpdating}
            onClick={save}
            radius="xl"
          >
            {t("common.terms.save")}
          </Button>
        ) : (
          <Button loading={isLoading} onClick={submit} radius="xl">
            {t("common.terms.confirm")}
          </Button>
        )}
      </div>
    </Modal>
  );
};
