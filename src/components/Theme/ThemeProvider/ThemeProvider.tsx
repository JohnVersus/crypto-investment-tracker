import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "~/components/Theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <StyledThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </StyledThemeProvider>
);

export default ThemeProvider;
