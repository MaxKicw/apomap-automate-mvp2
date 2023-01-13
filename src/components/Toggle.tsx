import {
  Box,
  Center,
  Group,
  SegmentedControl,
  useMantineTheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons";
import { useStore } from "../hooks/useStore";
import { Segment } from "../analytics.ts/segmentAnalyticsLogger";

export function Toggle() {
  const store = useStore();
  const theme = useMantineTheme();
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const toggleColorScheme = (value: string) => {
    store.setColorScheme(value);
  };

  return (
    <Group position="center" my="xl">
      <SegmentedControl
        value={store.colorScheme}
        onChange={(value: "light" | "dark") => toggleColorScheme(value)}
        data={[
          {
            value: "light",
            label: (
              <Center
                onClick={() =>
                  Segment.track({
                    anonymousId: "light-mode-btn",
                    type: "Track",
                    event: "Light Mode Activated",
                    properties: {
                      origin: "Toggle Component",
                    },
                  })
                }
              >
                <IconSun size={16} stroke={1.5} />
                <Box ml={10}>Light</Box>
              </Center>
            ),
          },
          {
            value: "dark",
            label: (
              <Center
                onClick={() =>
                  Segment.track({
                    anonymousId: "dark-mode-btn",
                    type: "Track",
                    event: "Dark Mode Activated",
                    properties: {
                      origin: "Toggle Component",
                    },
                  })
                }
              >
                <IconMoon size={16} stroke={1.5} />
                <Box ml={10}>Dark</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
}
