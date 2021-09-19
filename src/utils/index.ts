import { Platform } from "react-native";

const liveHost = "https://us-central1-mealstogo-325816.cloudfunctions.net";
const localHost = "http://localhost:5001/mealstogo-325816/us-central1";

export const isDevelopment =
  process.env.NODE_ENV === "development" && Platform.OS === "ios";

export const host = isDevelopment ? localHost : liveHost;
