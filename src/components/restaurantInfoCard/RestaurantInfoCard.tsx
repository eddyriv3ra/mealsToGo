import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import star from "../../../assets/star";
import open from "../../../assets/open";
import {
  Address,
  Info,
  RestaurantCard,
  RestaurantCover,
  Rating,
  Section,
  SectionEnd,
  Icon,
} from "./RestaurantInfoCard.style";
import Spacer from "../spacer/Spacer";
import Text from "../Text/";
import Favourite from "../favourites";

interface RestaurantInfoProps {
  restaurant: any;
}

const RestaurantInfoCard = ({ restaurant }: RestaurantInfoProps) => {
  const {
    name,
    icon,
    photos,
    address,
    isOpenNow,
    placeId,
    rating = 4,
    isClosedTemporarily,
  } = restaurant;

  const ratingArray = [...Array(Math.floor(rating)).keys()];

  return (
    <>
      <RestaurantCard elevation={2}>
        <Favourite restaurant={restaurant} />
        <RestaurantCover key={name} source={{ uri: photos[0] }} />
        <Info>
          <Text variant="label">{name}</Text>
          <Section>
            <Rating>
              {ratingArray.map((_, i) => (
                <SvgXml
                  key={`star-${placeId}-${i}`}
                  xml={star}
                  width={20}
                  height={20}
                />
              ))}
            </Rating>
            <SectionEnd>
              {isClosedTemporarily && (
                <Text variant="error">CLOSED TEMPORARILY</Text>
              )}
              <Spacer location="left" size="large">
                {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
              </Spacer>
              <Spacer location="left" size="large">
                <Icon source={{ uri: icon }} />
              </Spacer>
            </SectionEnd>
          </Section>
          <Address>{address}</Address>
        </Info>
      </RestaurantCard>
    </>
  );
};

export default RestaurantInfoCard;
