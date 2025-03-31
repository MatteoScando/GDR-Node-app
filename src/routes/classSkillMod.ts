import Router from "@koa/router";
import prisma from "../../prisma/client";
import { ClassSkillMod } from "@prisma/client";
import { classSkillModSchema } from "../../prisma/validation/validationClassSkillMod";
import { ZodError } from "zod";
import { validationError } from "../utilities/errorsHandler";

const router = new Router({
  prefix: "/classSkill",
});

// GET /: retrive all characters
router.get("/", async (ctx) => {
  try {
    const data = await prisma.classSkillMod.findMany();
    ctx.status = 201;
    ctx.body = data;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Error: " + error;
  }
});

// POST /: create a character
router.post("/", async (ctx) => {
  try {
    ctx.request.body = classSkillModSchema.parse(ctx.request.body);
    const data = ctx.request.body as ClassSkillMod;

    try {
      const classSkillPivot = await prisma.classSkillMod.create({
        data: {
          idSkill: data.idSkill,
          idClass: data.idClass,
          value: data.value,
        },
      });

      ctx.status = 201;
      ctx.body =
        "Pivot table of Class and Skill created: Class -> " +
        classSkillPivot.idClass +
        " Skill -> " +
        classSkillPivot.idSkill;
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

export default router;
