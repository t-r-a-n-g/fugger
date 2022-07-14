const globalComponents = {
  // menuItem
  MuiMenuItem: {
    styleOverrides: {
      root: {
        marginLeft: "5px",
        marginRight: "5px",
        paddingLeft: "15px",
        "&:hover": {
          borderRadius: "10px",
        },
      },
    },
  },
  MuiInputLabel: {
    shrink: {
      color: "#fff",
    },
  },
};

const theme1 = {
  // Overrides color palette
  palette: {
    primary: {
      main: "#00a0b2",
      light: "#00a0b27b",
      thin: "#a0b234",
      contrast: "#006471",
      contrastText: "#ffef62",
      // tableText: "#00ab2ad",
      linkColor: "#33eaff",
    },
    background: {
      color: "#ab2adf",
      default: "#ececec",
    },

    table: {
      text: "#ffffb9",

      header: {
        backgroundColor: "#006471",
        fontColor: "#ffef62",
      },

      border: {
        thin: "#ababab",
        thick: "#2d2d2d",
      },
    },
  },
  // Overrides specific components
  components: globalComponents,
};

const theme2 = {
  // Overrides color palette
  palette: {
    primary: {
      main: "#b20000",
      light: "#b2007b",
      thin: "#b20034",
      contrast: "#710000",
      contrastText: "#ececec",
      linkColor: "#3369ff",
    },
    background: {
      color: "#b2000ad",
      default: "#ececec",
    },

    table: {
      accent: "#b200ad",

      header: {
        backgroundColor: "#b2000a",
        fontColor: "#ffffff",
      },

      border: {
        thin: "#bcbcbc",
        thick: "#000000",
      },
    },
  },

  // Overrides specific components
  components: {
    ...globalComponents,
  },
};

// Do NOT change name of themeDark, because it is used often in whole app!
const themeDark = {
  // Overrides color palette
  palette: {
    primary: {
      main: "#353535",
      light: "#2d2d2d",
      thin: "#3f3f3f",
      contrast: "#303030",
      contrastText: "#ffffb9",
      tableText: "#ffffad",
      linkColor: "#e49310",
    },
    text: {
      primary: "#ffffad",
      secondary: "#ffffad",
    },
    background: {
      color: "#272727",
      paper: "#404040",
      none: "#272727",
      default: "#272727",
    },
    contrastText: {
      main: "#ffffb9",
    },

    table: {
      text: "#ffffb9",

      header: {
        backgroundColor: "#2d2d2d",
      },

      border: {
        thin: "#2d2d2d",
        thick: "#ababab",
      },
    },
  },

  // Overrides specific components
  components: {
    // menuItem
    MuiMenuItem: {
      styleOverrides: {
        root: {
          marginLeft: "5px",
          marginRight: "5px",
          paddingLeft: "15px",
          "&:hover": {
            borderRadius: "10px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "outlined" &&
            ownerState.color === "primary" && {
              border: "#303030 1px solid",
            }),
        }),
      },
    },
  },
};
export { theme1, theme2, themeDark };
