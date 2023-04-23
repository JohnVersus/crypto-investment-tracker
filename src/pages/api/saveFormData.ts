import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "~/server/db";
import type { FormData } from "~/components/molecules/CryptoForm";

type FormDataWithUserId = FormData & { userId: string | undefined };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const { key, data } = req.body as { key: string; data: FormDataWithUserId };

  if (key !== "cryptoData") {
    res.status(400).json({ message: "Invalid key" });
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    // data.forEach(async (item) => {
    const { coinName, quantity, totalPrice, profit } = data;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const savedData = await prisma.formData.create({
      data: {
        coinName,
        quantity,
        totalPrice,
        profit,
        userId: session.user.id,
      },
    });
    res.status(200).json(savedData);
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save data" });
  }
}
