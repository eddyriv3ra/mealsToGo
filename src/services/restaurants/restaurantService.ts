import { host } from "../../utils";

export const restaurantsRequest = (location: string) => {
  return fetch(`${host}/placesNearby?location=${location}&isMock=false`)
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const restaurantsTransform = ({ results }: any) => {
  const mappedResults = results.map((restaurant: any) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });
  return mappedResults;
};
