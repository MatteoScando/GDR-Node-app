import { Context, Next } from "koa";
import prisma from "../../prisma/client.ts";

export const skillExists = async (ctx: Context, next: Next) => {
  const id = ctx.params.id;
  const skill = await prisma.skill.findUnique({
    where: {
      id: id,
    },
  });

  if (!skill) {
    ctx.status = 404;
    ctx.body = "Skill not found";
  } else {
    await next();
  }
};
