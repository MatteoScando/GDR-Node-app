import {z} from "zod";

export const characterSchema = z.object({
    name: z.string().min(1).max(20),
    history: z.string().optional().nullable(),
    age: z.number().int().positive().max(1000).optional().nullable(),
    health: z.number().int().positive().max(999).optional().nullable(),
    stamina: z.number().int().positive().max(999).optional().nullable(),
    mana: z.number().int().positive().max(999).optional().nullable()
}).strict();