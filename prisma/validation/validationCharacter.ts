import { z } from "zod";

export const characterSchema = z.object({
  name: z.string().min(1).max(20),
  history: z.string().optional(),
  age: z.number().int().optional(),
  health: z.number().int().optional(),
  stamina: z.number().int().optional(),
  mana: z.number().int().optional(),
});
