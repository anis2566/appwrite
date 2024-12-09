"use server";

import { db } from "@/lib/db";
import { HouseSchema, HouseSchemaType } from "../schemas";
import { GET_USER } from "@/service/user.service";
import { revalidatePath } from "next/cache";

// GET CITIES
export const GET_CITIES = async () => {
  const cities = await db.city.findMany({
    orderBy: {
      city_id: "asc",
    },
  });
  return cities;
};

// GET ZONES BY CITY ID
export const GET_ZONE_BY_CITY_ID = async (city_id: number | undefined) => {
  if (!city_id) return [];

  const zones = await db.zone.findMany({
    where: {
      ...(city_id && { city_id }),
    },
    orderBy: {
      zone_name: "asc",
    },
  });

  return zones;
};

// CREATE HOUSE
export const CREATE_HOUSE_ACTION = async (values: HouseSchemaType) => {
  const { data, success } = HouseSchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
    const { user } = await GET_USER();

    const house = await db.house.findFirst({
      where: {
        userId: user.id,
        city_id: data.city_id,
        zone_id: data.zone_id,
        name: data.name,
      },
    });

    if (house) return { error: "House already exists" };

    await db.house.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    return {
      success: "House created.",
    };
  } catch (error) {
    throw new Error("Failed to create house");
  }
};

// DELETE HOUSE
export const DELETE_HOUSE_ACTION = async (id: string) => {
  try {
    const { user } = await GET_USER();

    const house = await db.house.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!house) return { error: "House not found" };

    if (house.userId !== user.id) {
      return {
        error: "Unauthorized",
      };
    }

    await db.house.delete({
      where: { id },
    });

    revalidatePath("/user/house");

    return {
      success: "House deleted.",
    };
  } catch (error) {
    throw new Error("Failed to delete house");
  }
};

// EDIT HOUSE
interface EditHouseProps {
  id: string;
  values: HouseSchemaType;
}

export const EDIT_HOUSE_ACTION = async ({ id, values }: EditHouseProps) => {
  const { data, success } = HouseSchema.safeParse(values);

  if (!success) return { error: "Invalid input values" };

  try {
    const { user } = await GET_USER();

    const house = await db.house.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!house) return { error: "House not found" };

    await db.house.update({
      where: { id },
      data: {
        ...data,
      },
    });

    revalidatePath("/user/house");

    return {
      success: "House updated.",
    };
  } catch (error) {
    throw new Error("Failed to edit house");
  }
};
