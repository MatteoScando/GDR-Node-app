import Router from "@koa/router";
import prisma from "../../prisma/client";
import { Attribute, USER_ROLE } from "@prisma/client";
import { attributeSchema } from "../../prisma/validation/validationAttribute";
import { validationError } from "../utilities/errorsHandler";
import { attributeExists } from "../middlewares/middlewareAttribute";
import { ZodError } from "zod";
import { authUser, userRole } from "../middlewares/middlewareAuth";
import { authJWT } from "../middlewares/middlewareJWT";

/**
 * @swagger
 * tags:
 *   name: Attribute
 *   description: API for managing attributes
 */

const router = new Router({
  prefix: "/attribute",
});

/**
 * @swagger
 * /attribute:
 *   get:
 *     summary: Retrieve all attributes
 *     tags: [Attribute]
 *     responses:
 *       200:
 *         description: Attribute list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attribute'
 *       500:
 *         description: Server error
 */

router.get(
  "/",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    try {
      const attribute = await prisma.attribute.findMany();
      ctx.status = 201;
      ctx.body = attribute;
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Error: " + error;
    }
  }
);

/**
 * @swagger
 * /attribute:
 *   post:
 *     summary: Create a new attribute
 *     tags: [Attribute]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       201:
 *         description: Attribute created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

// POST /: create a attribute
router.post(
  "/",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
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
  }
);

/**
 * @swagger
 * /attribute/{id}:
 *   get:
 *     summary: Retrieve a single attribute
 *     tags: [Attribute]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attribute successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attribute'
 *       404:
 *         description: Attribute not found
 *       500:
 *         description: Server error
 */

// GET /:id: get single attribute
router.get(
  "/:id",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
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
  }
);

/**
 * @swagger
 * /attribute/{id}:
 *   put:
 *     summary: Update an existing attribute
 *     tags: [Attribute]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'attributo da aggiornare
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Attribute updated successfully
 *       404:
 *         description: Attribute not found
 *       500:
 *         description: Server error
 */

// PATCH /:id: update single attribute
router.patch(
  "/:id",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  attributeExists,
  async (ctx) => {
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
          value: data.value,
        },
      });

      ctx.status = 201;
      ctx.body = "Attribute updated: " + attribute.id;
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Error: " + error;
    }
  }
);

/**
 * @swagger
 * /attribute/{id}:
 *   delete:
 *     summary: Delete an attribute
 *     tags: [Attribute]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the attribute to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attribute successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attribute'
 *       404:
 *         description: Attribute not found
 *       500:
 *         description: Server error
 */

// DELETE /:id: delete single character
router.delete(
  "/:id",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  attributeExists,
  async (ctx) => {
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
  }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Attribute:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique ID of the attribute
 *         name:
 *           type: string
 *           description: Attribute name
 *         key:
 *           type: string
 *           description: Unique attribute key
 *         value:
 *           type: string
 *           description: Attribute value
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Attribute creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last modified date of the attribute
 */

// GET /attribute/:id/skill
router.get(
  "/:id/skill",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    const id = ctx.params.id;

    try {
      const attribute = await prisma.attribute.findUnique({
        where: {
          id: id,
        },
        include: {
          skill: true,
        },
      });

      if (!attribute) {
        ctx.status = 404;
        ctx.body = { error: "Attribute not found" };
        return;
      } else {
        ctx.status = 201;
        ctx.body = attribute;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Unable to retrive attribute" };
    }
  }
);

export default router;
