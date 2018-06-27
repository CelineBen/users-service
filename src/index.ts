import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as userController from './controllers/user-controller';
import required from './middlewares/required-params';

const app = new Koa();
const router = new Router();

router.get('/health', (ctx: any, next: Function) => {
  ctx.response.status = 200;
  ctx.response.body = {};
});

router.post('/users', required(['username', 'password']), userController.create);

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(5000);
