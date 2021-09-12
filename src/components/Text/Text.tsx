import React from "react";
import { Text as TextView } from "./Text.styles";
import { TextProps } from "react-native";

interface ITextProps extends TextProps {
  variant?: "label" | "hint" | "caption" | "error" | "body";
  children: React.ReactNode;
}

const Text = ({ variant = "body", children }: ITextProps) => {
  return <TextView variant={variant}>{children}</TextView>;
};

export default Text;
