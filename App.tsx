import React from "react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./config/theme";
import GoogleFonts from "./config/GoogleFonts";
import Navigation from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <GoogleFonts>
          <Navigation />
        </GoogleFonts>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
