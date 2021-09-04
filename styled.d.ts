import "styled-components";
import { MyTheme } from "./src/utils/theme";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends MyTheme {}
}
