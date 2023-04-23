import React, { useState } from "react";
import { Input, Button, FlexBox, Select, Option } from "~/components/atoms";
import Form from "~/components/atoms/Form";
import type { CoinData } from "~/pages/api/getCoin";

export type FormData = {
  id: string;
  coinName: string;
  quantity: number;
  totalPrice: number;
  profit: number;
};

type FormProps = {
  inputVariant: "primary" | "secondary";
  buttonVariant: "primary" | "secondary";
  formTrigger: (newData: FormData) => Promise<void>;
  isHidden: boolean;
  coins: CoinData[];
  disabled: boolean;
};

const CryptoForm: React.FC<FormProps> = ({
  inputVariant,
  buttonVariant,
  formTrigger,
  isHidden,
  coins,
  disabled,
}) => {
  const [coinName, setCoinName] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy");

  const [suggestions, setSuggestions] = useState<CoinData[]>([]);
  const handleCoinNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoinName(e.target.value);

    if (!e.target.value) {
      setSuggestions([]);
      return;
    }

    const newSuggestions = coins?.filter((coin) =>
      coin.name.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setSuggestions(newSuggestions);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const profit = transactionType === "sell" ? totalPrice : -totalPrice;
    const data: Omit<FormData, "id"> = {
      coinName,
      quantity: transactionType === "sell" ? -quantity : quantity,
      totalPrice: transactionType === "sell" ? -totalPrice : totalPrice,
      profit,
      // date: new Date(),
      // transactionType,
    };

    if (!coinName || !quantity || !totalPrice) {
      throw new Error("Add the required data.");
    }
    await formTrigger(data as FormData);
    setCoinName("");
    setQuantity(0);
    setTotalPrice(0);
    setTransactionType("buy");
  };

  if (isHidden) {
    return null;
  }
  return (
    <Form
      onSubmit={(e) => {
        handleSubmit(e)
          .then()
          .catch((e) => {
            console.log(e);
          });
      }}
    >
      <FlexBox
        flexDirection={["column", "column", "row", "row"]}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="nowrap"
      >
        <Input
          required
          type={"text"}
          inputStyle={inputVariant}
          placeholder="Coin name *"
          width={"100%"}
          m={[1, 1, 1, 1, 1, 2]}
          fontSize={[2, 2, 2, 2, 2, 6]}
          value={coinName}
          onChange={handleCoinNameChange}
          list="coin-suggestions"
        />
        {/* Add the datalist for suggestions */}
        <datalist id="coin-suggestions">
          {suggestions?.map((suggestion) => (
            <Option key={suggestion.id} value={suggestion.name} />
          ))}
        </datalist>
        <Input
          required
          type={"number"}
          inputStyle={inputVariant}
          placeholder="Quantity *"
          width={"100%"}
          step={0.01}
          m={[1, 1, 1, 1, 1, 2]}
          fontSize={[2, 2, 2, 2, 2, 6]}
          value={quantity ? quantity : ""}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <Input
          required
          type={"number"}
          inputStyle={inputVariant}
          step={0.01}
          placeholder="Total price *"
          width={"100%"}
          m={[1, 1, 1, 1, 1, 2]}
          fontSize={[2, 2, 2, 2, 2, 6]}
          value={totalPrice ? totalPrice : ""}
          onChange={(e) => setTotalPrice(Number(e.target.value))}
        />
        <Select
          inputStyle={inputVariant}
          m={[1, 1, 1, 1, 1, 2]}
          fontSize={[2, 2, 2, 2, 2, 6]}
          width={"100%"}
          onChange={(e) => setTransactionType(e.target.value as "buy" | "sell")}
          value={transactionType}
        >
          <Option value="buy" label="Buy" />
          <Option value="sell" label="Sell" />
        </Select>

        <Button
          buttonStyle={buttonVariant}
          width={"100%"}
          m={[1, 1, 1, 1, 1, 2]}
          fontSize={[2, 2, 2, 2, 2, 6]}
          disabled={disabled}
        >
          Submit
        </Button>
      </FlexBox>
    </Form>
  );
};

export default CryptoForm;
