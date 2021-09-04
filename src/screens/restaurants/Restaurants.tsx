import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantInfoCard from "../../components/restaurantInfoCard";

const Restaurants = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <>
      <SafeAreaView>
        <View style={styles.search}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
      </SafeAreaView>
      <View style={styles.list}>
        <RestaurantInfoCard restaurant={{}} />
      </View>
    </>
  );
};

export default Restaurants;

const styles = StyleSheet.create({
  search: { padding: 16 },
  list: { backgroundColor: "red", flex: 1, padding: 16 },
});
