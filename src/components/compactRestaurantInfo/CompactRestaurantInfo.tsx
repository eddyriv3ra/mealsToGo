import React from "react";
import { Platform } from "react-native";

import Text from "../Text";
import { RestaurantInfo } from "../../interfaces/Restaurants";
import {
  CompactWebview,
  CompactImage,
  Item,
} from "./CompactRestaurantInfo.styles";

const isAndroid = Platform.OS === "android";

interface CompactRestaurantInfoProps {
  restaurant: RestaurantInfo;
}

const CompactRestaurantInfo = ({ restaurant }: CompactRestaurantInfoProps) => {
  return (
    <Item>
      {isAndroid ? (
        <CompactWebview source={{ uri: restaurant.photos[0] }} />
      ) : (
        <CompactImage source={{ uri: restaurant.photos[0] }} />
      )}
      <Text variant="caption" numberOfLines={3}>
        {restaurant.name}
      </Text>
    </Item>
  );
};

export default CompactRestaurantInfo;
