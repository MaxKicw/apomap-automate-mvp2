import { MantineThemeOverride } from "@mantine/core";



export const apoTheme: MantineThemeOverride = {
  fontFamily: "monospace, sans-serif",
  colorScheme: "light",
  fontSizes: { xs: 12, sm: 16, md: 24, lg: 32 },
  colors: {
    blue: [
        "#E3F2FD",
        "#BBDEFB",
        "#90CAF9",
        "#64B5F6",
        "#42A5F5",
        "#2196F3",
        "#1E88E5",
        "#1976D2",
        "#0277BD",
        "#01579B",
    ],
    gray: [
        "#FAFAFA",
        "#F5F5F5",
        "#EEEEEE",
        "#E0E0E0",
        "#BDBDBD",
        "#9E9E9E",
        "#757575",
        "#616161",
        "#424242",
        "#212121",
    ],
    orange: [
        "#FFF3E0",
        "#FFE0B2",
        "#FFCC80",
        "#FFB74D",
        "#FFA726",
        "#FF9800",
        "#FB8C00",
        "#F57C00",
        "#EF6C00",
        "#E65100",
    ],
    dark: [
        "#fff", // responsible for text color in dark mode
        "#CFD8DC",
        "#B0BEC5",
        "#90A4AE",
        "#78909C",
        "#607D8B",
        "#546E7A",
        "#000",  // responsible for BG in dark mode
        "#37474F",
        "#263238",
    ],

  },
  primaryColor: 'blue',
  white: "#fff", // responsible for BG color in light mode
  black: "#000" // responsible for text color in light mode
};
