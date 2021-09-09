import { createContext } from "react";
import { AppContext } from "./interface";

const restaurantContext = createContext<AppContext | null>(null);

export default restaurantContext;
