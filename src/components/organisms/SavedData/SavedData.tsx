import React, { useEffect, useState } from "react";
import {
  TBody,
  THead,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableWrapper,
} from "~/components/atoms/Table";
import { FlexBox, Text } from "~/components/atoms";
import type { FormData } from "~/components/molecules/CryptoForm";
import type { CoinData } from "~/pages/api/getCoin";
// import localForage from "localforage";
// import debounce from "~/utils/debounce";
// import { theme } from "~/components/Theme";
import { Eye, EyeOff } from "react-feather";
import { FloatingHideButton } from "~/components/atoms";
import type { Session } from "next-auth";

type SavedDataProps = {
  savedData: FormData[] | null;
  coins: CoinData[];
  status: string;
};

type userSession = {
  session: Session;
};

const SavedData: React.FC<SavedDataProps & userSession> = ({
  savedData,
  coins,
  session,
  status,
}) => {
  const [hideSensitiveInfo, setHideSensitiveInfo] = useState(false);

  // const [data, setData] = useState<FormData[] | null>(null);
  const [overallProfit, setOverallProfit] = useState(0);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const calculateOverallProfit = (savedData: FormData[]) => {
    let totalProfit = 0;

    savedData.forEach((item) => {
      totalProfit += item.profit;
    });

    setOverallProfit(totalProfit);
  };

  useEffect(() => {
    if (savedData) {
      calculateOverallProfit(savedData);
    }
  }, [savedData]);

  if (!savedData || !savedData.length) {
    return (
      <FlexBox
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height={"80%"}
      >
        <Text textSize="medium" textAlign={"center"}>
          {status ? "Loading data.." : "No data found."} <br />
          {!status
            ? session?.user?.id
              ? "Use the above form to save cryto investment data."
              : "Use the form to save data or Login to view the saved data."
            : ""}
        </Text>
      </FlexBox>
    );
  }

  // const updateNotes = (id: string, notes: string) => {
  //   const updatedData = savedData.map((item) => {
  //     if (item.id === id) {
  //       return { ...item, notes };
  //     }
  //     return item;
  //   });
  //   setData(updatedData);
  //   // Save updated data in local storage
  //   localForage
  //     .setItem("cryptoData", updatedData)
  //     .then()
  //     .catch((e) => console.log(e));
  // };

  // const debouncedUpdateNotes = debounce(updateNotes, 300);

  const findCoinData = (coinName: string) => {
    return coins?.find(
      (coin) => coin.name.toLowerCase() === coinName.toLowerCase()
    );
  };

  return (
    <>
      {/* Display the overall profit */}
      <Text textType={"bold"} textSize={"medium"}>
        Total Realized Profit:{" "}
        {hideSensitiveInfo ? "****" : overallProfit.toFixed(2) + " $"}
      </Text>

      <TableWrapper
        maxWidth={["120%", "100%", "100%", "80%", "80%", "80%"]}
        maxHeight={["90vh", "90vh", "60vh", "60vh", "60vh", "60vh"]}
        // pt="1vh"
        // pb={["120px", "120px", "120px", "120px", "120px", "120px"]}
      >
        <Table fontSize={[2, 2, 2, 2, 2, 6]}>
          <THead>
            <TableRow>
              <TableHeader stickyX stickyY label="Coin Name" />
              <TableHeader stickyY label="Quantity" />
              <TableHeader stickyY label="Total Price ($)" />
              <TableHeader stickyY label="Average Price ($)" />
              <TableHeader stickyY label="Coin Price ($)" />
              <TableHeader stickyY label="Profit ($)" />
              <TableHeader stickyY label="Profit (%)" />
              <TableHeader stickyY label="Realized Profit ($)" />
            </TableRow>
          </THead>
          <TBody>
            {savedData.map((item, index) => {
              const coinData = findCoinData(item.coinName);
              const currentPrice = coinData ? coinData.current_price : 0;
              const averagePrice = item.totalPrice / item.quantity;
              const totalCurrentValue = currentPrice * item.quantity;
              const profitUSD = totalCurrentValue - item.totalPrice;
              const profitPercent = (profitUSD / item.totalPrice) * 100;
              return (
                <TableRow key={index}>
                  <TableCell stickyX>{item.coinName}</TableCell>
                  <TableCell>
                    {hideSensitiveInfo ? "****" : item.quantity}
                  </TableCell>
                  <TableCell>
                    {hideSensitiveInfo
                      ? "****"
                      : item.totalPrice.toFixed(2)
                      ? item.totalPrice.toFixed(2)
                      : 0}
                  </TableCell>
                  <TableCell>
                    {(averagePrice ? averagePrice : 0).toFixed(2)}
                  </TableCell>
                  <TableCell>{currentPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    {hideSensitiveInfo
                      ? "****"
                      : (profitUSD ? profitUSD : 0).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {(profitPercent ? profitPercent : 0).toFixed(2)}%
                  </TableCell>
                  {/* <TableCell>{item.date}</TableCell> */}
                  <TableCell>
                    {hideSensitiveInfo
                      ? "****"
                      : (item.profit ? item.profit : 0).toFixed(2)}
                  </TableCell>{" "}
                  {/* Add this line */}
                  {/* <TableCell>
                  <Input
                    type="text"
                    inputStyle="secondary"
                    placeholder={item.notes || "Notes"}
                    // width="100%"
                    fontSize={[1, 1, 1, 1, 1, 4]}
                    value={notes}
                    onChange={(e) => {
                      setNotes(e.target.value);
                      debouncedUpdateNotes(item?.id, e.target.value);
                    }}
                    backgroundColor={theme.colors.background}
                  />
                </TableCell> */}
                </TableRow>
              );
            })}
          </TBody>
        </Table>
      </TableWrapper>
      <FloatingHideButton
        width={[40, 40, 40, 40, 40, 60]}
        height={[40, 40, 40, 40, 40, 60]}
        onClick={() => setHideSensitiveInfo(!hideSensitiveInfo)}
      >
        {hideSensitiveInfo ? (
          <EyeOff size={"80%"} min-width="24" min-height="24" />
        ) : (
          <Eye size={"90%"} min-width="24" min-height="24" />
        )}
      </FloatingHideButton>
    </>
  );
};

export default SavedData;
