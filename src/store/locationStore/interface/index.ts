import { STATUS } from "../../../interfaces/Common";

export enum LocationActionType {
  GET_LOCATION_PENDING = "GET_LOCATION_PENDING",
  GET_LOCATION_SUCCESS = "GET_LOCATION_SUCCESS",
  GET_LOCATION_ERROR = "GET_LOCATION_ERROR",
}

interface LocationInfo {
  geometry: {
    location: {
      lng: number;
      lat: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
}

export interface Action<T = any> {
  type: LocationActionType;
  data?: T;
  error?: T;
}

export interface LocationContext {
  dispatch: DispatchFunction;
  location: {
    status: STATUS.ERROR | STATUS.PENDING | STATUS.SUCCESS;
    data: LocationInfo[];
    error: "";
  };
}

export type DispatchFunction = (action: Action) => void;
