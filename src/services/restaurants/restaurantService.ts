import { mockImages, mocks } from "./mock";
import camelize from "camelize";
import { RestaurantInfo } from "../../interfaces/Restaurants";

export const restaurantsRequest = (location = "37.7749295,-122.4194155") => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject("not found");
    }
    resolve(mock);
  });
};

export const restaurantsTransform = ({ results }: any) => {
  const camelizedResult = camelize(results);
  // console.log("camelizedResult", Array.isArray(camelizedResult));
  const mappedResults: RestaurantInfo = camelizedResult.map(
    (restaurant: RestaurantInfo) => {
      restaurant.photos = restaurant.photos.map((p) => {
        return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
      });
      return {
        ...restaurant,
        isOpenHours: restaurant.openingHours && restaurant.openingHours.openNow,
        isClosedTemporarily: restaurant.businessStatus === "CLOSED_TEMPORARILY",
      };
    }
  );
  return mappedResults;
};
