import Router from "@koa/router";
import prisma from "../../prisma/client.js";

const router = new Router({
  prefix: "/character",
});

router.get("/", async (ctx) => {
  const characters = await prisma.character.findMany();

  ctx.status = 201;
  ctx.body = characters;
});

export default router;