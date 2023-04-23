import styled from "styled-components";
import {
  space,
  layout,
  typography,
  color,
  variant,
  border,
  flexbox,
} from "styled-system";
import type {
  SpaceProps,
  BorderRadiusProps,
  LayoutProps,
  TypographyProps,
  ColorProps,
  BorderStyleProps,
  BorderProps,
  FlexboxProps,
} from "styled-system";
import { theme } from "~/components/Theme";
// import type { CSSObject } from "styled-components";

export type ButtonProps = SpaceProps &
  LayoutProps &
  TypographyProps &
  BorderRadiusProps &
  BorderStyleProps &
  ColorProps &
  BorderProps &
  FlexboxProps & {
    buttonStyle?: "primary" | "secondary";
    // cursor?: CSSObject["cursor"];
    disabled?: boolean;
  };

const { primary, secondary, background } = theme.colors;
const buttonVariants = variant<ButtonProps>({
  prop: "buttonStyle",
  variants: {
    primary: {
      backgroundColor: primary,
      color: background,
      borderRadius: 4,
      paddingY: 2,
      fontSize: 2,
      fontWeight: "bold",
      // cursor: "pointer",
      borderWidth: 2,
      borderColor: primary,
    },
    secondary: {
      backgroundColor: secondary,
      color: background,
      borderRadius: 4,
      paddingY: 2,
      fontWeight: "bold",
      // cursor: "pointer",
      borderWidth: 2,
      borderColor: secondary,
    },
  },
});

const Button = styled.button<ButtonProps>(
  space,
  layout,
  typography,
  color,
  border,
  flexbox,
  buttonVariants,
  ({ disabled }) => ({
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
  })
);

export default Button;
