import Router from "@koa/router";
import prisma from "../../prisma/client";
import { Class, USER_ROLE } from "@prisma/client";
import { ZodError } from "zod";
import { validationError } from "../utilities/errorsHandler";
import { classSchema } from "../../prisma/validation/validationClass";
import { classExists } from "../middlewares/middlewareClass";
import { authUser, userRole } from "../middlewares/middlewareAuth";
import { authJWT } from "../middlewares/middlewareJWT";

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API per la gestione delle classi
 */

const router = new Router({
  prefix: "/class",
});

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Ottieni tutte le classi
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: Lista di tutte le classi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       500:
 *         description: Errore interno del server
 */

// GET /: retrieve all classes
router.get(
  "/",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    try {
      const classes = await prisma.class.findMany();
      ctx.status = 201;
      ctx.body = classes;
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Error: " + error;
    }
  }
);

/**
 * @swagger
 * /class:
 *   post:
 *     summary: Crea una nuova classe
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassInput'
 *     responses:
 *       201:
 *         description: Classe creata con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */

// POST /: create a class
router.post(
  "/",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
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
  }
);

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Ottieni una classe per ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della classe
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dettagli della classe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Classe non trovata
 *       500:
 *         description: Errore interno del server
 */

// GET /:id: get single class
router.get(
  "/:id",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
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
  }
);

/**
 * @swagger
 * /class/{id}:
 *   patch:
 *     summary: Aggiorna una classe esistente
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della classe da aggiornare
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Classe aggiornata con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Classe non trovata
 *       500:
 *         description: Errore interno del server
 */

// PATCH /:id: update single class
router.patch(
  "/:id",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  classExists,
  async (ctx) => {
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
  }
);

/**
 * @swagger
 * /class/{id}:
 *   delete:
 *     summary: Elimina una classe
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della classe da eliminare
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Classe eliminata con successo
 *       404:
 *         description: Classe non trovata
 *       500:
 *         description: Errore interno del server
 */

// DELETE /:id: delete single class
router.delete(
  "/:id",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  classExists,
  async (ctx) => {
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
  }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       required:
 *         - name
 *         - key
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: L'ID univoco della classe
 *         name:
 *           type: string
 *           description: Il nome della classe
 *         key:
 *           type: string
 *           description: La chiave univoca della classe
 *         description:
 *           type: string
 *           description: Descrizione della classe
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: La data di creazione della classe
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: La data dell'ultimo aggiornamento della classe
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ClassInput:
 *       type: object
 *       required:
 *         - name
 *         - key
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: Il nome della classe
 *         key:
 *           type: string
 *           description: La chiave univoca della classe
 *         description:
 *           type: string
 *           description: Descrizione della classe
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: La data di creazione della classe
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: La data dell'ultimo aggiornamento della classe
 */

export default router;
