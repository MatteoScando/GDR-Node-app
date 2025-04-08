import Router from "@koa/router";
import { authUser } from "../middlewares/middlewareAuth";

const router = new Router({
  prefix: "/me",
});

// GET /: get user information
router.get("/", authUser, async (ctx) => {
  const user = ctx.state.user;

  if (!user) {
    ctx.status = 401;
    ctx.body = { error: "Unauthorized" };
    return;
  }

  ctx.status = 200;
  ctx.body = user;
});

export default router;
