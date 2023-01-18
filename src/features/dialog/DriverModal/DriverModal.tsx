// @ts-nocheck
import { useState } from "react";
import {
  Accordion,
  Avatar,
  Box,
  Button,
  ColorPicker,
  Modal,
  MultiSelect,
  TextInput,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendarTime, IconClock, IconStatusChange } from "@tabler/icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useTranslation } from "next-i18next";
import type { FunctionComponent } from "react";
import { useMutation } from "react-query";
import { useStore } from "../../../hooks/useStore";
import callCreateDriver from "../../../mutations/Driver/callCreateDriver";
import callUpdateDriver from "../../../mutations/Driver/callUpdateDriver";
import { Segment } from "../../../analytics.ts/segmentAnalyticsLogger";
import { errorLogger } from "../../../../ErrorLogger/errorLogger";
dayjs.extend(utc);

export interface DriverModalProps {
  // TODO:
  driver?: any;
}
export const DriverModal: FunctionComponent<DriverModalProps> = ({}) => {
  const store = useStore();
  const { t } = useTranslation();
  const { isLoading, mutate: callCreate } = useMutation(callCreateDriver);
  const { isLoading: isUpdating, mutate: update } =
    useMutation(callUpdateDriver);

  const form = useForm({
    initialValues: {
      driverName: store.shownDialog.driver?.driverName ?? "",
      color: store.shownDialog.driver?.color ?? "",
      vehicles: store.shownDialog.driver?.vehicles ?? [],
    },
  });

  const vehicleTypes = [
    { value: "car", label: "Car" },
    { value: "bike", label: "Bike" },
    { value: "foot", label: "Foot" },
  ];

  console.log();

  const submit = async () => {
    callCreate(
      {
        driverName: form.values.driverName,
        color: form.values.color,
        vehicles: form.values.vehicles,
        employer: store.user?.uid,
      },
      {
        onSuccess: () => {
          Segment.track({
            anonymousId: store.user?.uid,
            type: "Track",
            event: "Create New Driver",
            properties: {
              origin: "Driver Modal",
            },
          });
          store.closeDialog();
        },
        onError: (err) => {
          errorLogger("Error while creating driver", err);
        },
      }
    );
  };

  const save = async () => {
    store.shownDialog.driver &&
      update(
        {
          id: store.shownDialog.driver.id,
          driverName: form.values.driverName,
          color: form.values.color,
          vehicles: form.values.vehicles,
        },
        {
          onSuccess: () => {
            Segment.track({
              anonymousId: "update-driver-info",
              type: "Track",
              event: "Update Driver",
              properties: {
                origin: "Driver Modal",
              },
            });
            store.closeDialog();
          },
          onError: (err) => {
            errorLogger("Error while updating driver", err);
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
        label={t("taskModal.driverName.label")}
        placeholder={t("taskModal.driverName.placeholder")}
        {...form.getInputProps("driverName")}
      />
      <MultiSelect
        data={vehicleTypes}
        {...form.getInputProps("vehicles")}
        label="Choose vehicle type"
        placeholder="You can select multiple options"
        clearButtonLabel="Clear selection"
        clearable
        mt={10}
      />
      <ColorPicker
        mt={14}
        size="sm"
        fullWidth
        {...form.getInputProps("color")}
      />

      <div className="mt-4 flex flex-row items-center justify-end">
        {store.shownDialog.driver ? (
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
