import { Context, Next } from "koa";
import prisma from "../../prisma/client";

export const classExists = async (ctx: Context, next: Next) => {
  const id = ctx.params.id;
  const clazz = await prisma.class.findUnique({
    where: {
      id: id,
    },
  });

  if (!clazz) {
    ctx.status = 404;
    ctx.body = "Class not found";
  } else {
    await next();
  }
};