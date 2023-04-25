import styled, { css } from "styled-components";
import type { ThemeProps } from "styled-components";
import { space, layout, typography, border } from "styled-system";
import type {
  SpaceProps,
  LayoutProps,
  TypographyProps,
  BorderProps,
} from "styled-system";
import type { Theme } from "~/components/Theme";

type TableCellProps = SpaceProps &
  LayoutProps &
  TypographyProps &
  BorderProps & { stickyX?: boolean; stickyY?: boolean };

const TableCell = styled.td<TableCellProps>`
  padding: 1vw 2vw;
  text-align: left;
  border: 1px solid;
  border-color: ${({ theme }: ThemeProps<Theme>) => theme.colors.gray};
  background-color: ${({ theme }: ThemeProps<Theme>) =>
    theme.colors.background};
  &:hover {
    background-color: ${({ theme }: ThemeProps<Theme>) => theme.colors.gray};
  }

  ${space}
  ${layout}
  ${typography}
  ${border}

  ${({ stickyY }) =>
    stickyY &&
    css`
      position: sticky;
      top: 0;
      z-index: 47;
      &::before {
        content: "";
        position: absolute;
        top: -1px;
        left: 0;
        right: 0;
        height: 1px;
        background-color: ${({ theme }: ThemeProps<Theme>) =>
          theme.colors.gray};
      }
      &::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 1px;
        background-color: ${({ theme }: ThemeProps<Theme>) =>
          theme.colors.gray};
      }
    `}
      ${({ stickyX }) =>
    stickyX &&
    css`
      position: sticky;
      left: 0;
      z-index: 48;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -1px;
        bottom: 0;
        width: 1px;
        background-color: ${({ theme }: ThemeProps<Theme>) =>
          theme.colors.gray};
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: -1px;
        bottom: 0;
        width: 1px;
        background-color: ${({ theme }: ThemeProps<Theme>) =>
          theme.colors.gray};
      }
    `}
`;

export default TableCell;
