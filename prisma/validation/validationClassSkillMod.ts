import { z } from "zod";

export const classSkillModSchema = z.object({
  value: z.number().int(),
});
