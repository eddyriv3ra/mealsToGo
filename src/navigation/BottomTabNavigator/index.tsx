import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RestaurantsStack from "../stackNav/RestaurantsStackNav";
import MapStack from "../stackNav/MapStackNav";
import { Ionicons } from "@expo/vector-icons";
import SettingsStack from "../stackNav/SettingsStackNav";

interface TabIconType {
  [key: string]: "md-restaurant" | "md-map" | "md-settings";
}

const TAB_ICON: TabIconType = {
  MainScreen: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

const createScreenOptions = ({ route }: any) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }: { size: number; color: string }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
  };
};

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="MainScreen"
      screenOptions={createScreenOptions}
    >
      <BottomTab.Screen
        name="MainScreen"
        options={{
          headerShown: false,
        }}
        component={RestaurantsStack}
      />
      <BottomTab.Screen
        name="Map"
        component={MapStack}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsStack}
        options={{ headerShown: false }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
