import { useState, useEffect } from "react";
import {
  loadData,
  saveData,
  saveDataCloud,
  loadDataCloud,
  purgeLocalData,
} from "~/utils/storage";
import type { FormData } from "~/components/molecules/CryptoForm";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

export const useCryptoData = ({ session }: { session: Session }) => {
  const [data, setData] = useState<FormData[] | null>(null);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState<Error>();
  // const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      setStatus("Loading...");
      try {
        const loadedData = session.user.id
          ? await loadDataCloud("cryptoData")
          : await loadData("cryptoData");
        setData(loadedData);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
          setStatus("");
          console.log(e);
        }
      } finally {
        setDataFetched(true); // Set the flag after data is fetched
        setStatus("");
      }
    };

    fetchData()
      .then()
      .catch((e) => {
        if (e instanceof Error) {
          setError(e);
          console.log(e);
        }
      });
  }, [session]);

  const saveCryptoData = async (newData: FormData) => {
    try {
      setStatus("Saving...");
      const updatedData = session
        ? await saveDataCloud("cryptoData", newData, session.user.id)
        : await saveData("cryptoData", newData);
      setData(updatedData);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
        console.log(e);
      }
    } finally {
      setStatus("");
    }
  };

  const migrateLocalData = async () => {
    try {
      const localData = await loadData("cryptoData");
      if (!localData) {
        return;
      }
      const cloudData = await loadDataCloud("cryptoData");
      if (!cloudData?.length) {
        if (localData && session) {
          for (const item of localData) {
            await saveDataCloud("cryptoData", item, session.user.id);
          }
          // Clear local storage data after migration
          purgeLocalData("cryptoData");
          const newData = await loadDataCloud("cryptoData");
          setData(newData);
        }
      } else {
        // console.log("Migrate not required");
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
        console.log(e);
      }
    }
  };

  return { data, saveCryptoData, migrateLocalData, dataFetched, status, error };
};
