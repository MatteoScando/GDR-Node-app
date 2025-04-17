import z from "zod";

export const RaceAttrModSchema = z.object({
  value: z.number().int(),
});
