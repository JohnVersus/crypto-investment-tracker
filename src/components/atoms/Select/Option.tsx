import type { ReactNode } from "react";
import styled from "styled-components";

import { color } from "styled-system";
import type { ColorProps } from "styled-system";

interface ColorPropsExt extends ColorProps {
  as?: React.ElementType;
}

export interface OptionProps extends ColorPropsExt {
  children?: ReactNode | ReactNode[] | string | number | null | undefined;
  as?: React.ElementType;
  value?: string | number;
  label?: string;
}

const Option = styled.option<OptionProps>(color);

export default Option;
