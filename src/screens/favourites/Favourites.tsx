import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { FavouritesContext } from "../../store/favourites/favouritesContext";
import { SafeAreaView } from "react-native-safe-area-context";

import Text from "../../components/Text";
import Spacer from "../../components/spacer";

import { RestaurantList } from "../restaurants/Restaurants.style";
import RestaurantInfoCard from "../../components/restaurantInfoCard";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { RestaurantStackParamList } from "../../navigation/stackNav/RestaurantsStackNav";

const NoFavouritesArea = styled(SafeAreaView)`
  align-items: center;
  justify-content: center;
`;

type FavouritesScreenPropNavigation = StackNavigationProp<
  RestaurantStackParamList,
  "Restaurants"
>;

const FavouritesScreen = () => {
  const navigation = useNavigation<FavouritesScreenPropNavigation>();
  const { favourites } = useContext(FavouritesContext);

  return favourites.length ? (
    <SafeAreaView>
      <RestaurantList
        data={favourites}
        renderItem={({ item }: any) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  restaurant: item,
                })
              }
            >
              <Spacer location="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item: any) => item.name}
      />
    </SafeAreaView>
  ) : (
    <NoFavouritesArea>
      <Text>No favourites yet</Text>
    </NoFavouritesArea>
  );
};

export default FavouritesScreen;
