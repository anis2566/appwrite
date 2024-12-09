import { z } from "zod";

const requiredString = z.string().min(1, { message: "Required" });

export const HouseSchema = z.object({
  name: requiredString.min(3, { message: "Min 3 characters" }),
  city_id: z.number({ message: "Required" }),
  zone_id: z.number({ message: "Required" }),
  address: requiredString.min(3, { message: "Min 3 characters" }),
  flat_count: z.number({ message: "Required" }),
  hasLift: z.boolean({ message: "Required" }),
});

export type HouseSchemaType = z.infer<typeof HouseSchema>;
