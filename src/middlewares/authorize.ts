import * as Koa from 'koa';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';

const STATUS_CODE_UNAUTHORIZED = 401;
const TOKEN_TYPE = 'JWT';

export default () => async (ctx: Koa.Context, next: any) => {
  try {
    const authorization = _.  get(ctx, 'req.headers.authorization', '').split(' ');
    if (authorization[0] === TOKEN_TYPE) {
      const key = fs.readFileSync('private.key');
      const decoded = jwt.verify(authorization[1], key);
      if (decoded) {
        ctx.state.user = decoded;
        await next();
      }
    } else {
      ctx.response.status = STATUS_CODE_UNAUTHORIZED;
    }
  } catch(e) {
    ctx.response.status = STATUS_CODE_UNAUTHORIZED;
    console.log(`Error verifying Auth Token: ${e.message}`);
  }
};