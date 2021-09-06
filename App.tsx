import React from "react";
import Restaurants from "./src/screens/restaurants";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./config/theme";
import GoogleFonts from "./config/GoogleFonts";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GoogleFonts>
        <Restaurants />
      </GoogleFonts>
    </ThemeProvider>
  );
}
