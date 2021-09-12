import React, { useContext } from "react";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
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
import locationContext from "../../store/locationStore/locationContext";
import { LocationActionType } from "../../store/locationStore/interface";

type RestaurantsScreenPropNavigation = StackNavigationProp<
  RestaurantStackParamList,
  "Restaurants"
>;

const Restaurants = () => {
  const ctx = useContext(restaurantContext);
  const locationCtx = useContext(locationContext);
  const navigation = useNavigation<RestaurantsScreenPropNavigation>();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const onChangeSearch = (query: string) => setSearchQuery(query);
  useFocusEffect(
    React.useCallback(() => {
      const fetchRestaurants = async () => {
        let locationString: string;
        locationCtx?.dispatch({
          type: LocationActionType.GET_LOCATION_PENDING,
        });
        try {
          const locationValue: any = await locationRequest(
            searchQuery?.toLocaleLowerCase()
          );
          locationCtx?.dispatch({
            type: LocationActionType.GET_LOCATION_SUCCESS,
            data: locationValue.results,
          });
          const location = locationTransform(locationValue);
          locationString = `${location.lat},${location.lng}`;
        } catch (error) {
          locationCtx?.dispatch({
            type: LocationActionType.GET_LOCATION_ERROR,
            error,
          });
        }
        ctx?.dispatch({
          type: ActionType.GET_RESTAURANTS_PENDING,
        });
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
    }, [searchValue, ctx?.keyword])
  );

  useFocusEffect(
    React.useCallback(() => {
      setSearchQuery(ctx?.keyword || "");
    }, [ctx?.keyword])
  );

  return (
    <>
      <SafeAreaView edges={["top"]}>
        <SearchbarContainer>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onSubmitEditing={() => {
              ctx?.dispatch({
                type: ActionType.SET_KEYWORD,
                data: searchQuery,
              });
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
