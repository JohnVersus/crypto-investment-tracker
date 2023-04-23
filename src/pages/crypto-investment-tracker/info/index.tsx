import React from "react";
import { Text, FlexBox, Box } from "~/components/atoms";
import Link from "next/link";
import { CryptoInvestmentTrackerLayout } from "~/components/Layout";
const Info = () => {
  return (
    <CryptoInvestmentTrackerLayout>
      <FlexBox
        flexDirection="column"
        alignItems="center"
        justifyContent="top"
        height={"90vh"}
        padding={4}
      >
        <Box mb={2}>
          <Text as="h1" textAlign={"center"}>
            About
          </Text>
          <Text maxWidth={"600px"} textAlign={"center"}>
            Cryto investment tracker is a simple tool to replace your classic
            excel sheet. It helps to track all your crypto investments in one
            place.
          </Text>
        </Box>
        <Box mb={2}>
          <Text as="h1" textAlign={"center"}>
            Contact
          </Text>
          <Text>Email: dontContact@anyone.com</Text>
        </Box>
        <Box mb={2}>
          <Text as="h1" textAlign={"center"}>
            Changelog
          </Text>
          <Text>Version 1.0: Initial release</Text>
        </Box>
        <Box mb={2}>
          <Link href={"/crypto-investment-tracker/info/privacy-policy"}>
            Privacy Policy
          </Link>
          {" | "}
          <Link href={"/crypto-investment-tracker/info/terms-of-service"}>
            Terms of Service
          </Link>
        </Box>
      </FlexBox>
    </CryptoInvestmentTrackerLayout>
  );
};

export default Info;
