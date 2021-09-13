import React from "react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./config/theme";
import GoogleFonts from "./config/GoogleFonts";
import Navigation from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RestaurantState from "./src/store/restaurantStore/restaurantState";
import LocationState from "./src/store/locationStore/LocationState";
import FavouritesContext from "./src/store/favourites/favouritesContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <FavouritesContext>
        <RestaurantState>
          <LocationState>
            <ThemeProvider theme={theme}>
              <GoogleFonts>
                <Navigation />
              </GoogleFonts>
            </ThemeProvider>
          </LocationState>
        </RestaurantState>
      </FavouritesContext>
    </SafeAreaProvider>
  );
}
