import React, { useReducer } from "react";
import { STATUS } from "../../interfaces/Common";
import { Action, LocationContext } from "./interface";
import LocationAppContext from "./locationContext";
import locationReducer from "./locationReducer";

interface RestaurantProps {
  children: React.ReactNode;
}

const RestaurantState = ({ children }: RestaurantProps) => {
  const dispatch = (action: Action): void => _dispatch(action);
  const data: LocationContext = {
    dispatch,
    location: {
      data: [
        {
          geometry: {
            location: {
              lng: 0,
              lat: 0,
            },
            viewport: {
              northeast: {
                lat: 0,
                lng: 0,
              },
              southwest: {
                lat: 0,
                lng: 0,
              },
            },
          },
        },
      ],
      status: STATUS.PENDING,
      error: "",
    },
  };
  const [state, _dispatch] = useReducer(locationReducer, data);

  return (
    <LocationAppContext.Provider value={state}>
      {children}
    </LocationAppContext.Provider>
  );
};

export default RestaurantState;
