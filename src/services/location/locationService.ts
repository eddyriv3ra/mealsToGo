import camelize from "camelize";
import { host } from "../../utils";

export const locationRequest = (searchTerm?: string) => {
  return fetch(`${host}/geocode?city=${searchTerm}&isMock=false`)
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("error", err);
    });
};

export const locationTransform = (result: any) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse?.results[0];
  const { lat, lng } = geometry?.location;

  return { lat, lng };
};
