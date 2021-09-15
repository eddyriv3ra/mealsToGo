import { RouteProp, NavigationProp } from "@react-navigation/native";
import React, { ReactElement } from "react";
import { enableScreens } from "react-native-screens";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "react-native-screens/native-stack";
import AccountScreen from "../../screens/Account";
import LoginScreen from "../../screens/Login";
import RegisterScreen from "../../screens/Register";

export type AuthStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
};

type TDrawerParamList = {
  Main: ReactElement;
  Login: ReactElement;
  Register: ReactElement;
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

export type TStackRouteName = keyof AuthStackParamList;

export type TStackNavigationProp<RouteName extends TStackRouteName> =
  NativeStackNavigationProp<AuthStackParamList, RouteName>;

export type TStackRouteProp<RouteName extends TStackRouteName> = RouteProp<
  AuthStackParamList,
  RouteName
>;

enableScreens();
const Stack = createNativeStackNavigator<AuthStackParamList>();

const UserStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Main"
    >
      <Stack.Screen name="Main" component={AccountScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default UserStackNavigator;
