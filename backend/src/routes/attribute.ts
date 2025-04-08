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
 *   description: API per la gestione degli attributi
 */

const router = new Router({
  prefix: "/attribute",
});

/**
 * @swagger
 * /attribute:
 *   get:
 *     summary: Recupera tutti gli attributi
 *     tags: [Attribute]
 *     responses:
 *       200:
 *         description: Lista degli attributi recuperata con successo
 *       500:
 *         description: Errore del server
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
 *     summary: Crea un nuovo attributo
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
 *         description: Attributo creato con successo
 *       400:
 *         description: Errore di validazione
 *       500:
 *         description: Errore del server
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
 *     summary: Recupera un attributo singolo
 *     tags: [Attribute]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attributo recuperato con successo
 *       404:
 *         description: Attributo non trovato
 *       500:
 *         description: Errore del server
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
 *     summary: Aggiorna un attributo esistente
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
 *         description: Attributo aggiornato con successo
 *       404:
 *         description: Attributo non trovato
 *       500:
 *         description: Errore interno del server
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
 *     summary: Elimina un attributo
 *     tags: [Attribute]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'attributo da eliminare
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attributo eliminato con successo
 *       404:
 *         description: Attributo non trovato
 *       500:
 *         description: Errore interno del server
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
 *           description: ID univoco dell'attributo
 *         name:
 *           type: string
 *           description: Nome dell'attributo
 *         key:
 *           type: string
 *           description: Chiave univoca dell'attributo
 *         value:
 *           type: string
 *           description: Valore dell'attributo
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data di creazione dell'attributo
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data di ultima modifica dell'attributo
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
