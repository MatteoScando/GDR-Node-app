import z from "zod"

export const RaceAttrModSchema = z.object({
    idRace: z.string().uuid(),
    idAttribute: z.string().uuid(),
    value: z.number().int()
})