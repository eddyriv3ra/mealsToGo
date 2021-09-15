import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RestaurantInfo } from "../../interfaces/Restaurants";
import { AuthenticationContext } from "../authentication/authenticationContext";

interface Values {
  favourites: RestaurantInfo[];
  addToFavourites: (restaurant: RestaurantInfo) => void;
  removeFromFavourites: (restaurant: RestaurantInfo) => void;
}

const initialState = {
  favourites: [],
  addToFavourites: () => null,
  removeFromFavourites: () => null,
};

export const FavouritesContext = createContext<Values>(initialState);

interface FavouritesContextProviderProps {
  children: React.ReactNode;
}

const FavouritesContextProvider = ({
  children,
}: FavouritesContextProviderProps) => {
  const [favourites, setFavourites] = useState<RestaurantInfo[]>([]);
  const { user } = useContext(AuthenticationContext);

  const saveFavourites = async (value: RestaurantInfo[], uid: string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadFavourites = async (uid: string) => {
    try {
      const value = await AsyncStorage.getItem(`@favourites-${uid}`);
      if (value !== null) {
        setFavourites(JSON.parse(value));
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };

  const add = (restaurant: RestaurantInfo) => {
    setFavourites([...favourites, restaurant]);
  };

  const remove = (restaurant: RestaurantInfo) => {
    const newFavourites: RestaurantInfo[] = favourites.filter(
      (favourite: RestaurantInfo) => favourite.placeId !== restaurant.placeId
    );

    setFavourites(newFavourites);
  };

  useEffect(() => {
    if (user?.uid) {
      loadFavourites(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user?.uid && favourites.length) {
      saveFavourites(favourites, user.uid);
    }
  }, [favourites, user]);

  return (
    <FavouritesContext.Provider
      value={
        {
          favourites,
          addToFavourites: add,
          removeFromFavourites: remove,
        } as Values
      }
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContextProvider;
