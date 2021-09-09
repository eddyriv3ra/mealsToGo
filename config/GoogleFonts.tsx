import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import {
  useFonts as useLato,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";

interface GoogleFontsProps {
  children: React.ReactNode;
}

const GoogleFonts = ({ children }: GoogleFontsProps) => {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <ActivityIndicator animating={true} size={40} />
      </View>
    );
  }

  return <>{children}</>;
};

export default GoogleFonts;
