import Koa from "koa";
import Router from "@koa/router";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client"

dotenv.config();

const app = new Koa();
const router = new Router();
const prisma = new PrismaClient();

router.get("/", (ctx) => {
  // const character = {
    
  // }
  ctx.body = "add(1, 2)";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 3000);