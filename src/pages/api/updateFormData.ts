import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "~/server/db";
import type { FormData } from "~/components/molecules/CryptoForm";

type UpdateFormDataInput = FormData & { userId: string | undefined };

type updatedRequestBody = {
  data: UpdateFormDataInput;
  isBuying: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const session = await getSession({ req });
  console.log({ session });
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (req.method === "PUT") {
    const { data, isBuying } = req.body as updatedRequestBody;
    const userId = session.user.id;

    try {
      const existingData = await prisma.formData.findFirst({
        where: {
          coinName: data.coinName,
          userId: userId,
        },
      });

      if (existingData) {
        const newQuantity = existingData.quantity + data.quantity;
        let newTotalPrice;

        if (isBuying) {
          newTotalPrice = existingData.totalPrice + data.totalPrice;
        } else {
          const avgPricePerCoin =
            existingData.totalPrice / existingData.quantity;
          newTotalPrice = avgPricePerCoin * newQuantity;
        }

        const updatedFormData = await prisma.formData.update({
          where: {
            id: existingData.id,
          },
          data: {
            quantity: newQuantity,
            totalPrice: newTotalPrice,
            profit: {
              increment: data.profit,
            },
          },
        });

        res.status(200).json(updatedFormData);
      } else {
        res.status(404).json({ message: "FormData not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating FormData" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
