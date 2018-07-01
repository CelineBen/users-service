import * as Koa from 'koa';
import * as _ from 'lodash';
import { userExists, createUser, isValidPassword } from './user-model';

const STATUS_CODE_CREATED = 201;
const STATUS_CODE_OK = 200;
const STATUS_CODE_UNPROCESSABLE_ENTITY = 422;
const STATUS_CODE_SERVER_ERROR = 500;

export async function create(ctx: Koa.Context, next: any) {
  try {
    const userData = _.get(ctx, 'request.body', {});

    if (await userExists(userData.username)) {
      ctx.response.status = STATUS_CODE_UNPROCESSABLE_ENTITY;
      ctx.response.body = 'Username already in use';
      return;
    }

    const user = await createUser(userData);
    user.password = undefined;
    ctx.response.status = STATUS_CODE_CREATED;
    ctx.response.body = user;
  } catch (e) {
    ctx.response.status = STATUS_CODE_SERVER_ERROR;
    ctx.response.body = `Error while creating a user: ${e.message}`;
  }
}

export async function authenticate(ctx: Koa.Context, next: any) {
  try {
    const userData = _.get(ctx, 'request.body', {});
    const validUsername = await userExists(userData.username);

    if (!validUsername) {
      ctx.response.status = STATUS_CODE_UNPROCESSABLE_ENTITY;
      ctx.response.body = 'Username does not exist';
      return;
    }

    const validPassword = await isValidPassword(userData.username, userData.password);

    if (validPassword) {
      ctx.response.status = STATUS_CODE_OK;
      ctx.response.body = 'token';
    } else {
      ctx.response.status = STATUS_CODE_UNPROCESSABLE_ENTITY;
      ctx.response.body = 'Invalid password';
    }

  } catch (e) {
    ctx.response.status = 500;
    ctx.response.body = `Error while trying to authenticate the user: ${e.message}`;
  }
}