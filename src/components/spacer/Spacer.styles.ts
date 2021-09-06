import styled from "styled-components/native";

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
};

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
};

interface SpacerProps {
  location: "top" | "left" | "right" | "bottom";
  size: "small" | "medium" | "large";
  theme: any;
}

const getVariant = ({ location, size, theme }: SpacerProps) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[location];
  const value = theme.space[sizeIndex];
  return `${property}:${value}`;
};

export const Spacer = styled.View`
  ${({ location, size, theme }: SpacerProps) => {
    return getVariant({ location, size, theme });
  }}
`;
