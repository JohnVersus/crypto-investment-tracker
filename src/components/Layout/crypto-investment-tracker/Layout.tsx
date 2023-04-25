import LoginButton from "~/components/auth/LoginButton";
import { Box, Tooltip } from "~/components//atoms";
import Navbar from "~/components/organisms/Navbar/Navbar";
import NavbarItem from "~/components/organisms/Navbar/NavbarItem";
import { Home, Info } from "react-feather";
import { theme } from "~/components/Theme";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, ...rest }) => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      // width={"100vw"}
      {...rest}
    >
      {children}
      <Navbar zIndex={75}>
        <NavbarItem href="/">
          <Tooltip content={"Home"}>
            <Home size={"80%"} color={theme.colors.white} />
          </Tooltip>
        </NavbarItem>
        <NavbarItem>
          <LoginButton />
        </NavbarItem>
        <NavbarItem href="/info">
          <Tooltip content={"Info"}>
            <Info size={"80%"} color={theme.colors.white} />
          </Tooltip>
        </NavbarItem>
      </Navbar>
    </Box>
  );
};

export default Layout;
