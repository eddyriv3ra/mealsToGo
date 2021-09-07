import React from "react";
import { Text as TextView } from "./Text.styles";

interface TextProps {
  variant?: "label" | "hint" | "caption" | "error" | "body";
  children: React.ReactNode;
}

const Text = ({ variant = "body", children }: TextProps) => {
  return <TextView variant={variant}>{children}</TextView>;
};

export default Text;
