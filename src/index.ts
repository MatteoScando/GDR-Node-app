import Koa from "koa";
import Router from "@koa/router";
import dotenv from "dotenv";
import characterRoutes from "./routes/character";
import attribureRoutes from "./routes/attribute";
import raceAttrModRoutes from "./routes/raceAttrMod";
import classRoutes from "./routes/class";
import bodyParser from "koa-bodyparser";
import classSkillModRoutes from "./routes/classSkillMod";

dotenv.config();

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get("/", (ctx) => {
    ctx.response.body = "GDR Node";
});

app.use(characterRoutes.routes()).use(characterRoutes.allowedMethods());
app.use(attribureRoutes.routes()).use(attribureRoutes.allowedMethods());
app.use(classSkillModRoutes.routes()).use(classSkillModRoutes.allowedMethods());
app.use(raceAttrModRoutes.routes()).use(raceAttrModRoutes.allowedMethods());
app.use(classRoutes.routes()).use(classRoutes.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.APP_PORT || 3000, () => {
  console.log(`HTTP Server running on http://localhost:${process.env.APP_PORT}`);
});
