import { Context, Next } from "koa";
import prisma from "../../prisma/client.ts";

export const raceExists = async (ctx: Context, next: Next) => {
  const id = ctx.params.id;
  const race = await prisma.race.findUnique({
    where: {
      id: id,
    },
  });

  if (!race) {
    ctx.status = 404;
    ctx.body = "Race not found";
  } else {
    await next();
  }
};
