import { RestaurantInfo } from "../../../interfaces/Restaurants";

export enum ActionType {
  GET_RESTAURANTS_PENDING = "GET_RESTAURANTS_PENDING",
  GET_RESTAURANTS_SUCCESS = "GET_RESTAURANTS_SUCCESS",
  GET_RESTAURANTS_ERROR = "GET_RESTAURANTS_ERROR",
}

export interface Action<T = any> {
  type: ActionType;
  data?: T;
  error?: T;
}

export enum STATUS {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface AppContext {
  dispatch: DispatchFunction;
  restaurants: {
    status: STATUS.ERROR | STATUS.PENDING | STATUS.SUCCESS;
    data: RestaurantInfo[];
    error: "";
  };
}

export type DispatchFunction = (action: Action) => void;
