import Router from "@koa/router";
import prisma from "../../prisma/client";
import { Character, USER_ROLE } from "@prisma/client";
import { characterExists } from "../middlewares/middlewareCharacter";
import { characterSchema } from "../../prisma/validation/validationCharacter";
import { validationError } from "../utilities/errorsHandler";
import { authUser, userRole } from "../middlewares/middlewareAuth";
import { ZodError } from "zod";
import { authJWT } from "../middlewares/middlewareJWT";

const router = new Router({
  prefix: "/character",
});

// GET /: retrive all characters
router.get(
  "/",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.GUEST),
  async (ctx) => {
    try {
      const characters = await prisma.character.findMany({
        where: {
          userId: ctx.state.user.id,
        },
      });
      ctx.status = 201;
      ctx.body = characters;
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Error: " + error;
    }
  }
);

// POST /: create a character
router.post(
  "/",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.GUEST),
  async (ctx) => {
    try {
      ctx.request.body = characterSchema.parse(ctx.request.body);
      const data = ctx.request.body as Character;

      try {
        const character = await prisma.character.create({
          data: {
            name: data.name,
            history: data.history,
            age: data.age,
            health: data.health,
            stamina: data.stamina,
            mana: data.mana,
            idClass: data.idClass,
            idRace: data.idRace,
            userId: ctx.state.user.id,
          },
        });

        ctx.status = 201;
        ctx.body = "Character created: " + character.id;
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
  }
);

// GET /:id: get single character
router.get(
  "/:id",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.GUEST),
  async (ctx) => {
    const id = ctx.params.id;

    try {
      const character = await prisma.character.findUnique({
        where: {
          id: id,
          userId: ctx.state.user.id,
        },
      });

      if (!character) {
        ctx.status = 404;
        ctx.body = "Character not found";
        return;
      } else {
        ctx.status = 201;
        ctx.body = character;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Error: " + error;
    }
  }
);

// PATCH /:id: update single character
router.patch(
  "/:id",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.GUEST),
  characterExists,
  async (ctx) => {
    const id = ctx.params.id;
    const data = ctx.request.body as Character;

    try {
      const character = await prisma.character.update({
        where: {
          id: id,
          userId: ctx.state.user.id,
        },
        data: {
          name: data.name,
          history: data.history,
          age: data.age,
          health: data.health,
          stamina: data.stamina,
          mana: data.mana,
        },
      });

      ctx.status = 201;
      ctx.body = "Character updated: " + character.id;
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Error: " + error;
    }
  }
);

// DELETE /:id: delete single character
router.delete(
  "/:id",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.GUEST),
  characterExists,
  async (ctx) => {
    const id = ctx.params.id;

    try {
      const character = await prisma.character.delete({
        where: {
          id: id,
          userId: ctx.state.user.id,
        },
      });

      ctx.status = 200;
      ctx.body = "Character deleted: " + character.id;
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Error: " + error;
    }
  }
);

export default router;
