import React from "react";
import firebase from "firebase";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./config/theme";
import GoogleFonts from "./config/GoogleFonts";
import Navigation from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthenticationContext from "./src/store/authentication/authenticationContext";

const firebaseConfig = {
  apiKey: "AIzaSyDSZTELbF3behMQJNnbvgQmQpeZyT2xhLg",
  authDomain: "mealstogo-325816.firebaseapp.com",
  projectId: "mealstogo-325816",
  storageBucket: "mealstogo-325816.appspot.com",
  messagingSenderId: "93030243946",
  appId: "1:93030243946:web:f8aaae17c6516786c1f413",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthenticationContext>
        <ThemeProvider theme={theme}>
          <GoogleFonts>
            <Navigation />
          </GoogleFonts>
        </ThemeProvider>
      </AuthenticationContext>
    </SafeAreaProvider>
  );
}
