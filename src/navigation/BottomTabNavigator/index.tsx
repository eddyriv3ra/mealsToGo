import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RestaurantsStack from "../stackNav/RestaurantsStackNav";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TabIconType {
  [key: string]: "md-restaurant" | "md-map" | "md-settings";
}

const TAB_ICON: TabIconType = {
  Main: "md-restaurant",
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

const Settings = () => <Text>Setting</Text>;
const Map = () => <Text>Map</Text>;

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      screenOptions={createScreenOptions}
    >
      <BottomTab.Screen
        name="Main"
        options={{
          headerShown: false,
        }}
        component={RestaurantsStack}
      />
      <BottomTab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
