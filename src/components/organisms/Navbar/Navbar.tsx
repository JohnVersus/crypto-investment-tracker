import React from "react";
import type { ReactNode } from "react";
import styled from "styled-components";
import {
  border,
  boxShadow,
  color,
  flexbox,
  layout,
  position,
  borderRadius,
  space,
  width,
} from "styled-system";
import type {
  BackgroundProps,
  BorderProps,
  BorderRadiusProps,
  BoxShadowProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  WidthProps,
} from "styled-system";
import { theme } from "~/components/Theme";

interface ColorPropsExt extends ColorProps {
  as?: React.ElementType;
}
export interface NavbarProps
  extends SpaceProps,
    LayoutProps,
    FlexboxProps,
    ColorPropsExt,
    WidthProps,
    BorderProps,
    BorderRadiusProps,
    BackgroundProps,
    BoxShadowProps,
    PositionProps {
  children: ReactNode;
}

const StyledNavbar = styled.div<NavbarProps>(
  space,
  position,
  layout,
  flexbox,
  border,
  color,
  boxShadow,
  borderRadius,
  width,
  {
    transform: "translateX(-50%) translateY(-50%)",
    gap: "1rem",
  }
);

const Navbar: React.FC<NavbarProps> = (props) => {
  return (
    <StyledNavbar
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      bottom={[1, 2, 2, 2, 1, 3]} // 2 is from the default space scale
      left="50%"
      height={["40px", "50px", "50px", "50px", "50px", "100px"]}
      px={[2, 4]}
      backgroundColor="background"
      borderRadius="8px"
      borderTop={"2px solid"}
      borderLeft={"2px solid"}
      borderRight={"2px solid"}
      borderBottom={"4px solid"}
      borderColor={theme.colors.gray}
      {...props}
    ></StyledNavbar>
  );
};

export default Navbar;
