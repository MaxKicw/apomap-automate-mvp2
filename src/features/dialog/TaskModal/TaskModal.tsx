import { Accordion, Box, Button, Modal, TextInput } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendarTime, IconClock, IconStatusChange } from "@tabler/icons";
import { useTranslation } from "next-i18next";
import type { FunctionComponent } from "react";
import { useMutation } from "react-query";
import { scheduleTask } from "../../../actions/actions";
import { useStore } from "../../../hooks/useStore";
import createTask from "../../../mutations/createTask";
import updateTask from "../../../mutations/updateTask";

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
      lon: store.shownDialog.task?.coords.lon.toString() ?? "",
      lat: store.shownDialog.task?.coords.lat.toString() ?? "",
      scheduleStatus: " ",
      autoTimeScheduled: "",
    },
  });

  const submit = async () => {
    let newStatus: string;

    if (form.values.scheduleStatus !== " ") {
      newStatus = form.values.scheduleStatus;

      create(
        {
          customerName: form.values.customerName,
          lat: parseFloat(form.values.lat),
          lon: parseFloat(form.values.lon),
        },
        {
          onSuccess: (data) => {
            handleSchedule(data);
          },
          onError: (err) => {
            console.error("Error while creating task", err);
          },
        }
      );
    } else {
      create(
        {
          customerName: form.values.customerName,
          lat: parseFloat(form.values.lat),
          lon: parseFloat(form.values.lon),
        },
        {
          onSuccess: () => {
            // Note: onSucess has data, variables and context properties
            store.closeDialog();
          },
          onError: (err) => {
            console.error("error", err);
          },
        }
      );
    }
    const handleSchedule = (ID: string) => {
      schedule(
        {
          id: ID,
          status: newStatus,
          time: form.values.autoTimeScheduled,
        },
        {
          onSuccess: () => {
            store.closeDialog();
          },
          onError: (err) => {
            console.error("Error while scheduling task", err);
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
            store.closeDialog();
          },
          onError: (err) => {
            console.error("error", err);
          },
        }
      );
  };

  return (
    <Modal
      centered
      overlayOpacity={0.5}
      opened={store.shownDialog.shown}
      onClose={() => store.closeDialog()}
      title={t("taskModal.title")}
    >
      <TextInput
        label={t("taskModal.customerName.label")}
        placeholder={t("taskModal.customerName.placeholder")}
        {...form.getInputProps("customerName")}
      />
      <div className="flex flex-row items-center justify-between">
        <TextInput
          label={t("taskModal.lon.label")}
          placeholder={t("taskModal.lon.placeholder")}
          {...form.getInputProps("lon")}
        />
        <TextInput
          label={t("taskModal.lat.label")}
          placeholder={t("taskModal.lat.placeholder")}
          {...form.getInputProps("lat")}
        />
      </div>
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
