import { createContext } from "react";
import { LocationContext } from "./interface";

const locationContext = createContext<LocationContext | null>(null);

export default locationContext;
