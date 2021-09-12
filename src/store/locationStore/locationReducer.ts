import { STATUS } from "../../interfaces/Common";
import { Action, LocationActionType, LocationContext } from "./interface";

const restaurantReducer = (
  state: LocationContext,
  action: Action
): LocationContext => {
  switch (action.type) {
    case LocationActionType.GET_LOCATION_PENDING:
      return {
        ...state,
        location: {
          status: STATUS.PENDING,
          error: "",
          data: [],
        },
      };
    case LocationActionType.GET_LOCATION_SUCCESS:
      return {
        ...state,
        location: {
          status: STATUS.SUCCESS,
          error: "",
          data: action.data,
        },
      };
    case LocationActionType.GET_LOCATION_ERROR:
      return {
        ...state,
        location: {
          status: STATUS.ERROR,
          error: action.error,
          data: [],
        },
      };
    default:
      return state;
  }
};

export default restaurantReducer;
