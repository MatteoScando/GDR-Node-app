import Koa from "koa";
import Router from "@koa/router";
import { config } from "dotenv";

// Init "dotenv"
config();

const app = new Koa();
const router = new Router();

router.get("/", (ctx) => {
  ctx.body = "add(1, 2)";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 3000);