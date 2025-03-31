import { z } from "zod";

export const Attribute = z.object([
    {
      key: z.string().refine((value:string) => /^[a-z0-9_]+$/.test(value), {
        message: "Invalid attribute name",
      }),
      name: z.string(),
      value: z.number(),
    },
]);