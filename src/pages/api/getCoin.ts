import type { NextApiRequest, NextApiResponse } from "next";
import retry from "~/utils/retry";
import typedFetch from "~/utils/typedFetch";

export type CoinData = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
};

const fetchCoinsData = async (
  page_length: number,
  page_number: number
): Promise<CoinData[]> => {
  const { COIN_API_ROUTE } = process.env;
  if (!COIN_API_ROUTE) {
    throw new Error("Missing Coin route ENV");
  }
  const data = await typedFetch<CoinData[]>(
    `${COIN_API_ROUTE}?page_lenght=${page_length}&page_number=${page_number}`
  );

  return data;
};

const getCoins = async (req: NextApiRequest, res: NextApiResponse) => {
  const page_lenght = 250;
  const page_number = 1;
  try {
    const fetchPromises = [
      retry(fetchCoinsData, [Number(page_lenght), Number(page_number)]),
      retry(fetchCoinsData, [Number(page_lenght), Number(page_number) + 1]),
    ];

    const [data1, data2] = await Promise.all(fetchPromises);

    if (data1 && data2) {
      const combinedData = [...data1, ...data2];
      res.status(200).json(combinedData);
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching data." });
  }
};
export default getCoins;
