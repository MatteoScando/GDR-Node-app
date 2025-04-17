import Router from "@koa/router";
import prisma from "../../prisma/client";
import { RaceAttrMod, USER_ROLE } from "@prisma/client";
import { RaceAttrModSchema } from "../../prisma/validation/validationRaceAttrMod";
import { validationError } from "../utilities/errorsHandler";
import { raceAttrModExsist } from "../middlewares/middlewareRaceAttrMod";
import { ZodError } from "zod";
import { authUser, userRole } from "../middlewares/middlewareAuth";
import { raceExists } from "../middlewares/middlewareRace";
import { authJWT } from "../middlewares/middlewareJWT";

const router = new Router();

// GET /: retrive all races attribute mode
/**
 *  @swagger
 *  /race/attr/mod:
 *    get:
 *      summary: Get all Race Attribute Modifiers
 *      description: Retrieves a list of all Race Attribute Modifiers from the database.
 *      tags:
 *        - raceAttrMod
 *      responses:
 *        200:
 *          description: A list of Race Attribute Modifiers
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/RaceAttrMod'
 *        500:
 *          description: Internal server error
 */
router.get(
  "/race/attr/mod",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    try {
      const raceAttrMod = await prisma.raceAttrMod.findMany();
      ctx.status = 201;
      ctx.body = raceAttrMod;
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Error: " + error;
    }
  }
);

// GET /: retrive a single attribute mode
/**
 *  @swagger
 *  /race/{idRace}/attr/{idAttribute}:
 *    get:
 *      summary: Get a specific Race Attribute Modifier
 *      description: Retrieves a single Race Attribute Modifier based on Race and Attribute IDs.
 *      tags:
 *        - raceAttrMod
 *      parameters:
 *        - in: path
 *          name: idRace
 *          required: true
 *          schema:
 *            type: string
 *          description: The ID of the race
 *        - in: path
 *          name: idAttribute
 *          required: true
 *          schema:
 *            type: string
 *          description: The ID of the attribute
 *      responses:
 *        200:
 *          description: The requested Race Attribute Modifier
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RaceAttrMod'
 *        400:
 *          description: Bad request, missing parameters
 *        401:
 *          description: Unauthorized operation
 *          $ref: '#/components/responses/UnauthorizedError'
 *        404:
 *          description: Race Attribute Modifier not found
 *        500:
 *          description: Internal server error
 */
