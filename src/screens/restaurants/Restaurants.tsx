import React from "react";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantInfoCard from "../../components/restaurantInfoCard";
import { SearchbarContainer, CardContainer } from "./restaurants.styles";

const Restaurants = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <>
      <SafeAreaView>
        <SearchbarContainer>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </SearchbarContainer>
      </SafeAreaView>
      <CardContainer>
        <RestaurantInfoCard restaurant={{}} />
      </CardContainer>
    </>
  );
};

export default Restaurants;
