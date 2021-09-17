import camelize from "camelize";

export const locationRequest = (searchTerm?: string) => {
  return fetch(
    `http://localhost:5001/mealstogo-325816/us-central1/geocode?city=${searchTerm}`
  ).then((res) => {
    return res.json();
  });
};

export const locationTransform = (result: any) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse?.results[0];
  const { lat, lng } = geometry?.location;

  return { lat, lng };
};
