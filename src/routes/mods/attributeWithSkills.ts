import Router from "@koa/router";
import prisma from "../../../prisma/client";
import { Attribute, Skill, USER_ROLE } from "@prisma/client";
import { authUser, userRole } from "../../middlewares/middlewareAuth";

const router = new Router({
  prefix: "/attribute",
});

// GET /attribute/with/skills get all attributes
router.get(
  "/with/skills",
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    try {
      const attributes: Attribute[] = await prisma.attribute.findMany({
        include:{
          skill: true,
        },
      });
      ctx.status = 201;
      ctx.body = attributes;
    } catch (error) {
      ctx.status = 500;
      ctx.body = {error: "Unable to retrive attributes"};
    }
  }
);

router.get(
    "/:id/with/skills",
    authUser,
    (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
    async (ctx) => {
      const id = ctx.params.id;
  
      try {
        const attribute = await prisma.attribute.findUnique({
          where: {
            id: id,
          },
          include:{
            skill: true,
          },
        });

        if (!attribute) {
          ctx.status = 404;
          ctx.body = {error: "Attribute not found"};
          return;
        } else {
          ctx.status = 201;
          ctx.body = attribute;
        }
      } catch (error) {
        ctx.status = 500;
        ctx.body = {error: "Unable to retrive attribute"};
      }
    }
  );

export default router;