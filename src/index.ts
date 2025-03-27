import Koa from "koa";
import Router from "@koa/router";
import dotenv from "dotenv";
import characterRoutes from "./routes/character.js";
import bodyParser from "koa-bodyparser";

dotenv.config();

const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(characterRoutes.routes()).use(characterRoutes.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.APP_PORT || 3000);