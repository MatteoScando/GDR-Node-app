import Router from "@koa/router";
import prisma from "../../prisma/client";
import { Race } from "@prisma/client";
import { raceSchema } from "../../prisma/validation/validationRace";
import { ZodError } from "zod";
import { validationError } from "../utilities/errorsHandler";
import { raceExists } from "../middlewares/middlewareRace";

const router = new Router({
  prefix: "/race",
});

// GET /: retrive all race
router.get("/", async (ctx) => {
  try {
    const races = await prisma.race.findMany();
    ctx.status = 201;
    ctx.body = races;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Error: " + error;
  }
});

// POST /: create a race
router.post("/", async (ctx) => {
  try {
    ctx.request.body = raceSchema.parse(ctx.request.body);
    const data = ctx.request.body as Race;

    try {
      const race = await prisma.race.create({
        data: {
          name: data.name,
          key: data.key,
          modHealth: data.modHealth,
          modStamina: data.modStamina,
          modMana: data.modMana,
        },
      });

      ctx.status = 201;
      ctx.body = "Race created: " + race.id;
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

// GET /:id: get single race
router.get("/:id", async (ctx) => {
  const id = ctx.params.id;

  try {
    const race = await prisma.race.findUnique({
      where: {
        id: id,
      },
    });

    if (!race) {
      ctx.status = 404;
      ctx.body = "Race not found";
      return;
    } else {
      ctx.status = 201;
      ctx.body = race;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Error: " + error;
  }
});

// PATCH /:id: update single race
router.patch("/:id", raceExists, async (ctx) => {
  const id = ctx.params.id;
  const data = ctx.request.body as Race;

  try {
    const race = await prisma.race.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        key: data.key,
        modHealth: data.modHealth,
        modStamina: data.modStamina,
        modMana: data.modMana,
      },
    });

    ctx.status = 201;
    ctx.body = "Race updated: " + race.id;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Error: " + error;
  }
});

// DELETE /:id: delete single race
router.delete("/:id", raceExists, async (ctx) => {
  const id = ctx.params.id;

  try {
    const race = await prisma.race.delete({
      where: {
        id: id,
      },
    });

    ctx.status = 200;
    ctx.body = "Race deleted: " + race.id;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Error: " + error;
  }
});

export default router;
