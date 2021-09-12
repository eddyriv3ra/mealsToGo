import * as React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Marker, Callout } from "react-native-maps";
import { Searchbar } from "react-native-paper";
import { ActionType } from "../../store/restaurantStore/interface";
import restaurantContext from "../../store/restaurantStore/restaurantContext";
import { MapContainer, MapView, SearchbarContainer } from "./Map.style";
import locationContext from "../../store/locationStore/locationContext";
import { LocationActionType } from "../../store/locationStore/interface";
import { useNavigation } from "@react-navigation/native";
import {
  locationRequest,
  locationTransform,
} from "../../services/location/locationService";
import {
  restaurantsRequest,
  restaurantsTransform,
} from "../../services/restaurants/restaurantService";
import { StackNavigationProp } from "@react-navigation/stack";
import CompactRestaurantInfo from "../../components/compactRestaurantInfo";
import { MapStackParamList } from "../../navigation/stackNav/MapStackNav";
import { RestaurantStackParamList } from "../../navigation/stackNav/RestaurantsStackNav";

type MapScreenPropNavigation = StackNavigationProp<
  RestaurantStackParamList,
  "Restaurants"
>;

const MapComponennt = () => {
  const navigation = useNavigation<MapScreenPropNavigation>();
  const ctx = React.useContext(restaurantContext);
  const locationCtx = React.useContext(locationContext);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [latDelta, setLatDelta] = React.useState(0);
  const lat = locationCtx?.location?.data[0]?.geometry?.location.lat;
  const lng = locationCtx?.location?.data[0]?.geometry?.location.lng;
  const viewport = locationCtx?.location?.data[0]?.geometry?.viewport;

  React.useEffect(() => {
    const northeastLat =
      locationCtx?.location?.data[0]?.geometry?.viewport?.northeast?.lat || 0;
    const southwestLat =
      locationCtx?.location.data[0]?.geometry?.viewport?.southwest?.lat || 0;

    setLatDelta(northeastLat - southwestLat);
  }, [locationCtx, viewport]);

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
    }, [searchQuery, ctx?.keyword])
  );

  useFocusEffect(
    React.useCallback(() => {
      setSearchQuery(ctx?.keyword || "");
    }, [ctx?.keyword])
  );

  return (
    <MapContainer>
      <SearchbarContainer>
        <Searchbar
          placeholder="Search"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          icon="map"
          onSubmitEditing={() => {
            ctx?.dispatch({
              type: ActionType.SET_KEYWORD,
              data: searchQuery,
            });
          }}
        />
      </SearchbarContainer>
      <MapView
        region={{
          latitude: lat || 0,
          longitude: lng || 0,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {ctx?.restaurants.data.map((restaurant) => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() =>
                  navigation.navigate("RestaurantDetail", {
                    restaurant,
                  })
                }
              >
                <CompactRestaurantInfo restaurant={restaurant} />
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </MapContainer>
  );
};

export default MapComponennt;
