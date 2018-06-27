import * as Koa from "koa";

export function create(ctx: Koa.Context, next: any) {
  ctx.response.status = 200;
  ctx.response.body = 'User created';
}