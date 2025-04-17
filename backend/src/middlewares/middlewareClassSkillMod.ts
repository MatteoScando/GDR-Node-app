import { Context, Next } from "koa";
import prisma from "../../prisma/client";
import { classSkillModSchema } from "../../prisma/validation/validationClassSkillMod";

export const classSkillModExists = async (ctx: Context, next: Next) => {
    const idClass = ctx.params.idClass;
    const idSkill = ctx.params.idSkill;

    if (!idClass || !idSkill) {
        ctx.status = 400;
        ctx.body = "Error: idClass and idSkill are required";
        return;
    }

    try {
        const data = await prisma.classSkillMod.findUnique({
            where: {
                idSkill_idClass:{
                    idClass: idClass,
                    idSkill: idSkill,
                }
            },
        });

        if (!data) {
            ctx.status = 404;
            ctx.body = "not found";
            return;
        } else {
            next();
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Error: " + error;
    }
}