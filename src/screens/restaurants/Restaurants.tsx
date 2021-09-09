import React, { useContext, useEffect } from "react";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantInfoCard from "../../components/restaurantInfoCard";
import Spacer from "../../components/spacer/Spacer";
import {
  restaurantsRequest,
  restaurantsTransform,
} from "../../services/restaurants/restaurantService";
import { ActionType, STATUS } from "../../store/restaurantStore/interface";
import restaurantContext from "../../store/restaurantStore/restaurantContext";
import {
  SearchbarContainer,
  RestaurantList,
  CenterContainer,
} from "./Restaurants.style";

const Restaurants = () => {
  const ctx = useContext(restaurantContext);
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query: string) => setSearchQuery(query);

  useEffect(() => {
    ctx?.dispatch({ type: ActionType.GET_RESTAURANTS_PENDING });
    const fetchRestaurants = () => {
      setTimeout(async () => {
        try {
          const data = await restaurantsRequest();
          const normalizeData = restaurantsTransform(data);

          ctx?.dispatch({
            type: ActionType.GET_RESTAURANTS_SUCCESS,
            data: normalizeData,
          });
        } catch (error) {
          ctx?.dispatch({
            type: ActionType.GET_RESTAURANTS_ERROR,
            error,
          });
        }
      }, 2000);
    };
    fetchRestaurants();
  }, []);

  return (
    <>
      <SafeAreaView edges={["top"]}>
        <SearchbarContainer>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </SearchbarContainer>
      </SafeAreaView>
      {ctx?.restaurants.status === (STATUS.PENDING || STATUS.ERROR) ? (
        <CenterContainer>
          <ActivityIndicator animating={true} size={40} />
        </CenterContainer>
      ) : (
        <RestaurantList
          data={ctx?.restaurants.data}
          renderItem={({ item }) => {
            return (
              <Spacer location="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            );
          }}
          keyExtractor={(item: any) => `${item.name}`}
        />
      )}
    </>
  );
};

export default Restaurants;
