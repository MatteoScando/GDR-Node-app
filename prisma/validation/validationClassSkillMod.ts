import { z } from "zod";

export const classSkillModSchema = z.object({
    idSkill: z.string().uuid(),
    idClass: z.string().uuid(),
    value: z.number().int(),
});