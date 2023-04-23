import styled, { type CSSObject } from "styled-components";
import { space, layout, typography, color, borderRadius } from "styled-system";
import type {
  SpaceProps,
  LayoutProps,
  TypographyProps,
  ColorProps,
  BorderRadiusProps,
} from "styled-system";
import { theme } from "~/components/Theme";

type FloatingHideButtonProps = SpaceProps &
  LayoutProps &
  TypographyProps &
  BorderRadiusProps &
  ColorProps & {
    cursor?: CSSObject["cursor"];
    zIndex?: CSSObject["zIndex"];
  };

const FloatingHideButton = styled.button<FloatingHideButtonProps>`
  position: fixed;
  right: 20px;
  top: 20px;
  border-radius: 50%;
  background-color: ${theme.colors.background};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.secondary};
  cursor: pointer;
  z-index: 1000;

  ${space}
  ${layout}
  ${typography}
  ${color}
  ${borderRadius}
`;

export default FloatingHideButton;