router.get(
  "/race/:idRace/attr/:idAttribute",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    try {
      ctx.request.body = RaceAttrModSchema.parse(ctx.request.body);
      const data = ctx.request.body as RaceAttrMod;

      const idRace = ctx.params.idRace;
      const idAttribute = ctx.params.idAttribute;

      if (!idRace || !idAttribute) {
        ctx.status = 400;
        ctx.body = "Error: idRace and idAttribute are required";
        return;
      }

      const raceAttrMod = await prisma.raceAttrMod.findUnique({
        where: {
          idRace_idAttribute: {
            idRace: idRace,
            idAttribute: idAttribute,
          },
        },
      });

      if (!raceAttrMod) {
        ctx.status = 404;
        ctx.body = "raceAttribute not found";
      }

      ctx.status = 200;
      ctx.body = raceAttrMod;
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

// POST /: create a raceAttrMod
/**
 *  @swagger
 *  /race/{idRace}/attr/{idAttribute}:
 *    post:
 *      summary: Create a new Race Attribute Modifier
 *      description: Creates a new modifier linking a race to an attribute with a given value.
 *      tags:
 *        - raceAttrMod
 *      parameters:
 *        - in: path
 *          name: idRace
 *          required: true
 *          schema:
 *            type: string
 *        - in: path
 *          name: idAttribute
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                value:
 *                  type: integer
 *                  description: The modifier value
 *      responses:
 *        201:
 *          description: Race Attribute Modifier created successfully
 *        400:
 *          description: Bad request, missing parameters
 *        401:
 *          description: Unauthorized operation
 *          $ref: '#/components/responses/UnauthorizedError'
 *        500:
 *          description: Internal server error
 */
router.post(
  "/race/:idRace/attr/:idAttribute",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    try {
      ctx.request.body = RaceAttrModSchema.parse(ctx.request.body);
      const data = ctx.request.body as RaceAttrMod;

      const idRace = ctx.params.idRace;
      const idAttribute = ctx.params.idAttribute;

      if (!idRace || !idAttribute) {
        ctx.status = 400;
        ctx.body = "Error: idRace and idAttribute are required";
        return;
      }

      try {
        const raceAttrMod = await prisma.raceAttrMod.create({
          data: {
            idRace: idRace,
            idAttribute: idAttribute,
            value: data.value,
          },
        });

        ctx.status = 201;
        ctx.body =
          "Race Attribute Relation created: " +
          "idRace: " +
          raceAttrMod.idRace +
          "idAttribute: " +
          raceAttrMod.idAttribute;
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

// PATCH /: update a raceAttrMod
/**
 *  @swagger
 *  /race/{idRace}/attr/{idAttribute}:
 *    patch:
 *      summary: Update a Race Attribute Modifier
 *      description: Updates the value of an existing Race Attribute Modifier.
 *      tags:
 *        - raceAttrMod
 *      parameters:
 *        - in: path
 *          name: idRace
 *          required: true
 *          schema:
 *            type: string
 *        - in: path
 *          name: idAttribute
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                value:
 *                  type: integer
 *                  description: The updated modifier value
 *      responses:
 *        200:
 *          description: Race Attribute Modifier updated successfully
 *        400:
 *          description: Bad request, missing parameters
 *        401:
 *          description: Unauthorized operation
 *          $ref: '#/components/responses/UnauthorizedError'
 *        500:
 *          description: Internal server error
 */
router.patch(
  "/race/:idRace/attr/:idAttribute",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  raceAttrModExsist,
  async (ctx) => {
    try {
      ctx.request.body = RaceAttrModSchema.parse(ctx.request.body);
      const data = ctx.request.body as RaceAttrMod;

      const idRace = ctx.params.idRace;
      const idAttribute = ctx.params.idAttribute;

      if (!idRace || !idAttribute) {
        ctx.status = 400;
        ctx.body = "Error: idRace and idAttribute are required";
        return;
      }

      try {
        const raceAttrMod = await prisma.raceAttrMod.update({
          where: {
            idRace_idAttribute: {
              idRace: idRace,
              idAttribute: idAttribute,
            },
          },
          data: {
            value: data.value,
          },
        });

        ctx.status = 200;
        ctx.body =
          "Race Attribute Relation updated: " +
          "idRace: " +
          raceAttrMod.idRace +
          "idAttribute: " +
          raceAttrMod.idAttribute;
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

// DELETE /: delete a raceAttrMod
/**
 *  @swagger
 *  /race/{idRace}/attr/{idAttribute}:
 *    delete:
 *      summary: Delete a Race Attribute Modifier
 *      description: Deletes an existing Race Attribute Modifier based on Race and Attribute IDs.
 *      tags:
 *        - raceAttrMod
 *      parameters:
 *        - in: path
 *          name: idRace
 *          required: true
 *          schema:
 *            type: string
 *        - in: path
 *          name: idAttribute
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Race Attribute Modifier deleted successfully
 *        400:
 *          description: Bad request, missing parameters
 *        401:
 *          description: Unauthorized operation
 *          $ref: '#/components/responses/UnauthorizedError'
 *        500:
 *          description: Internal server error
 */
router.delete(
  "/race/:idRace/attr/:idAttribute",
  authJWT,
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  raceAttrModExsist,
  async (ctx) => {
    try {
      ctx.request.body = RaceAttrModSchema.parse(ctx.request.body);
      const data = ctx.request.body as RaceAttrMod;

      const idRace = ctx.params.idRace;
      const idAttribute = ctx.params.idAttribute;

      if (!idRace || !idAttribute) {
        ctx.status = 400;
        ctx.body = "Error: idRace and idAttribute are required";
        return;
      }

      try {
        const raceAttrMod = await prisma.raceAttrMod.delete({
          where: {
            idRace_idAttribute: {
              idRace: idRace,
              idAttribute: idAttribute,
            },
          },
        });

        ctx.status = 200;
        ctx.body = "Race Attribute Relation deleted correctly";
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

// TODO: set swagger annotation
// GET /race/:idRace/attr get a race with relative attributes
router.get(
  "/race/:idRace/attr",
  authJWT,
  authUser,
  raceExists,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    const idRace = ctx.params.idRace;

    try {
      const race = await prisma.raceAttrMod.findMany({
        where: {
          idRace,
        },
        include: {
          attribute: true,
        },
      });

      if (!race) {
        ctx.status = 404;
        ctx.body = { error: "Race not found" };
        return;
      } else {
        ctx.status = 201;
        ctx.body = race;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: `Unable to find the requested race information` };
    }
  }
);

/**
 *  @swagger
 *  components:
 *    schemas:
 *      RaceAttrMod:
 *        type: object
 *        properties:
 *          idRace:
 *            type: string
 *            format: uuid
 *            description: The ID of the race
 *          idAttribute:
 *            type: string
 *            format: uuid
 *            description: The ID of the attribute
 *          value:
 *            type: integer
 *            description: The modifier value for the attribute
 *        required:
 *          - idRace
 *          - idAttribute
 *          - value
 *      securitySchemes:
 *        cookieAuth:
 *          type: apiKey
 *          in: cookie
 *          name: sessionId
 *      responses:
 *        UnauthorizedError:
 *          description: Access token is missing or invalid
 *          content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Unauthorized access"
 */

export default router;
