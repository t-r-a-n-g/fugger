const theme1 = {
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
};

const theme2 = {
  // Overrides color palette
  palette: {
    primary: {
      main: "#b20000",
      contrast: "#710000",
      contrastText: "#ffffff",
      linkColor: "#3369ff",
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
};

export { theme1, theme2 };
