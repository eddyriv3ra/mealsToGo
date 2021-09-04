import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

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

  const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

  return (
    <View>
      <Card elevation={5} style={styles.card}>
        <Card.Cover style={styles.cover} source={{ uri: photos[0] }} />
        <Card.Title title={name} subtitle="Card Subtitle" />
      </Card>
    </View>
  );
};

export default RestaurantInfoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
  },
  cover: {
    padding: 16,
    backgroundColor: "white",
  },
});
