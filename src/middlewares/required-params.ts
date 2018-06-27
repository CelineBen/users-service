import * as Koa from 'koa';
import * as _ from 'lodash';

export default (requiredParams: string[]) => async (ctx: Koa.Context, next: any) => {
  const bodyParams: any = _.get(ctx, 'request.body', {});
  const missing = _.filter(requiredParams, (param) => _.isEmpty(bodyParams[param]));

  if (_.isEmpty(missing)) {
    await next();
  } else {
    ctx.response.status = 400;
    ctx.response.body = `Request is missing some required parameters: ${_.join(missing, ', ')}`;
  }
};