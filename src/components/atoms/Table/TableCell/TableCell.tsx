import styled from "styled-components";
import type { ThemeProps } from "styled-components";
import { space, layout, typography, border } from "styled-system";
import type {
  SpaceProps,
  LayoutProps,
  TypographyProps,
  BorderProps,
} from "styled-system";
import type { Theme } from "~/components/Theme";

type TableCellProps = SpaceProps & LayoutProps & TypographyProps & BorderProps;

const TableCell = styled.td<TableCellProps>`
  padding: 1vw 2vw;
  text-align: left;
  border: 1px solid;
  border-color: ${({ theme }: ThemeProps<Theme>) => theme.colors.gray};
  &:hover {
    background-color: ${({ theme }: ThemeProps<Theme>) => theme.colors.gray};
  }

  ${space}
  ${layout}
  ${typography}
  ${border}
`;

export default TableCell;
