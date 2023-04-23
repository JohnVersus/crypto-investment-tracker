import styled from "styled-components";
import { space, layout, border, fontSize } from "styled-system";
import type {
  SpaceProps,
  LayoutProps,
  BorderProps,
  FontSizeProps,
} from "styled-system";

type TableProps = SpaceProps & LayoutProps & BorderProps & FontSizeProps;

const Table = styled.table<TableProps>`
  border-collapse: collapse;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  margin: 0 auto; // Center the table

  ${space}
  ${layout}
  ${border}
  ${fontSize}
`;

export default Table;
