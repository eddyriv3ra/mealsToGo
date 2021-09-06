import React from "react";
import { Spacer as SpacerView } from "./Spacer.styles";

interface SpacerProps {
  location: "top" | "left" | "right" | "bottom";
  size: "small" | "medium" | "large";
}

const Spacer = ({ location, size }: SpacerProps) => {
  return <SpacerView location={location} size={size} />;
};

export default Spacer;
