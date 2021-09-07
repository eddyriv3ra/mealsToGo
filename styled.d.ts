import "styled-components";
import { MyTheme } from "./config/theme";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends MyTheme {}
}
