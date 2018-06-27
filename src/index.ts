import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();

router.get('/health', (ctx: any, next: Function) => {
  ctx.response.status = 200;
  ctx.response.body = {};
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(5000);
