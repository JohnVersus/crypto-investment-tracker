import LoginButton from "~/components/auth/LoginButton";
import { Box, Tooltip } from "~/components//atoms";
import Navbar from "~/components/organisms/Navbar/Navbar";
import NavbarItem from "~/components/organisms/Navbar/NavbarItem";
import { Home, Info } from "react-feather";
import { theme } from "~/components/Theme";
import type { Session } from "next-auth";

interface LayoutProps {
  session: Session;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ session, children, ...rest }) => {
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
            <Home
              size={"80%"}
              min-width="24"
              min-height="24"
              color={theme.colors.white}
            />
          </Tooltip>
        </NavbarItem>
        <NavbarItem>
          <LoginButton session={session} />
        </NavbarItem>
        <NavbarItem href="/info">
          <Tooltip content={"Info"}>
            <Info
              size={"80%"}
              min-width="24"
              min-height="24"
              color={theme.colors.white}
            />
          </Tooltip>
        </NavbarItem>
      </Navbar>
    </Box>
  );
};

export default Layout;
