import { z } from "zod";

const requiredString = z.string().min(1, { message: "Required" });

export const AdSchema = z.object({
  house_id: requiredString,
});

export type AdSchemaType = z.infer<typeof AdSchema>;
