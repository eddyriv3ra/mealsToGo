import React from "react";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantInfoCard from "../../components/restaurantInfoCard";
import Spacer from "../../components/spacer/Spacer";
import { SearchbarContainer, RestaurantList } from "./restaurants.style";

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
      <RestaurantList
        data={[
          { name: 1 },
          { name: 2 },
          { name: 3 },
          { name: 4 },
          { name: 5 },
          { name: 6 },
          { name: 7 },
          { name: 8 },
          { name: 9 },
          { name: 10 },
          { name: 11 },
          { name: 12 },
          { name: 13 },
          { name: 14 },
        ]}
        renderItem={() => (
          <Spacer location="bottom" size="large">
            <RestaurantInfoCard restaurant={{}} />
          </Spacer>
        )}
        keyExtractor={(item: any) => item.name}
      />
    </>
  );
};

export default Restaurants;
