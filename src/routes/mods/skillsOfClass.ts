import Router from "@koa/router";
import prisma from "../../../prisma/client";
import { ClassSkillMod, USER_ROLE } from "@prisma/client";
import { authUser, userRole } from "../../middlewares/middlewareAuth";

const router = new Router({
  prefix: "/skills/of/class"
});

// GET /skills/of/class/:id: get single class with relative skills
router.get(
  "/:id",
  authUser,
  (ctx, next) => userRole(ctx, next, USER_ROLE.ADMIN),
  async (ctx) => {
    const id = ctx.params.id;

    try {
      const skills: ClassSkillMod[] = await prisma.classSkillMod.findMany({
        where: {
          idClass: id,
        },
        include:{
          skill:true
        }
      });

      if (!skills) {
        ctx.status = 404;
        ctx.body = { error: "class not found"};
        return;
      } else {
        ctx.status = 201;
        ctx.body = skills;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Unable to find the requested class information" };
    }
  }
);

export default router;