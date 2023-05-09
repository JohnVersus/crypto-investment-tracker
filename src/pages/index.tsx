import type { NextPage, GetServerSideProps } from "next";
import { Box, FlexBox } from "~/components/atoms";
import { CryptoInvestmentTrackerLayout } from "~/components/Layout";
import CryptoForm from "~/components/molecules/CryptoForm";
import SavedData from "~/components/organisms/SavedData";
import { useCryptoData } from "~/hooks/useCryptoData";
import ToggleButton from "~/components/atoms/ToggleButton";
import { useEffect, useState } from "react";
import type { CoinData } from "~/pages/api/getCoin";
import typedFetch from "~/utils/typedFetch";
import { getServerAuthSession } from "~/server/auth";
import type { Session } from "next-auth";
import { SeoTags } from "~/components/atoms";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  const apiUrl = process.env.NEXTAUTH_URL;
  if (!apiUrl) throw new Error("Add app url in env");
  try {
    const coins = await typedFetch<CoinData[]>(`${apiUrl}/api/getCoin`);
    return {
      props: {
        coins,
        userSession: session,
      },
    };
  } catch (error) {
    console.log({ error });
    return {
      props: {
        coins: {},
        userSession: session,
      },
    };
  }
};

type IndexPageProps = {
  coins: CoinData[];
  userSession: Session;
};

const IndexPage: NextPage<IndexPageProps> = ({ coins, userSession }) => {
  const { data, saveCryptoData, migrateLocalData, dataFetched, status, error } =
    useCryptoData({ session: userSession });

  // const [coins, setCoins] = useState<CoinData[]>();
  // const init = async () => {
  //   const data = await typedFetch<CoinData[]>(`/api/getCoin`);
  //   setCoins(data);
  // };
  // useEffect(() => {
  //   init()
  //     .then()
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);
  useEffect(() => {
    if (userSession?.user?.id) {
      migrateLocalData()
        .then()
        .catch((e) => {
          console.log(e);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession, dataFetched]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);
  const [formHidden, setFormHidden] = useState<boolean>(
    (data?.length || 0) > 0
  );

  const toggleFormVisibility = () => {
    setFormHidden((prevHidden) => !prevHidden);
  };

  return (
    <CryptoInvestmentTrackerLayout session={userSession}>
      <SeoTags
        title="Crypto Investment Tracker | JohnVersus"
        description="Crypto investment tracker is a simple tool to replace your classic excel sheet. It helps to track all your crypto investments in one place."
        favicon="/coin.png"
        thumbnailUrl="https://webapi.johnversus.dev/api/generateGithubSocial?repo_url=https%3A%2F%2Fgithub.com%2FJohnVersus%2Fcrypto-investment-tracker"
        url="https://crypto-investment-tracker.vercel.app/"
        siteName="Crypto Investment Tracker"
        twitterUsername="_johnversus"
      />
      {/* <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.28.0/feather.min.css"
        integrity="sha384-7JpDzDHVT7ZzizD+7+r7ornyqmzNL8/9CJXzbi6vjC+cY5N5g5h5Q5/1M5AS5N5r"
        crossOrigin="anonymous"
      /> */}
      {coins ? (
        <Box
          as={"main"}
          flexGrow={1}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          alignContent={"center"}
          paddingX="8vh"
          paddingY="2vh"
          flexDirection={"column"}
          width={"auto"}
        >
          <Box>
            <FlexBox
              display="flex"
              justifyContent="end"
              alignItems="center"
              width={"100%"}
              paddingLeft={"5%"}
            >
              <ToggleButton
                onClick={toggleFormVisibility}
                buttonStyle="primary"
                m={[1, 1, 1, 1, 1, 2]}
                fontSize={[2, 2, 2, 2, 2, 6]}
              />
            </FlexBox>
            <CryptoForm
              inputVariant={"primary"}
              buttonVariant={"primary"}
              formTrigger={saveCryptoData}
              isHidden={formHidden}
              coins={coins}
              disabled={status === "Saving..." ? true : false}
            />
          </Box>
          <SavedData
            savedData={data}
            coins={coins}
            session={userSession}
            status={status}
          />
        </Box>
      ) : (
        "Loading..."
      )}
    </CryptoInvestmentTrackerLayout>
  );
};

export default IndexPage;
