"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
var router = new Router();
router.get('/health', (ctx, next) => {
    console.log('allo?');
    ctx.response.status = 200;
    ctx.response.body = {};
});
app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(5000);
//# sourceMappingURL=index.js.map