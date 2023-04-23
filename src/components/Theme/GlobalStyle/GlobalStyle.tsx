import { createGlobalStyle } from "styled-components";
import type { ThemeProps } from "styled-components";
import type { Theme } from "..";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${({ theme }: ThemeProps<Theme>) => theme.fonts.body};
    font-weight: ${({ theme }: ThemeProps<Theme>) => theme.fontWeights.body};
    line-height: ${({ theme }: ThemeProps<Theme>) => theme.lineHeights.body};
    color: ${({ theme }: ThemeProps<Theme>) => theme.colors.text};
    background: linear-gradient(45deg, #1f1f1f, ${({
      theme,
    }: ThemeProps<Theme>) => theme.colors.background});
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :focus {
    outline: solid 0.2rem ${({ theme }: ThemeProps<Theme>) =>
      theme.colors.primary};
    /* border-radius: 0.5rem; */
    border-radius: "50%";
  }

  :focus:not(:focus-visible) {
    outline: none;
  }

  :focus-visible {
    outline: solid 0.2rem ${({ theme }: ThemeProps<Theme>) =>
      theme.colors.primary};
    /* border-radius: 0.5rem; */
    border-radius: "50%";

  }
`;

export default GlobalStyle;
