import Router from "@koa/router";
import prisma from "../../prisma/client.js";

const router = new Router({
        prefix: "/character"
});

//GET

router.get("/", async (ctx)=>{
    const characters = await prisma.character.findMany();
    ctx.status = 200;
    ctx.body = characters;
})