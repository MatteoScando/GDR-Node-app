import { z } from "zod";

export const raceSchema = z.object({
    key: z.string().refine((value) => /^[a-z0-9_]+$/.test(value),{
      message: 'Invalid machine name format',
    }),
    name: z.string().min(1).max(20),
    modHealth: z.number().int(),
    modStamina: z.number().int(),
    modMana: z.number().int(),
  });