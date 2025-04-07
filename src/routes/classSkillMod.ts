import Router from "@koa/router";
import prisma from "../../prisma/client";
import { ClassSkillMod, USER_ROLE } from "@prisma/client";
import { classSkillModSchema } from "../../prisma/validation/validationClassSkillMod";
import { ZodError } from "zod";
import { validationError } from "../utilities/errorsHandler";
import { classSkillModExists } from "../middlewares/middlewareClassSkillMod";
import { authUser, userRole } from "../middlewares/middlewareAuth";
import { classExists } from "../middlewares/middlewareClass";

const router = new Router();

// GET /: retrive all class/skill mods
/**
 * @swagger
 * /class/skill/mod:
 *   get:
 *     summary: Retrieve all class/skill mods
 *     description: Returns a list of all class/skill modifications
 *     tags:
 *       - Class Skill Modifications
 *     responses:
 *       201:
 *         description: Class/skill mods retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ClassSkillMod'
 *                 message:
 *                   type: string
 *                   example: Class/skill mods retrieved successfully
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - User does not have admin role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  "/class/skill/mod",
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    try {
      const data = await prisma.classSkillMod.findMany();
      ctx.status = 201;
      ctx.body =  { 
        data: data,
        message: "Class/skill mods retrieved successfully",
       };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Unable to retrieve class/skill mods" };
    }
  }
);

// POST /class/:idClass/skill/:idSkill: create a modificator for class/skill
/**
 * @swagger
 * /class/{idClass}/skill/{idSkill}:
 *   post:
 *     summary: Create a new class/skill modification
 *     description: Creates a new modification value for a specific class and skill combination
 *     tags:
 *       - Class Skill Modifications
 *     parameters:
 *       - in: path
 *         name: idClass
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the class
 *       - in: path
 *         name: idSkill
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the skill
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassSkillModInput'
 *     responses:
 *       201:
 *         description: Class/skill mod created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Class/skill mod created successfully
 *                 data:
 *                   $ref: '#/components/schemas/ClassSkillMod'
 *       400:
 *         description: Bad request - Missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - User does not have admin role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/class/:idClass/skill/:idSkill",
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    try {
      ctx.request.body = classSkillModSchema.parse(ctx.request.body);
      const data = ctx.request.body as ClassSkillMod;

      const idClass = ctx.params.idClass;
      const idSkill = ctx.params.idSkill;

      if (!idClass || !idSkill) {
        ctx.status = 400;
        ctx.body = { error: "idClass and idSkill are required" };
        return;
      }

      try {
        const classSkillPivot = await prisma.classSkillMod.create({
          data: {
            idSkill: idSkill,
            idClass: idClass,
            value: data.value,
          },
        });

        ctx.status = 201;
        ctx.body = {
          message: "Class/skill mod created successfully",
          data: classSkillPivot,
        };
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: "Unable to create class/skill mod"};
      }
    } catch (error) {
      ctx.status = 500;
      if (error instanceof ZodError) {
        ctx.body = { error: validationError(error)};
      } else {
        ctx.body = { error: "Unable to create class/skill mod" };
      }
    }
  }
);

// GET /class/:idClass/skill/:idSkill: return a single class/skill mods
/**
 * @swagger
 * /class/{idClass}/skill/{idSkill}:
 *   get:
 *     summary: Retrieve a single class/skill modification
 *     description: Returns a specific class/skill modification by class ID and skill ID
 *     tags:
 *       - Class Skill Modifications
 *     parameters:
 *       - in: path
 *         name: idClass
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the class
 *       - in: path
 *         name: idSkill
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the skill
 *     responses:
 *       201:
 *         description: Class/skill mod retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassSkillMod'
 *       400:
 *         description: Bad request - Missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - User does not have admin role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Not found - Class/skill modification not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  "/class/:idClass/skill/:idSkill",
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    const idClass = ctx.params.idClass;
    const idSkill = ctx.params.idSkill;

    if (!idClass || !idSkill) {
      ctx.status = 400;
      ctx.body = { error: "idClass and idSkill are required" };
      return;
    }

    try {
      const data = await prisma.classSkillMod.findUnique({
        where: {
          idSkill_idClass: {
            idClass: idClass,
            idSkill: idSkill,
          },
        },
      });

      if (!data) {
        ctx.status = 404;
        ctx.body = { error: "not found" };
        return;
        
      } else {
        ctx.status = 201;
        ctx.body = data;
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = {error: "Unable to retrieve class/skill modification data"};
    }
  }
);

// PATCH /:id: update single class/skill mod
/**
 * @swagger
 * /class/{idClass}/skill/{idSkill}:
 *   patch:
 *     summary: Update a class/skill modification
 *     description: Updates the value of a specific class/skill modification
 *     tags:
 *       - Class Skill Modifications
 *     parameters:
 *       - in: path
 *         name: idClass
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the class
 *       - in: path
 *         name: idSkill
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the skill
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassSkillModInput'
 *     responses:
 *       201:
 *         description: Class/skill modification updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Class/skill modification updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/ClassSkillMod'
 *       400:
 *         description: Bad request - Missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - User does not have admin role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Not found - Class/skill modification not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch(
  "/class/:idClass/skill/:idSkill",
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  classSkillModExists,
  async (ctx) => {
    const idClass = ctx.params.idClass;
    const idSkill = ctx.params.idSkill;
    const data = ctx.request.body as ClassSkillMod;

    try {
      const classSkillMod = await prisma.classSkillMod.update({
        where: {
          idSkill_idClass: {
            idClass: idClass,
            idSkill: idSkill,
          },
        },
        data: {
          value: data.value,
        },
      });

      ctx.status = 201;
      ctx.body = { 
        message : "Class/skill modification updated successfully", 
        data: classSkillMod
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Unable to update class/skill modification" };
    }
  }
);

// DELETE /:id: delete single class/skill mod
/**
 * @swagger
 * /class/{idClass}/skill/{idSkill}:
 *   delete:
 *     summary: Delete a class/skill modification
 *     description: Deletes a specific class/skill modification by class ID and skill ID
 *     tags:
 *       - Class Skill Modifications
 *     parameters:
 *       - in: path
 *         name: idClass
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the class
 *       - in: path
 *         name: idSkill
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the skill
 *     responses:
 *       201:
 *         description: Class/skill modification deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Class/skill modification deleted successfully
 *                 data:
 *                   $ref: '#/components/schemas/ClassSkillMod'
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - User does not have admin role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Not found - Class/skill modification not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete(
  "/class/:idClass/skill/:idSkill",
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  classSkillModExists,
  async (ctx) => {
    const idClass = ctx.params.idClass;
    const idSkill = ctx.params.idSkill;

    try {
      const classSkillMod = await prisma.classSkillMod.delete({
        where: {
          idSkill_idClass: {
            idClass: idClass,
            idSkill: idSkill,
          },
        },
      });

      ctx.status = 201;
      ctx.body = { 
        message: "Class/skill modification deleted successfully", 
        data: classSkillMod
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Unable to delete class/skill modification" };
    }
  }
);

// GET /class/:idClass/skill: get single class with relative skills
router.get(
  "/class/:idClass/skill",
  authUser,
  classExists,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    const idClass = ctx.params.idClass;

    try {
      const clazz = await prisma.classSkillMod.findMany({
        where: {
          idClass,
        },
        include: {
          skill: true,
        },
      });

      if (!clazz) {
        ctx.status = 404;
        ctx.body = { error: "class not found" };
        return;
      } else {
        ctx.status = 201;
        ctx.body = clazz;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Unable to find the requested class information" };
    }
  }
);

export default router;

/**
 * @swagger
 *  components:
 *  schemas:
 *  
 *    Error:
 *      type: object
 *      properties:
 *        error:
 *          type: string
 * 
 *    ClassSkillMod:
 *      type: object
 *      properties:
 *        idSkill:
 *          type: string
 *          format: uuid
 *        idClass:
 *          type: string
 *          format: uuid
 *        value:
 *          type: integer
 * 
 *    ClassSkillModInput:
 *      type: object
 *      properties:
 *        value:
 *          type: integer
 *      required:
 *        - value
 */