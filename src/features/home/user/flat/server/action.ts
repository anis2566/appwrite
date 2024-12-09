"use server";

import { db } from "@/lib/db";
import { GET_USER } from "@/service/user.service";
import { FlatSchema, FlatSchemaType } from "../schemas";
import { revalidatePath } from "next/cache";

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

export const CREATE_FLAT_ACTION = async (values: FlatSchemaType) => {
  const { success, data } = FlatSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  const { user } = await GET_USER();

  try {
    const flat = await db.flat.findFirst({
      where: {
        flat_no: data.flat_no,
        house: {
          userId: user.id,
        },
      },
    });

    if (flat) {
      return {
        error: "Flat already exists",
      };
    }

    await db.flat.create({
      data: {
        ...data,
      },
    });

    revalidatePath("/home/user/flat");

    return {
      success: "Flat created.",
    };
  } catch (error) {
    throw new Error("Failed to create flat");
  }
};
