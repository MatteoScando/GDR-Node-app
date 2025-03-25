import Koa from "koa";
import Router from "@koa/router";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client"

dotenv.config();

const app = new Koa();
const router = new Router();
const prisma = new PrismaClient();

router.get("/", async(ctx) => {
  const character = await prisma.character.create({
    data:{
      name: "Matteo",
      age: 22,
    }
  });
  ctx.body = "add(1, 2)";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.APP_PORT || 3000);