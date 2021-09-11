import { RouteProp, NavigationProp } from "@react-navigation/native";
import React, { ReactElement } from "react";
import { enableScreens } from "react-native-screens";
import { Text } from "react-native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "react-native-screens/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import Restaurants from "../../screens/restaurants";
import { RestaurantInfo } from "../../interfaces/Restaurants";
import restaurantDetail from "../../screens/restaurantDetail";

export type RestaurantStackParamList = {
  Restaurants: undefined;
  RestaurantDetail: {
    restaurant: RestaurantInfo;
  };
};

export type TStackParamList = {
  Restaurants: ReactElement;
  RestaurantDetail: {
    restaurant: RestaurantInfo;
  };
};

type TDrawerParamList = {
  Restaurants: ReactElement;
  RestaurantDetail: ReactElement;
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
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <Stack.Screen name="Restaurants" component={Restaurants} />
      <Stack.Screen name="RestaurantDetail" component={restaurantDetail} />
    </Stack.Navigator>
  );
};

export default RestaurantsStack;
