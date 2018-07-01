import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as userController from './user-controller';
import required from './middlewares/required-params';
import startDB from './database';

const app = new Koa();
const router = new Router();

startDB();

router.get('/health', (ctx: any, next: Function) => {
  ctx.response.status = 200;
  ctx.response.body = {};
});

router.post('/users', required(['username', 'password']), userController.create);
router.post('/session', required(['username', 'password']), userController.authenticate);

process.on('uncaughtException', () => process.exit());
process.on('unhandledRejection', () => process.exit());

app.on('error', (ctx: any) => {
  ctx.response.status = 500;
  ctx.response.body = 'Internal Server Error';
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(5000);
