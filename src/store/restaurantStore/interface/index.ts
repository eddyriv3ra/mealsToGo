import { STATUS } from "../../../interfaces/Common";
import { RestaurantInfo } from "../../../interfaces/Restaurants";

export enum ActionType {
  GET_RESTAURANTS_PENDING = "GET_RESTAURANTS_PENDING",
  GET_RESTAURANTS_SUCCESS = "GET_RESTAURANTS_SUCCESS",
  GET_RESTAURANTS_ERROR = "GET_RESTAURANTS_ERROR",
  SET_KEYWORD = "SET_KEYWORD",
}

export interface Action<T = any> {
  type: ActionType;
  data?: T;
  error?: T;
}
export interface AppContext {
  dispatch: DispatchFunction;
  restaurants: {
    status: STATUS.ERROR | STATUS.PENDING | STATUS.SUCCESS;
    data: RestaurantInfo[];
    error: "";
  };
  keyword: string;
}

export type DispatchFunction = (action: Action) => void;
