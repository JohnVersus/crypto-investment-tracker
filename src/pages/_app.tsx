import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "~/components/Theme";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider>
      <SessionProvider
        session={session}
        // basePath="/crypto-investment-tracker/api/auth"
      >
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default MyApp;
