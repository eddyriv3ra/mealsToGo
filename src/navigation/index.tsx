import * as React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { AuthenticationContext } from "../store/authentication/authenticationContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import UserStackNavigator from "./stackNav/AuthStack";
import FavouritesContext from "../store/favourites/favouritesContext";
import RestaurantState from "../store/restaurantStore/restaurantState";
import LocationState from "../store/locationStore/LocationState";

export default function Navigation() {
  const { user, isLoading } = React.useContext(AuthenticationContext);
  if (isLoading) {
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <ActivityIndicator animating={true} size={40} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <UserStackNavigator />}
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <FavouritesContext>
      <RestaurantState>
        <LocationState>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
            {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> */}
          </Stack.Navigator>
        </LocationState>
      </RestaurantState>
    </FavouritesContext>
  );
}
