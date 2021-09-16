import { RouteProp, NavigationProp } from "@react-navigation/native";
import React, { ReactElement } from "react";
import { enableScreens } from "react-native-screens";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "react-native-screens/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import { RestaurantInfo } from "../../interfaces/Restaurants";
import SettingsScreen from "../../screens/settings/Settings";
import FavouritesScreen from "../../screens/favourites/Favourites";
import CameraScreen from "../../screens/camera";

export type SettingsStackParamList = {
  Settings: undefined;
  Favourites: undefined;
  Camera: undefined;
};

export type TStackParamList = {
  Settings: ReactElement;
  Favourites: {
    restaurant: RestaurantInfo;
  };
  Camera: ReactElement;
};

type TDrawerParamList = {
  Settings: ReactElement;
  Favourites: ReactElement;
  Camera: ReactElement;
};

type TDrawerRouteName = keyof TDrawerParamList;

export type TDrawerRouteProp<RouteName extends TDrawerRouteName> = RouteProp<
  TDrawerParamList,
  RouteName
>;

export type TDrawerNavProp<RouteName extends TDrawerRouteName> = NavigationProp<
  TDrawerParamList,
  RouteName
>;

interface INativeStackNavigatorProps {
  route: TDrawerRouteProp<"Settings">;
  navigation: TDrawerNavProp<"Settings">;
}

export type TStackRouteName = keyof TStackParamList;

export type TStackNavigationProp<RouteName extends TStackRouteName> =
  NativeStackNavigationProp<TStackParamList, RouteName>;

export type TStackRouteProp<RouteName extends TStackRouteName> = RouteProp<
  TStackParamList,
  RouteName
>;

enableScreens();
const Stack = createNativeStackNavigator<TStackParamList>();

const SettingsStack: React.FC<INativeStackNavigatorProps> = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
        screenOrientation: "portrait",
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
