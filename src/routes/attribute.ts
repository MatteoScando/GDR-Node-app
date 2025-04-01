import Router from "@koa/router";
import prisma from "../../prisma/client";
import { Attribute } from "@prisma/client";
import { attributeSchema } from "../../prisma/validation/validationAttribute";
import { validationError } from "../utilities/errorsHandler";
import { attributeExists } from "../middlewares/middlewareAttribute";
import { ZodError } from "zod";

const router = new Router({
  prefix: "/attribute",
});

// GET /: retrive all attribute
router.get("/", async (ctx) => {
  try {
    const attribute = await prisma.attribute.findMany();
    ctx.status = 201;
    ctx.body = attribute;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Error: " + error;
  }
});

// POST /: create a attribute
router.post("/", async (ctx) => {
  try {
    ctx.request.body = attributeSchema.parse(ctx.request.body);
    const data = ctx.request.body as Attribute;

    try {
      const attribute = await prisma.attribute.create({
        data: {
          name: data.name,
          key: data.key,
          value: data.value,
        },
      });

      ctx.status = 201;
      ctx.body = "attribute created: " + attribute.id;
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

// GET /:id: get single attribute
router.get("/:id", async (ctx) => {
  const id = ctx.params.id;

  try {
    const attribute = await prisma.attribute.findUnique({
      where: {
        id: id,
      },
    });

    if (!attribute) {
      ctx.status = 404;
      ctx.body = "Attribute not found";
      return;
    } else {
      ctx.status = 201;
      ctx.body = attribute;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Error: " + error;
  }
});

// PATCH /:id: update single attribute
router.patch("/:id", attributeExists, async (ctx) => {
  const id = ctx.params.id;
  const data = ctx.request.body as Attribute;

  try {
    const attribute = await prisma.attribute.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        key: data.key,
        value: data.value
      },
    });

    ctx.status = 201;
    ctx.body = "Attribute updated: " + attribute.id;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Error: " + error;
  }
});

// DELETE /:id: delete single character
router.delete("/:id", attributeExists, async (ctx) => {
  const id = ctx.params.id;

  try {
    const attribute = await prisma.attribute.delete({
      where: {
        id: id,
      },
    });

    ctx.status = 200;
    ctx.body = "Attribute deleted: " + attribute.id;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Error: " + error;
  }
});

export default router;