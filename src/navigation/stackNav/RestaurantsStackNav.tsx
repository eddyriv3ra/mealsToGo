import { RouteProp, NavigationProp } from "@react-navigation/native";
import React, { ReactElement } from "react";
import { enableScreens } from "react-native-screens";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "react-native-screens/native-stack";

import Restaurants from "../../screens/restaurants";

type TStackParamList = {
  Restaurants: ReactElement;
};

type TDrawerParamList = {
  Main: undefined;
  Restaurants: ReactElement;
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
  route: TDrawerRouteProp<"Restaurants">;
  navigation: TDrawerNavProp<"Restaurants">;
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

const RestaurantsStack: React.FC<INativeStackNavigatorProps> = () => {
  return (
    <Stack.Navigator
      initialRouteName="Restaurants"
      screenOptions={{
        headerShown: false,
        screenOrientation: "portrait",
      }}
    >
      <Stack.Screen name="Restaurants" component={Restaurants} />
    </Stack.Navigator>
  );
};

export default RestaurantsStack;
