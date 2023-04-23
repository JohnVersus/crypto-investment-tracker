import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const session = await getSession({ req });
  console.log({ session });

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const key = req.query.key as string;

  if (key !== "cryptoData") {
    res.status(400).json({ message: "Invalid key" });
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const loadedData = await prisma.formData.findMany({
      where: {
        userId: session.user.id,
      },
    });

    res.status(200).json(loadedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load data" });
  }
}
