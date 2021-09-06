import React from "react";
import { View } from "react-native";
import {
  Address,
  Info,
  RestaurantCard,
  RestaurantCover,
  Title,
} from "./RestaurantInfoCard.style";

interface RestaurantInfoProps {
  restaurant: any;
}

const RestaurantInfoCard = ({ restaurant }: RestaurantInfoProps) => {
  const {
    name = "Some Restaurant",
    icon,
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily,
  } = restaurant;

  return (
    <View>
      <RestaurantCard elevation={5}>
        <RestaurantCover source={{ uri: photos[0] }} />
        <Info>
          <Title>{name}</Title>
          <Address>{address}</Address>
        </Info>
      </RestaurantCard>
    </View>
  );
};

export default RestaurantInfoCard;
