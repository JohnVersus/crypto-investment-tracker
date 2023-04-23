import type { ReactNode } from "react";
import styled from "styled-components";
import type { CSSObject } from "styled-components";

import {
  border,
  borderRadius,
  color,
  flexbox,
  layout,
  position,
  space,
  width,
  fontSize,
} from "styled-system";
import type {
  BorderProps,
  BorderRadiusProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  WidthProps,
  FontSizeProps,
} from "styled-system";

interface ColorPropsExt extends ColorProps {
  as?: React.ElementType;
}

export interface BoxProps
  extends SpaceProps,
    LayoutProps,
    FlexboxProps,
    ColorPropsExt,
    BorderRadiusProps,
    BorderProps,
    WidthProps,
    FontSizeProps,
    PositionProps {
  children?: ReactNode | ReactNode[] | string | number | null | undefined;
  as?: React.ElementType;
}

export interface BoxPropsExtended extends BoxProps {
  cursor?: CSSObject["cursor"];
}

const Box = styled.div<BoxProps>(
  layout,
  flexbox,
  space,
  position,
  color,
  width,
  borderRadius,
  border,
  fontSize
);
export default Box;
