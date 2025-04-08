import { z } from "zod";

export const attributeSchema = z.object({
  name: z.string(),
  value: z.number(),
  key: z.string().refine((value) => /^[a-z0-9_]+$/.test(value), {
    message: "Invalid macchine name format",
  }),
});
