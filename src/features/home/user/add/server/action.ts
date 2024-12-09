"use server";

import { db } from "@/lib/db";
import { GET_USER } from "@/service/user.service";

export const GET_HOUSES_BY_USER = async () => {
  const { user } = await GET_USER();

  const houses = await db.house.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return houses;
};
