import React, { useContext } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { FavouritesContext } from "../../store/favourites/favouritesContext";
import { RestaurantInfo } from "../../interfaces/Restaurants";

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 999;
`;

interface FavouriteProps {
  restaurant: RestaurantInfo;
}

const Favourite = ({ restaurant }: FavouriteProps) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);

  const isFavourite = favourites.find(
    (favourite) => favourite.placeId === restaurant.placeId
  );

  return (
    <FavouriteButton
      onPress={() =>
        !isFavourite
          ? addToFavourites(restaurant)
          : removeFromFavourites(restaurant)
      }
    >
      <AntDesign
        name={isFavourite ? "heart" : "hearto"}
        size={24}
        color={isFavourite ? "red" : "white"}
      />
    </FavouriteButton>
  );
};

export default Favourite;
