import camelize from "camelize";

import { locations } from "./locationMock";

export const locationRequest = (searchTerm?: string) => {
  return new Promise((resolve, reject) => {
    const locationMock = locations[searchTerm || "san francisco"];
    if (!locationMock) {
      reject("not found");
    }
    resolve(locationMock);
  });
};

export const locationTransform = (result: any) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse?.results[0];
  const { lat, lng } = geometry?.location;

  return { lat, lng };
};
