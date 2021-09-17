import React, { useContext } from "react";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantInfoCard from "../../components/restaurantInfoCard";
import FavouritesBar from "../../components/favouritesBar";
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
import { FavouritesContext } from "../../store/favourites/favouritesContext";
import Favourite from "../../components/favourites";
import FadeInView from "../../components/animations/FadeAnimation";

type RestaurantsScreenPropNavigation = StackNavigationProp<
  RestaurantStackParamList,
  "Restaurants"
>;

const Restaurants = () => {
  const ctx = useContext(restaurantContext);
  const locationCtx = useContext(locationContext);
  const { favourites } = useContext(FavouritesContext);
  const navigation = useNavigation<RestaurantsScreenPropNavigation>();
  const [searchQuery, setSearchQuery] = React.useState("San Francisco");
  const [searchValue, setSearchValue] = React.useState("");
  const [isToggled, setIsToggled] = React.useState(false);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  useFocusEffect(
    React.useCallback(() => {
      const fetchRestaurants = async () => {
        let locationString: string = "";
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
            icon={isToggled ? "heart" : "heart-outline"}
            onIconPress={() => setIsToggled(!isToggled)}
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
        {isToggled && <FavouritesBar favourites={favourites} />}
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
              <>
                <Favourite restaurant={item} />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("RestaurantDetail", {
                      restaurant: item,
                    })
                  }
                >
                  <Spacer location="bottom" size="large">
                    <FadeInView>
                      <RestaurantInfoCard restaurant={item} />
                    </FadeInView>
                  </Spacer>
                </TouchableOpacity>
              </>
            );
          }}
          keyExtractor={(item: any, index) => `${item.placeId}-${index}`}
        />
      )}
    </>
  );
};

export default Restaurants;
