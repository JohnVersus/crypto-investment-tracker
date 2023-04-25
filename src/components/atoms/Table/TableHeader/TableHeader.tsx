import React from "react";
import { Text } from "~/components/atoms";
import styled, { css } from "styled-components";
import type { ThemeProps } from "styled-components";
import { space, typography } from "styled-system";
import type { SpaceProps, TypographyProps } from "styled-system";
import type { Theme } from "~/components/Theme";

type TableHeaderProps = {
  label: string;
  stickyX?: boolean;
  stickyY?: boolean;
};

const StyledTableHeader = styled.th<
  SpaceProps & TypographyProps & { stickyX?: boolean; stickyY?: boolean }
>`
  ${space}
  ${typography}
  
  padding: 1vw 2vw;
  text-align: left;
  border: 1px solid;
  color: ${({ theme }: ThemeProps<Theme>) => theme.colors.secondary};
  border-color: ${({ theme }: ThemeProps<Theme>) => theme.colors.gray};
  background-color: ${({ theme }: ThemeProps<Theme>) =>
    theme.colors.background};
  &:hover {
    background-color: ${({ theme }: ThemeProps<Theme>) => theme.colors.gray};
  }

  ${({ stickyY }) =>
    stickyY &&
    css`
      position: sticky;
      top: 0;
      z-index: 49;
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
      z-index: 50;
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
    ${({ stickyX, stickyY }) =>
    stickyX &&
    stickyY &&
    css`
      position: sticky;
      left: 0;
      z-index: 51;
      box-shadow: inset -1px 0 ${({ theme }: ThemeProps<Theme>) => theme.colors.gray},
        inset 0 -1px ${({ theme }: ThemeProps<Theme>) => theme.colors.gray},
        inset 1px 0 ${({ theme }: ThemeProps<Theme>) => theme.colors.gray},
        inset 0 1px ${({ theme }: ThemeProps<Theme>) => theme.colors.gray};
    `}
`;

const TableHeader: React.FC<TableHeaderProps> = ({
  label,
  stickyX = false,
  stickyY = false,
}) => {
  return (
    <StyledTableHeader stickyX={stickyX} stickyY={stickyY}>
      <Text>{label}</Text>
    </StyledTableHeader>
  );
};

export default TableHeader;
