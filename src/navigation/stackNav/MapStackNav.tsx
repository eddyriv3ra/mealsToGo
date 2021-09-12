import { RouteProp, NavigationProp } from "@react-navigation/native";
import React, { ReactElement } from "react";
import { enableScreens } from "react-native-screens";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "react-native-screens/native-stack";
import Map from "../../screens/map";

export type MapStackParamList = {
  Map: undefined;
};

export type TStackParamList = {
  Map: ReactElement;
};

type TDrawerParamList = {
  Map: ReactElement;
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
  route: TDrawerRouteProp<"Map">;
  navigation: TDrawerNavProp<"Map">;
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

const MapStack: React.FC<INativeStackNavigatorProps> = () => {
  return (
    <Stack.Navigator
      initialRouteName="Map"
      screenOptions={{
        headerShown: false,
        screenOrientation: "portrait",
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};

export default MapStack;
