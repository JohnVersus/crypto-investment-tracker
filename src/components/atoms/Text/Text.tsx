import styled, { css } from "styled-components";
import { space, layout, typography, color, variant } from "styled-system";
import type {
  ResponsiveValue,
  TLengthStyledSystem,
  Theme,
  SpaceProps,
  LayoutProps,
  TypographyProps,
  ColorProps,
} from "styled-system";
import { theme } from "~/components/Theme";

type TextProps = SpaceProps &
  LayoutProps &
  TypographyProps &
  ColorProps & {
    textType?: "bold" | "italic";
    textSize?: "small" | "medium" | "large" | "xlarge";
    textColor?: keyof typeof theme.colors;
  };

const textVariants = variant<TextProps>({
  prop: "textType",
  variants: {
    bold: {
      fontWeight: "bold",
    },
    italic: {
      fontStyle: "italic",
    },
  },
});

const textSizeVariants = variant<TextProps>({
  prop: "textSize",
  variants: {
    small: {
      fontSize: [theme.fontSizes[1], theme.fontSizes[1], theme.fontSizes[3]] as
        | ResponsiveValue<
            string | number | symbol,
            Required<Theme<TLengthStyledSystem>>
          >
        | undefined,
    },
    medium: {
      fontSize: [theme.fontSizes[2], theme.fontSizes[2], theme.fontSizes[4]] as
        | ResponsiveValue<
            string | number | symbol,
            Required<Theme<TLengthStyledSystem>>
          >
        | undefined,
    },
    large: {
      fontSize: [theme.fontSizes[4], theme.fontSizes[4], theme.fontSizes[6]] as
        | ResponsiveValue<
            string | number | symbol,
            Required<Theme<TLengthStyledSystem>>
          >
        | undefined,
    },
    xlarge: {
      fontSize: [theme.fontSizes[6], theme.fontSizes[6], theme.fontSizes[7]] as
        | ResponsiveValue<
            string | number | symbol,
            Required<Theme<TLengthStyledSystem>>
          >
        | undefined,
    },
  },
});

const textColorStyles = ({ textColor }: TextProps) =>
  textColor
    ? css`
        color: ${theme.colors[textColor]};
      `
    : "";

const Text = styled.p<TextProps>(
  space,
  layout,
  typography,
  color,
  textVariants,
  textSizeVariants,
  textColorStyles
);

export default Text;
