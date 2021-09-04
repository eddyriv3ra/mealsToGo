import React from "react";
import Restaurants from "./src/screens/restaurants";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/utils/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Restaurants />
    </ThemeProvider>
  );
}
