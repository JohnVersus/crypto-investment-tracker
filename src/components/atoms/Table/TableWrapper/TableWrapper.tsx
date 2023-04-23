import styled from "styled-components";
import { layout, space } from "styled-system";
import type { LayoutProps, SpaceProps } from "styled-system";

type TableWrapperProps = LayoutProps & SpaceProps;

const TableWrapper = styled.div<TableWrapperProps>`
  overflow-x: auto;
  overflow-y: auto;
  ${layout}
  ${space}
`;

export default TableWrapper;
