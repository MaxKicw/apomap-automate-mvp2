import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  CloseButton,
  Paper,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { IconSettings } from "@tabler/icons";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { FunctionComponent } from "react";
import { useMutation } from "react-query";
import { Segment } from "../../analytics.ts/segmentAnalyticsLogger";
import { useStore } from "../../hooks/useStore";
import callDeleteDriver from "../../mutations/Driver/callDeleteDriver";
import { Driver } from "../../types/Driver";

export interface DriverComponentProps {
  driver: Driver;
  initialSpacing: number;
}

const DriverComponent: FunctionComponent<DriverComponentProps> = ({
  driver,
  initialSpacing,
}) => {
  const { t } = useTranslation();
  const { isLoading, mutate } = useMutation(callDeleteDriver);
  const store = useStore();
  const theme = useMantineTheme();
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.4 * (initialSpacing + 0.5) }}
      className="w-full h-96 rounded-md shadow-sm"
      style={{
        backgroundColor:
          store.colorScheme === "dark"
            ? theme.colors.gray[9]
            : theme.colors.gray[3],
        color: store.colorScheme === "dark" ? theme.white : theme.black,
      }}
    >
      <Paper className="flex justify-between items-center rounded-md shadow-sm gap-4">
        <Avatar
          src="https://images.unsplash.com/photo-1673800830964-d096c3218405?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5MHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
          size={80}
        />
        <Box className="flex flex-col flex-1 justify-between items-center gap-4">
          <Text size="xl"> {driver.driverName} </Text>
          <Box className="flex justify-center items-center gap-4">
            <Text size="sm" className="uppercase">
              Vehicles:
            </Text>
            {driver.vehicles.map((vehicle, index) => (
              <Badge key={index} size="xs">
                {vehicle}
              </Badge>
            ))}
          </Box>
        </Box>
        <Box className="flex px-2">
          <ActionIcon
            onClick={() => {
              store.showDialog({ type: "driverModal", driver });
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
                mutate({ id: driver.id });
                Segment.track({
                  anonymousId: "delete-driver",
                  type: "Track",
                  event: "Delete Driver",
                  properties: {
                    origin: "Close Button on Driver Component",
                  },
                });
              }}
            />
          </Tooltip>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default DriverComponent;
