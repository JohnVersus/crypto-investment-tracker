import { forwardRef } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import type { ThemeProps } from "styled-components";
import { css } from "styled-components";
import {
  space,
  layout,
  background,
  borderRadius,
  border,
  boxShadow,
  color,
  flexbox,
  position,
  width,
} from "styled-system";
import type { Theme } from "~/components/Theme";
import { theme } from "~/components/Theme";
import type {
  SpaceProps,
  LayoutProps,
  BackgroundProps,
  BorderRadiusProps,
  BoxShadowProps,
  PositionProps,
  BorderProps,
  FlexboxProps,
  ColorProps,
  WidthProps,
} from "styled-system";

interface ColorPropsExt extends ColorProps {
  as?: React.ElementType;
}

export interface NavbarItemProps
  extends SpaceProps,
    LayoutProps,
    FlexboxProps,
    ColorPropsExt,
    WidthProps,
    BorderRadiusProps,
    BorderProps,
    BackgroundProps,
    BoxShadowProps,
    PositionProps {
  children?: ReactNode;
  href?: string;
}

const StyledNavbarItem = styled.div<NavbarItemProps>(
  layout,
  flexbox,
  space,
  position,
  color,
  width,
  border,
  background,
  borderRadius,
  boxShadow,
  css`
    &:hover {
      background-color: ${({ theme }: ThemeProps<Theme>) => theme.colors.gray};
    }
    cursor: pointer;
    text-decoration: none;
  `
);

const defaultProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: ["25px", "30px", "30px", "30px", "30px", "60px"],
  height: ["25px", "30px", "30px", "30px", "30px", "60px"],
  padding: [0, 2],
  borderRadius: "50%",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
};

// eslint-disable-next-line react/display-name
const NavbarItem = forwardRef<HTMLAnchorElement, NavbarItemProps>(
  ({ href, children, ...props }, ref) => {
    const router = useRouter();
    const isActive = href && router.pathname === href;

    const border: Partial<BoxShadowProps> = isActive
      ? {
          boxShadow: theme.shadows.large,
        }
      : {
          boxShadow: theme.shadows.small,
        };

    const item = (
      <StyledNavbarItem
        ref={ref}
        {...props}
        {...defaultProps}
        {...border}
        // tabIndex={!href ? 0 : undefined} // Add this line
      >
        {children}
      </StyledNavbarItem>
    );
    const lable = href && href === "/" ? "Home" : href?.replace("/", "");
    return href ? (
      <Link
        href={href}
        passHref
        style={{
          borderRadius: "50%",
        }}
        aria-label={lable}
      >
        {item}
      </Link>
    ) : (
      item
    );
  }
);

export default NavbarItem;
