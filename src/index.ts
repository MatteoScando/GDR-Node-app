import Koa from "koa";
import Router from "@koa/router";
import dotenv from "dotenv";
import characterRoutes from "./routes/character.js";
import bodyParser from "koa-bodyparser";

dotenv.config();

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get("/", (ctx) => {
    ctx.response.body = "GDR Node app";
});

app.use(characterRoutes.routes()).use(characterRoutes.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.APP_PORT || 3000, () => {
    console.log(`HTTPS Server running on https://localhost:${process.env.APP_PORT}`);
});