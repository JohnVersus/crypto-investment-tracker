import localForage from "localforage";
import type { FormData } from "~/components/molecules/CryptoForm";
import { v4 as uuidv4 } from "uuid";
import typedFetch from "./typedFetch";

// const BASEPATH = "crypto-investment-tracker";

export const purgeLocalData = (key: string) => {
  void localForage.removeItem(key);
};

const saveDataLogic = (
  existingData: FormData[] | null,
  data: FormData
): FormData[] => {
  // Add the ID, profit, and notes properties if they are not present
  data.id = data.id || uuidv4();
  data.profit = data.profit || 0;

  if (existingData) {
    const coinIndex = existingData.findIndex(
      (entry) => entry.coinName.toLowerCase() === data.coinName.toLowerCase()
    );
    const exQuantity = existingData[coinIndex]?.quantity
      ? existingData[coinIndex]?.quantity ?? 0
      : 0;
    const exId = existingData[coinIndex]?.id;
    const excoinName = existingData[coinIndex]?.coinName;
    const exProfit = existingData[coinIndex]?.profit
      ? existingData[coinIndex]?.profit ?? 0
      : 0;
    const exTotalPrice = existingData[coinIndex]?.totalPrice
      ? existingData[coinIndex]?.totalPrice ?? 0
      : 0;
    console.log({ exTotalPrice });
    if (coinIndex >= 0) {
      const isBuying = data.quantity >= 0;

      const newQuantity = exQuantity + data.quantity;

      if (isBuying) {
        existingData[coinIndex] = {
          id: exId ?? data.id,
          coinName: excoinName ?? data.coinName,
          quantity: newQuantity,
          totalPrice: exTotalPrice + data.totalPrice,
          profit: exProfit + data.profit,
        };
      } else {
        if (newQuantity < 0) throw new Error("Cannot sell imaginary coins!!");
        const avgPricePerCoin = exTotalPrice / exQuantity;
        const newTotalPrice =
          (avgPricePerCoin ? avgPricePerCoin : 0) * newQuantity;

        existingData[coinIndex] = {
          id: exId ?? data.id,
          coinName: excoinName ?? data.coinName,
          quantity: newQuantity,
          totalPrice: newTotalPrice,
          profit: exProfit + data.profit,
        };
      }

      return existingData;
    }
  }

  const newDataEntry = {
    ...data,
    profit: data.profit,
  };
  const newData = existingData
    ? [...existingData, newDataEntry]
    : [newDataEntry];

  return newData;
};

const saveDataCloudLogic = async (
  existingData: FormData[] | null,
  data: FormData,
  userId: string
): Promise<FormData | null> => {
  // Add the ID, profit, and notes properties if they are not present
  data.id = data.id || uuidv4();
  data.profit = data.profit || 0;

  if (existingData) {
    const coinIndex = existingData.findIndex(
      (entry) => entry.coinName.toLowerCase() === data.coinName.toLowerCase()
    );

    if (coinIndex >= 0) {
      const isBuying = data.quantity >= 0;

      // Update existing FormData entry
      const response = await fetch(`api/updateFormData`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: existingData[coinIndex]?.id,
          data,
          isBuying,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update data in cloud");
      }

      const updatedFormData = (await response.json()) as FormData;
      existingData[coinIndex] = updatedFormData;

      return null;
    } else {
      return data;
    }
  }

  // Create new FormData entry
  const newDataEntry = {
    ...data,
    profit: data.profit,
    userId,
  };

  // Save the new FormData entry to the cloud
  const response = await fetch(`api/saveFormData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: "cryptoData", data: newDataEntry }),
  });

  if (!response.ok) {
    throw new Error("Failed to save data to cloud");
  }

  const savedFormData = (await response.json()) as FormData;
  return savedFormData;
};

export const loadData = async (key: string): Promise<FormData[] | null> => {
  const data = await localForage.getItem<FormData[]>(key);
  return data;
};

export const saveData = async (
  key: string,
  data: FormData
): Promise<FormData[]> => {
  const existingData = await localForage.getItem<FormData[]>(key);
  const newData = saveDataLogic(existingData, data);
  await localForage.setItem(key, newData);

  const savedData = await loadData(key);
  if (savedData) {
    return savedData;
  }

  throw new Error("Failed to save data");
};

export const loadDataCloud = async (
  key: string
): Promise<FormData[] | null> => {
  const response = await typedFetch<FormData[]>(`api/loadFormData?key=${key}`);

  return response;
};

export const saveDataCloud = async (
  key: string,
  data: FormData,
  userId: string
): Promise<FormData[]> => {
  const existingData = await loadDataCloud(key);
  const newData = await saveDataCloudLogic(existingData, data, userId);

  if (newData) {
    const dataToSave = {
      ...newData,
      userId: userId,
    };

    const response = await fetch(`api/saveFormData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, data: dataToSave }),
    });

    if (!response.ok) {
      throw new Error("Failed to save data to cloud");
    }
  }

  const savedData = await loadDataCloud(key);

  if (savedData) {
    return savedData;
  }

  throw new Error("Failed to save data");
};
