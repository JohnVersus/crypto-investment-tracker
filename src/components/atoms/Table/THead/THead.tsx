import styled from "styled-components";
import { space, layout, border } from "styled-system";
import type { SpaceProps, LayoutProps, BorderProps } from "styled-system";

type THeadProps = SpaceProps & LayoutProps & BorderProps;

const THead = styled.thead<THeadProps>`
  ${space}
  ${layout}
  ${border}
`;

export default THead;
