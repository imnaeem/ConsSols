import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3a7af3",
      dark: "#2d66d2",
    },
    secondary: {
      main: "#ffc600",
      dark: "#edb803",
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  // typography: {
  //   button: {
  //     textTransform: "capitalize",
  //   },
  // },
});
