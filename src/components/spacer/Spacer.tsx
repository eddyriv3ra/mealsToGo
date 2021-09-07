import React from "react";
import { Spacer as SpacerView } from "./Spacer.styles";

interface SpacerProps {
  location: "top" | "left" | "right" | "bottom";
  size: "small" | "medium" | "large";
  children: React.ReactElement;
}

const Spacer = ({ location, size, children }: SpacerProps) => {
  return (
    <SpacerView location={location} size={size}>
      {children}
    </SpacerView>
  );
};

export default Spacer;
