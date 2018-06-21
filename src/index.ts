import * as Koa from 'koa';
import * as Router from 'koa-router';

const app = new Koa();
var router = new Router();

router.get('/health', (ctx: any, next: Function) => {
  ctx.response.status = 200;
  ctx.response.body = {};
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(5000);
