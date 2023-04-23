import React from "react";
import Link from "next/link";
import Head from "next/head";
import { FlexBox, Box, Text } from "~/components/atoms";
import styled from "styled-components";

const Card = styled(Box)`
  background: linear-gradient(135deg, #6a00ff, #ff0099);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  cursor: pointer;
  overflow: hidden;
  padding: 20px;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Tools | JohnVersus</title>
      </Head>
      <FlexBox
        alignItems="center"
        justifyContent="flex-start"
        flexDirection="column"
        height="100vh"
      >
        <Text as="h1" textAlign={"center"}>
          Tools
        </Text>
        <Link href="/crypto-investment-tracker" passHref>
          <Card width={["90%", "100%"]} maxWidth={"700px"}>
            <Text textAlign={"center"}>Crypto Investment Tracker</Text>
            <Text textAlign={"center"}>
              Track your cryptocurrency investments
            </Text>
          </Card>
        </Link>
      </FlexBox>
    </>
  );
};

export default Home;
