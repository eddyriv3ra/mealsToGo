import React, { useContext, useEffect } from "react";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantInfoCard from "../../components/restaurantInfoCard";
import Spacer from "../../components/spacer/Spacer";
import { STATUS } from "../../interfaces/Common";
import {
  restaurantsRequest,
  restaurantsTransform,
} from "../../services/restaurants/restaurantService";
import {
  locationRequest,
  locationTransform,
} from "../../services/location/locationService";
import { ActionType } from "../../store/restaurantStore/interface";
import restaurantContext from "../../store/restaurantStore/restaurantContext";
import {
  SearchbarContainer,
  RestaurantList,
  CenterContainer,
} from "./Restaurants.style";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RestaurantStackParamList } from "../../navigation/stackNav/RestaurantsStackNav";

type RestaurantsScreenPropNavigation = StackNavigationProp<
  RestaurantStackParamList,
  "Restaurants"
>;

const Restaurants = () => {
  const ctx = useContext(restaurantContext);
  const navigation = useNavigation<RestaurantsScreenPropNavigation>();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const onChangeSearch = (query: string) => setSearchQuery(query);

  useEffect(() => {
    ctx?.dispatch({ type: ActionType.GET_RESTAURANTS_PENDING });
    const fetchRestaurants = async () => {
      const locationValue = await locationRequest(
        searchQuery?.toLocaleLowerCase()
      );

      const location = locationTransform(locationValue);
      const locationString = `${location.lat},${location.lng}`;
      setTimeout(async () => {
        try {
          const data = await restaurantsRequest(locationString);
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
  }, [searchValue]);

  return (
    <>
      <SafeAreaView edges={["top"]}>
        <SearchbarContainer>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onSubmitEditing={() => {
              setSearchValue(searchQuery);
            }}
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
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: any) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RestaurantDetail", {
                    restaurant: item,
                  })
                }
              >
                <Spacer location="bottom" size="large">
                  <RestaurantInfoCard restaurant={item} />
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item: any, index) => `${item.placeId}-${index}`}
        />
      )}
    </>
  );
};

export default Restaurants;
