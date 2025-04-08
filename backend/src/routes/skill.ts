import Router from "@koa/router";
import prisma from "../../prisma/client";
import { Skill, USER_ROLE } from "@prisma/client";
import { skillExists } from "../middlewares/middlewareSkill";
import { skillSchema } from "../../prisma/validation/validationSkill";
import { validationError } from "../utilities/errorsHandler";
import { ZodError } from "zod";
import { authUser, userRole } from "../middlewares/middlewareAuth";
import { authJWT } from "../middlewares/middlewareJWT";

const router = new Router({
  prefix: "/skill",
});

/**
 * @swagger
 * /skill:
 *   get:
 *     summary: Retrieve all skills
 *     tags: [Skill]
 *     responses:
 *       200:
 *         description: A list of skills.
 *       500:
 *         description: Internal server error.
 */

// GET /: retrieve all skills
router.get(
  "/",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    try {
      const skills = await prisma.skill.findMany();
      ctx.status = 200;
      ctx.body = skills;
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Error: " + error;
    }
  }
);

/**
 * @swagger
 * /skill:
 *   post:
 *     summary: Create a new skill
 *     tags: [Skill]
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
 *                 type: integer
 *               idAttribute:
 *                 type: string
 *     responses:
 *       201:
 *         description: Skill created.
 *       500:
 *         description: Internal server error.
 */

// POST /: create a skill
router.post(
  "/",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    try {
      ctx.request.body = skillSchema.parse(ctx.request.body);
      const data = ctx.request.body as Skill;

      try {
        const skill = await prisma.skill.create({
          data: {
            name: data.name,
            key: data.key,
            value: data.value,
            idAttribute: data.idAttribute,
          },
        });

        ctx.status = 201;
        ctx.body = "Skill created: " + skill.id;
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
 * /skill/{id}:
 *   get:
 *     summary: Get a single skill
 *     tags: [Skill]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill found.
 *       404:
 *         description: Skill not found.
 *       500:
 *         description: Internal server error.
 */

// GET /:id: get single skill
router.get(
  "/:id",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    const id = ctx.params.id;

    try {
      const skill = await prisma.skill.findUnique({
        where: {
          id: id,
        },
      });

      if (!skill) {
        ctx.status = 404;
        ctx.body = "Skill not found";
        return;
      } else {
        ctx.status = 200;
        ctx.body = skill;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Error: " + error;
    }
  }
);

/**
 * @swagger
 * /skill/{id}:
 *   patch:
 *     summary: Update a skill
 *     tags: [Skill]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *                 type: integer
 *               idAttribute:
 *                 type: string
 *     responses:
 *       200:
 *         description: Skill updated.
 *       500:
 *         description: Internal server error.
 */

// PATCH /:id: update single skill
router.patch(
  "/:id",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  skillExists,
  async (ctx) => {
    const id = ctx.params.id;
    const data = ctx.request.body as Skill;

    try {
      const skill = await prisma.skill.update({
        where: {
          id: id,
        },
        data: {
          name: data.name,
          key: data.key,
          value: data.value,
          idAttribute: data.idAttribute,
        },
      });

      ctx.status = 200;
      ctx.body = "Skill updated: " + skill.id;
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Error: " + error;
    }
  }
);

/**
 * @swagger
 * /skill/{id}:
 *   delete:
 *     summary: Delete a skill
 *     tags: [Skill]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill deleted.
 *       500:
 *         description: Internal server error.
 */

// DELETE /:id: delete single skill
router.delete(
  "/:id",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  skillExists,
  async (ctx) => {
    const id = ctx.params.id;

    try {
      const skill = await prisma.skill.delete({
        where: {
          id: id,
        },
      });

      ctx.status = 200;
      ctx.body = "Skill deleted: " + skill.id;
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Error: " + error;
    }
  }
);

export default router;
