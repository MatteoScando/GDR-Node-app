import Router from "@koa/router";
import prisma from "../../../prisma/client";
import { RaceAttrMod, USER_ROLE } from "@prisma/client";
import { authUser, userRole } from "../../middlewares/middlewareAuth";

const router = new Router({
  prefix: "/attributes/of/race",
});

// GET /attributes/of/race/:id get a race with relative attributes
router.get(
  "/:id",
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    const id = ctx.params.id;

    try {
      const attributes: RaceAttrMod[] = await prisma.raceAttrMod.findMany({
        where: {
          idRace: id,
        },
        include:{
          attribute: true,
        },
      });

      if (!attributes) {
        ctx.status = 404;
        ctx.body = { error: "Race not found"};
        return;
      } else {
        ctx.status = 201;
        ctx.body = attributes;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: `Unable to find the requested race information` };
    }
  }
);

export default router;