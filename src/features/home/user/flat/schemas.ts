import { z } from "zod";

const requiredString = z.string().min(1, { message: "Required" });

export const FlatSchema = z.object({
  house_id: requiredString,
  flat_no: requiredString,
  room_count: z.number().min(1, { message: "Required" }),
});

export type FlatSchemaType = z.infer<typeof FlatSchema>;
