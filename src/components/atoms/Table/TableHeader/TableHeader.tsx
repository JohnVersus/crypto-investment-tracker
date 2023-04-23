import React from "react";
import { Text } from "~/components/atoms";
import styled from "styled-components";
import type { ThemeProps } from "styled-components";
import { space, typography } from "styled-system";
import type { SpaceProps, TypographyProps } from "styled-system";
import type { Theme } from "~/components/Theme";

type TableHeaderProps = {
  label: string;
};

const StyledTableHeader = styled.th<SpaceProps & TypographyProps>`
  ${space}
  ${typography}
  
  padding: 1vw 2vw;
  text-align: left;
  border: 1px solid;
  color: ${({ theme }: ThemeProps<Theme>) => theme.colors.secondary};
  border-color: ${({ theme }: ThemeProps<Theme>) => theme.colors.gray};
  &:hover {
    background-color: ${({ theme }: ThemeProps<Theme>) => theme.colors.gray};
  }
`;

const TableHeader: React.FC<TableHeaderProps> = ({ label }) => {
  return (
    <StyledTableHeader>
      <Text>{label}</Text>
    </StyledTableHeader>
  );
};

export default TableHeader;
