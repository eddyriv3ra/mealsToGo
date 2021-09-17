export const restaurantsRequest = (location: string) => {
  return fetch(
    `http://localhost:5001/mealstogo-325816/us-central1/placesNearby?location=${location}`
  ).then((res) => {
    return res.json();
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
