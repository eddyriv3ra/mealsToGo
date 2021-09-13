import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Spacer from "../spacer";
import CompactRestaurantInfo from "../compactRestaurantInfo";
import Text from "../Text";
import { RestaurantInfo } from "../../interfaces/Restaurants";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RestaurantStackParamList } from "../../navigation/stackNav/RestaurantsStackNav";

const FavouritesWrapper = styled.View`
  padding: 10px;
`;

interface FavouritesBarProps {
  favourites: RestaurantInfo[];
}

type FavouritesScreenPropNavigation = StackNavigationProp<
  RestaurantStackParamList,
  "Restaurants"
>;

const FavouritesBar = ({ favourites }: FavouritesBarProps) => {
  const navigation = useNavigation<FavouritesScreenPropNavigation>();
  if (!favourites.length) {
    return null;
  }
  return (
    <FavouritesWrapper>
      <Spacer location="left" size="large">
        <Text variant="caption">Favourites</Text>
      </Spacer>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((restaurant: RestaurantInfo) => {
          const key = restaurant.name;
          return (
            <Spacer key={key} location="left" size="medium">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RestaurantDetail", {
                    restaurant,
                  })
                }
              >
                <CompactRestaurantInfo restaurant={restaurant} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavouritesWrapper>
  );
};

export default FavouritesBar;
