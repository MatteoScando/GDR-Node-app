import { z } from "zod";

export const userSchema = z.object({
  email: z.string().min(8).max(30),
  password: z.string().min(8).max(30),
});
