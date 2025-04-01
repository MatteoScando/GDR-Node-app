import Router from "@koa/router";
import prisma from "../../prisma/client";
import { Class } from "@prisma/client";
import { ZodError } from "zod";
import { validationError } from "../utilities/errorsHandler";
import { classSchema } from "../../prisma/validation/validationClass";
import { classExists } from "../middlewares/middlewareClass";
import { authUser } from "../middlewares/middlewareAuth";

const router = new Router({
  prefix: "/class",
});

// GET /: retrieve all classes
router.get("/", authUser, async (ctx) => {
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
router.post("/", authUser, async (ctx) => {
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

// GET /:id: get single class
router.get("/:id", authUser, async (ctx) => {
  const id = ctx.params.id;

  try {
    const clazz = await prisma.class.findUnique({
      where: {
        id: id,
      },
    });

    if (!clazz) {
      ctx.status = 404;
      ctx.body = "Class not found";
      return;
    } else {
      ctx.status = 201;
      ctx.body = clazz;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Error: " + error;
  }
});

// PATCH /:id: update single class
router.patch("/:id", authUser, classExists, async (ctx) => {
  const id = ctx.params.id;
  const data = ctx.request.body as Class;

  try {
    const clazz = await prisma.class.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        key: data.key,
        description: data.description,
      },
    });

    ctx.status = 201;
    ctx.body = "Class updated: " + clazz.id;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Error: " + error;
  }
});

// DELETE /:id: delete single class
router.delete("/:id", authUser, classExists, async (ctx) => {
  const id = ctx.params.id;

  try {
    const clazz = await prisma.class.delete({
      where: {
        id: id,
      },
    });

    ctx.status = 200;
    ctx.body = "Class deleted: " + clazz.id;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Error: " + error;
  }
});

export default router;
