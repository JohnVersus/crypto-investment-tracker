import React from "react";
import { Text, FlexBox, Box } from "~/components/atoms";
import Layout from "~/components/Layout/Layout";
const TermsOfService = () => {
  return (
    <Layout>
      <FlexBox
        flexDirection="column"
        alignItems="center"
        justifyContent="top"
        height={"90vh"}
        overflow={"scroll"}
      >
        <Box mb={4}>
          <Text as="h1" textAlign={"center"}>
            Terms of Service
          </Text>
          <Text px={"1rem"} maxWidth={"600px"} textAlign={"justify"}>
            Introduction
            <br />
            These Terms of Service (&quot;Terms&quot;) govern your access to and
            use of Crypto Investment Tracker&apos;s application and website
            (collectively, the &quot;Services&quot;). By accessing or using the
            Services, you agree to be bound by these Terms.
            <br />
            <br />
            Eligibility
            <br />
            You must be at least 18 years old to use the Services. By agreeing
            to these Terms, you represent and warrant that you are at least 18
            years old.
            <br />
            <br />
            License
            <br />
            Subject to your compliance with these Terms, we grant you a limited,
            non-exclusive, non-transferable license to use the Services for your
            personal, non-commercial purposes.
            <br />
            <br />
            Prohibited Conduct
            <br />
            You agree not to:
            <br />
            - Use the Services for any illegal or unauthorized purpose
            <br />
            - Attempt to gain unauthorized access to the Services or any related
            systems
            <br />
            - Interfere with or disrupt the operation of the Services
            <br />
            <br />
            Disclaimer
            <br />
            The Services are provided &quot;as is&quot; and without warranty of
            any kind. We do not guarantee the accuracy, reliability, or
            completeness of any information or data provided through the
            Services. And this is generated by ChatGpt.
          </Text>
        </Box>
      </FlexBox>
    </Layout>
  );
};

export default TermsOfService;
