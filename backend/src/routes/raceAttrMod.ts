import Router from "@koa/router";
import prisma from "../../prisma/client";
import { RaceAttrMod } from "@prisma/client";
import { RaceAttrModSchema } from "../../prisma/validation/validationRaceAttrMod";
import { validationError } from "../utilities/errorsHandler";
import { ZodError } from "zod";

const router = new Router();

// GET /: retrive all races attribute mode
router.get("/race/attr/mod", async (ctx) => {
  try {
    const raceAttrMod = await prisma.raceAttrMod.findMany();
    ctx.status = 201;
    ctx.body = raceAttrMod;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Error: " + error;
  }
});

// POST /: create a raceAttrMod
router.post("/race/:idRace/attr/:idAttribute", async (ctx) => {
  try {
    ctx.request.body = RaceAttrModSchema.parse(ctx.request.body);
    const data = ctx.request.body as RaceAttrMod;

    const idRace = ctx.params.idRace;
    const idAttribute = ctx.params.idAttribute;

    if (!idRace || !idAttribute) {
      ctx.status = 400;
      ctx.body = "Error: idRace and idAttribute are required";
      return;
    }

    try {
      const raceAttrMod = await prisma.raceAttrMod.create({
        data: {
          idRace: idRace,
          idAttribute: idAttribute,
          value: data.value,
        },
      });

      ctx.status = 201;
      ctx.body =
        "Race Attribute Relation created: " +
        "idRace: " +
        raceAttrMod.idRace +
        "idAttribute: " +
        raceAttrMod.idAttribute;
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Error: " + error;
    }
  } catch (error) {
    ctx.status = 500;
    if (error instanceof ZodError) {
      ctx.body = validationError(error);
    } else {
      ctx.body = "Generic Error: " + error;
    }
  }
});

export default router;
