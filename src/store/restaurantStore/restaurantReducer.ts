import { STATUS } from "../../interfaces/Common";
import { Action, ActionType, AppContext } from "./interface";

const restaurantReducer = (state: AppContext, action: Action): AppContext => {
  switch (action.type) {
    case ActionType.GET_RESTAURANTS_PENDING:
      return {
        ...state,
        restaurants: {
          status: STATUS.PENDING,
          error: "",
          data: [],
        },
      };
    case ActionType.GET_RESTAURANTS_SUCCESS:
      return {
        ...state,
        restaurants: {
          status: STATUS.SUCCESS,
          error: "",
          data: action.data,
        },
      };
    case ActionType.GET_RESTAURANTS_ERROR:
      return {
        ...state,
        restaurants: {
          status: STATUS.ERROR,
          error: action.error,
          data: [],
        },
      };
    case ActionType.SET_KEYWORD:
      return {
        ...state,
        keyword: action.data,
      };
    default:
      return state;
  }
};

export default restaurantReducer;
