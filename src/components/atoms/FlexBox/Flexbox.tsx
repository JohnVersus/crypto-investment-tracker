import styled, { css } from "styled-components";
import { space, layout, flexbox, alignItems, border } from "styled-system";
import type {
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  AlignItemsProps,
  BorderProps,
} from "styled-system";

type FlexBoxProps = SpaceProps &
  LayoutProps &
  FlexboxProps &
  AlignItemsProps &
  BorderProps;

const FlexBox = styled.div<FlexBoxProps>(
  space,
  layout,
  flexbox,
  alignItems,
  border,
  css`
    display: flex;
  `
);
export default FlexBox;
