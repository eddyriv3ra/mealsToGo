import React, { useReducer } from "react";
import { STATUS } from "../../interfaces/Common";
import { Action, AppContext } from "./interface";
import RestaurantContext from "./restaurantContext";
import restaurantReducer from "./restaurantReducer";

interface RestaurantProps {
  children: React.ReactNode;
}

const RestaurantState = ({ children }: RestaurantProps) => {
  const dispatch = (action: Action): void => _dispatch(action);
  const data: AppContext = {
    dispatch,
    restaurants: {
      data: [],
      status: STATUS.PENDING,
      error: "",
    },
  };
  const [state, _dispatch] = useReducer(restaurantReducer, data);

  return (
    <RestaurantContext.Provider value={state}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantState;
