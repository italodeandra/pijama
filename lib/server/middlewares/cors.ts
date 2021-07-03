import ConfigCors, { CorsOptions } from "cors"
import type { NextMiddleware } from "next-api-middleware"

/**
 * The CORS middleware.
 */
const cors: (config?: CorsOptions) => NextMiddleware =
  (config) => async (req, res, next) => {
    await new Promise((resolve) =>
      ConfigCors({
        origin: "*",
        ...config,
      })(req, res, resolve)
    )
    await next()
  }

export default cors
