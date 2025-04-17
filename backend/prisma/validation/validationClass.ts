import { z } from "zod";

export const classSchema = z.object({
    name: z.string().min(1).max(20),
    key: z.string().refine((value) => /^[a-z0-9_]+$/.test(value), {
        message: "Invalid macchine name format",
    }),
    description: z.string().optional(),
});