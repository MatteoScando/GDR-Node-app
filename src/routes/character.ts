import Router from "@koa/router";
import prisma from "../../prisma/client.js";
import { Character } from "@prisma/client";

const router = new Router({
  prefix: "/character",
});

// GET /: retrive all characters
router.get("/", async (ctx) => {
  const characters = await prisma.character.findMany();

  ctx.status = 201;
  ctx.body = characters;
});

// POST /: create a character
router.post("/", async (ctx) => {
  const data = ctx.request.body as Character;

  const character = await prisma.character.create({
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
  ctx.body = "Character created: " + character.id;
});

export default router;
