import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RestaurantInfo } from "../../interfaces/Restaurants";

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

  const saveFavourites = async (value: RestaurantInfo[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@favourites", jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem("@favourites");
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
    loadFavourites();
  }, []);

  useEffect(() => {
    saveFavourites(favourites);
  }, [favourites]);

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
