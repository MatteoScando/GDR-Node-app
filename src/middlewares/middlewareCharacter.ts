import { Context, Next } from "koa";
import prisma from "../../prisma/client.ts";

export const characterExists = async (ctx: Context, next: Next) => {
  const id = ctx.params.id;
  const character = await prisma.character.findUnique({
    where: {
      id: id,
    },
  });

  if (!character) {
    ctx.status = 404;
    ctx.body = "Character not found";
  } else {
    await next();
  }
};
