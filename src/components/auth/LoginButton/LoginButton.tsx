import type { Session } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import { LogIn, LogOut } from "react-feather";
import { theme } from "~/components/Theme";
import { Tooltip } from "~/components/atoms";
import { Button } from "~/components/atoms";

const LoginButton = ({ session }: { session: Session }) => {
  // const { data: session } = useSession();

  if (session.user.id) {
    return (
      <Button
        display="flex"
        justifyContent="center"
        alignItems="center"
        border="none"
        backgroundColor="transparent"
        p={0}
        width={"100%"}
        height={"100%"}
        color={theme.colors.white}
        borderRadius={"50%"}
        aria-label="Logout"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => signOut()}
      >
        <Tooltip content={"Logout"}>
          <LogOut size={"80%"} cursor={"pointer"} />
        </Tooltip>
      </Button>
    );
  }

  return (
    <Button
      display="flex"
      justifyContent="center"
      alignItems="center"
      border="none"
      backgroundColor="transparent"
      p={0}
      width={"100%"}
      height={"100%"}
      color={theme.colors.white}
      borderRadius={"50%"}
      aria-label="LogIn"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={() => signIn()}
    >
      <Tooltip content={"LogIn"}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img
          src="/google.svg"
          width="100%"
          height="100%"
          alt={"Google Auth"}
          loading="lazy"
        /> */}
        <LogIn size={"80%"} cursor={"pointer"} />
      </Tooltip>
    </Button>
  );
};

export default LoginButton;
