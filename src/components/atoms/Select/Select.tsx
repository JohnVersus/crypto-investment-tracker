import styled from "styled-components";
import {
  space,
  layout,
  typography,
  border,
  variant,
  color,
} from "styled-system";
import type {
  SpaceProps,
  LayoutProps,
  TypographyProps,
  BorderProps,
  ColorProps,
} from "styled-system";
import { theme } from "~/components/Theme";
import type { CSSObject } from "styled-components";

type SelectProps = SpaceProps &
  LayoutProps &
  TypographyProps &
  ColorProps &
  BorderProps & {
    inputStyle?: "primary" | "secondary";
    outline?: CSSObject["outline"];
  };

const selectVariants = variant<SelectProps>({
  prop: "inputStyle",
  variants: {
    primary: {
      borderColor: theme.colors.gray,
      borderRadius: 4,
      borderWidth: 2,
      paddingY: 2,
      backgroundColor: theme.colors.background,
      color: theme.colors.primary,
    },
    secondary: {
      borderColor: theme.colors.gray,
      borderRadius: 4,
      borderWidth: 2,
      paddingY: 2,
      backgroundColor: theme.colors.background,
      color: theme.colors.primary,
    },
  },
});

const Select = styled.select<SelectProps>(
  selectVariants,
  space,
  layout,
  typography,
  border,
  color
);

export default Select;
