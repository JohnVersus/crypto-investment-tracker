import styled from "styled-components";
import { space, layout, border } from "styled-system";
import type { SpaceProps, LayoutProps, BorderProps } from "styled-system";

type TBodyProps = SpaceProps & LayoutProps & BorderProps;

const TBody = styled.tbody<TBodyProps>`
  ${space}
  ${layout}
  ${border}
`;

export default TBody;
