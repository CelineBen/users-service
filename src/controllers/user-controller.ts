import * as Koa from "koa";

export function create(ctx: Koa.Context, next: any) {
  try {
    ctx.response.status = 200;
    ctx.response.body = 'User created';
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.body = `Error while creating a user: ${e.message}`;
  }
}