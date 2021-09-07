import styled from "styled-components/native";
import { MyTheme } from "../../../config/theme";

const defaultTextStyles = (theme: MyTheme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme: MyTheme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme: MyTheme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme: MyTheme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme: MyTheme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme: MyTheme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

const variants = {
  body,
  label,
  caption,
  error,
  hint,
};

interface TextProps {
  variant: "label" | "hint" | "caption" | "error" | "body";
  theme: any;
}

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }: TextProps) => variants[variant](theme)}
`;
