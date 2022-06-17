import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // Overrides color palette
  palette: {
    primary: {
      main: "#00a0b2",
      contrast: "#006471",
      contrastText: "#ffef62",
      linkColor: "#33eaff",
    },
  },

  // Overrides specific components
  components: {
    // outlinedInput
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: 12,
        },
      },
    },
    // inputLabel
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 12,
        },
      },
    },
  },
});

export default theme;
