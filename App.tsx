import React from "react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./config/theme";
import GoogleFonts from "./config/GoogleFonts";
import Navigation from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RestaurantState from "./src/store/restaurantStore/restaurantState";

export default function App() {
  return (
    <SafeAreaProvider>
      <RestaurantState>
        <ThemeProvider theme={theme}>
          <GoogleFonts>
            <Navigation />
          </GoogleFonts>
        </ThemeProvider>
      </RestaurantState>
    </SafeAreaProvider>
  );
}
