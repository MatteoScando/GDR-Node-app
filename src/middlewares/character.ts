import { Context, Next } from "koa";
import prisma from "../../prisma/client.js";

export const checkCharacterExist = async (ctx: Context, next: Next) =>{
    const id = ctx.params.id;
    try {
        const character = await prisma.character.findUnique({
          where:{
            id: id,
          }
        });
    
        if(!character){
          ctx.status = 404;
          ctx.body = "Character not found";
          return;
        }
        await next();

    } catch (err) {
        ctx.status= 500;
        ctx.body ="Error: "+ err;
    }
}