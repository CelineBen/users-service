import * as Koa from 'koa';
import * as Router from 'koa-router';
var app = new Koa();
var router = new Router();
router.get('/health', function (ctx, next) {
    ctx.response.status = 200;
});
app.listen(5000);
//# sourceMappingURL=index.js.map