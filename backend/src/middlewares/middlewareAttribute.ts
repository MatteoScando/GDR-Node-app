import { Context, Next } from "koa";
import prisma from "../../prisma/client";

export const attributeExists = async (ctx: Context, next: Next) => {
  const id = ctx.params.id;
  const attribute = await prisma.attribute.findUnique({
    where: {
      id: id,
    },
  });

  if (!attribute) {
    ctx.status = 404;
    ctx.body = "Attribute not found";
  } else {
    await next();
  }
};