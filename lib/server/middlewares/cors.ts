import ConfigCors, { CorsOptions } from "cors"
import { NextMiddleware } from "next-api-middleware"

// noinspection JSUnusedGlobalSymbols
/**
 * The CORS middleware.
 */
export const cors: (config?: CorsOptions) => NextMiddleware =
  (config) => async (req, res, next) => {
    await new Promise((resolve) =>
      ConfigCors({
        origin: "*",
        ...config,
      })(req, res, resolve)
    )
    await next()
  }
