import { createTheme, ThemeProvider } from "@mui/material";
import { amber, grey } from "@mui/material/colors";
import { createContext, useContext, useMemo, useState } from "react";

const colorModeContext = createContext();

export const ColorContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleMode = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  const colorMode = useMemo(
    () => ({
      toggleMode,
      mode,
    }),
    [mode]
  );

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            divider: amber[900],
            background: {
              default: amber[100],
              Paper: amber[300],
              selected: amber[200],
              hover: amber[300],
              navBg: amber[900],
            },
            text: {
              primary: "black",
              secondary: grey[900],
              active: 'green',
            },
          }
        : {
            divider: "rgba(255, 255, 255, 0.12)",
            background: {
              default: "#121212",
              Paper: "#121212",
              selected: "rgba(255, 255, 255, 0.16)",
              hover: 'rgba(255, 255, 255, 0.08)',
              navBg: '#121212',
            },
            text: {
              primary: "#fff",
              secondary: "rgba(255, 255, 255, 0.3)",
              active: 'green',
            },
          }),
    },
  });
  return (
    <colorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </colorModeContext.Provider>
  );
};

export const ColorContext = () => useContext(colorModeContext);
