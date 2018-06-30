import * as Koa from 'koa';
import * as _ from 'lodash';
import { userExists, createUser } from './user-model';

export async function create(ctx: Koa.Context, next: any) {
  try {
    const userData = _.get(ctx, 'request.body', {});
    if (await userExists(userData.username)) {
      ctx.response.status = 422;
      ctx.response.body = 'Username already in use';
      return;
    }
    const user = await createUser(userData);
    ctx.response.status = 200;
    ctx.response.body = user;
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.body = `Error while creating a user: ${e.message}`;
  }
}