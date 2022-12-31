import type { FunctionComponent } from "react";
import { useTranslation } from "next-i18next";
import { useStore } from "../../../hooks/useStore";
import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export interface TaskModalProps {
  // TODO:
  task?: any;
}
export const TaskModal: FunctionComponent<TaskModalProps> = ({}) => {
  const store = useStore();
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      customerName: "",
      lon: "",
      lat: "",
    },
  });

  const submit = async () => {
    // TODO:
    store.closeDialog();
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
        {/* TODO: */}
        <Button loading={false} onClick={submit} radius="xl">
          {t("common.terms.confirm")}
        </Button>
      </div>
    </Modal>
  );
};