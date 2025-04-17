import { Context, Next } from "koa";
import prisma from "../../prisma/client";

export const raceAttrModExsist = async (ctx: Context, next: Next) => {
    const idRace = ctx.params.idRace;
    const idAttribute = ctx.params.idAttribute;
    
    if (!idRace || !idAttribute) {
        ctx.status = 400;
        ctx.body = "Error: idRace and idAttribute are required";
        return;
    }

    const raceAttrMod = await prisma.raceAttrMod.findUnique({
        where : {
          idRace_idAttribute: {
            idRace: idRace,
            idAttribute: idAttribute,
          }
        },
      });

    if (!raceAttrMod) {
        ctx.status = 404;
        ctx.body = "raceAttribute not found";
    } else {
        await next();
    }
};