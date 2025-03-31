import Router from "@koa/router";
import prisma from "../../prisma/client";
import { Class } from "@prisma/client";
import { ZodError } from "zod";
import { validationError } from "../utilities/errorsHandler";
import { classSchema } from "../../prisma/validation/validationClass";

const router = new Router({
  prefix: "/class",
});

// GET /: retrieve all classes
router.get("/", async (ctx) => {
  try {
    const classes = await prisma.class.findMany();
    ctx.status = 201;
    ctx.body = classes;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Error: " + error;
  }
});

// POST /: create a class
router.post("/", async (ctx) => {
  try {
    ctx.request.body = classSchema.parse(ctx.request.body);
    const data = ctx.request.body as Class;

    try {
      const clazz = await prisma.class.create({
        data: {
          name: data.name,
          key: data.key,
          description: data.description,
        },
      });

      ctx.status = 201;
      ctx.body = "Class created: " + clazz.id;
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
