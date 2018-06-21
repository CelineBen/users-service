# Description
Minimalist service using Koa (https://koajs.com/)

Feel free to change for Express

Please structure the application however you wants

# Task:
Non-exhaustive list, feel free to implements anything you want.
This is not a mandatory list, do what you can in the specified time, and favorise quality over quantity.
- Implement endpoint to create a user:
 - Accept username and password
 - Add payload validation (presence of username and password, username? password validation?)
 - Implement error handling
 - Add persistence of the Users (Choose the persistency method)
- Apply security best practices for password storage
- Generate Auth Token (JWT (https://jwt.io/), or other)
- Add production grade monitoring tools (Request logging (https://github.com/winstonjs/winston, ...)? APM (https://newrelic.com/, ...)? error reporting (https://sentry.io/welcome/, ...)? )
- Dockerise application
- Implement CI/CD
- ... etc.
