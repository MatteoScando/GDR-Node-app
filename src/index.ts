import Koa from "koa";
import Router from "@koa/router";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import characterRoutes from "./routes/character.js";

dotenv.config();

const app = new Koa();
const router = new Router();
const prisma = new PrismaClient();

router.post("/character", async (ctx) => {
  const character = await prisma.character.create({
    data: {
      name: "Name 1",
      age: 30,
    },
  });

  ctx.status = 201;
  ctx.body = "Character created: " + character.id;
});

app.use(characterRoutes.routes()).use(characterRoutes.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.APP_PORT || 3000);