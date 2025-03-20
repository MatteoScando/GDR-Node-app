import Koa from 'koa';
import Router from '@koa/router';
import { config } from 'dotenv';

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'AST, Non ce ne frega un cazzo dei sigilli!';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 3000);