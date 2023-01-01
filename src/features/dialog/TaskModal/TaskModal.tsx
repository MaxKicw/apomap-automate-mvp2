import type { FunctionComponent } from "react";
import { useTranslation } from "next-i18next";
import { useStore } from "../../../hooks/useStore";
import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import createTask from "../../../mutations/createTask";
import updateTask from "../../../mutations/updateTask";

export interface TaskModalProps {
  // TODO:
  task?: any;
}
export const TaskModal: FunctionComponent<TaskModalProps> = ({}) => {
  const store = useStore();
  const { t } = useTranslation();
  const { isLoading, mutate } = useMutation(createTask);
  const { isLoading: isUpdating, mutate: update } = useMutation(updateTask);

  const form = useForm({
    initialValues: {
      customerName: store.shownDialog.task?.customerName ?? "",
      lon: store.shownDialog.task?.coords.lon.toString() ?? "",
      lat: store.shownDialog.task?.coords.lat.toString() ?? "",
    },
  });

  const submit = async () => {
    mutate(
      {
        customerName: form.values.customerName,
        lat: parseFloat(form.values.lat),
        lon: parseFloat(form.values.lon),
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
