import React from "react";
import { View, Text, Image } from "react-native";
import { SvgXml } from "react-native-svg";
import star from "../../../assets/star";
import open from "../../../assets/open";
import {
  Address,
  Info,
  RestaurantCard,
  RestaurantCover,
  Title,
  Rating,
  Section,
  SectionEnd,
} from "./RestaurantInfoCard.style";
import Spacer from "../spacer/Spacer";

interface RestaurantInfoProps {
  restaurant: any;
}

const RestaurantInfoCard = ({ restaurant }: RestaurantInfoProps) => {
  const {
    name = "Some Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
  } = restaurant;

  const ratingArray = [...Array(Math.floor(rating)).keys()];

  return (
    <View>
      <RestaurantCard elevation={5}>
        <RestaurantCover source={{ uri: photos[0] }} />
        <Info>
          <Title>{name}</Title>
          <Section>
            <Rating>
              {ratingArray.map((rating) => (
                <SvgXml key={rating} xml={star} width={20} height={20} />
              ))}
            </Rating>
            <SectionEnd>
              {isClosedTemporarily && (
                <Text style={{ color: "red" }}>CLOSED TEMPORARILY</Text>
              )}
              <Spacer location="left" size="large" />
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
              <Spacer location="left" size="large" />
              <Image style={{ width: 15, height: 15 }} source={{ uri: icon }} />
            </SectionEnd>
          </Section>
          <Address>{address}</Address>
        </Info>
      </RestaurantCard>
    </View>
  );
};

export default RestaurantInfoCard;
