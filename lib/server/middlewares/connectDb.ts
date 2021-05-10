import type { NextMiddleware } from "next-api-middleware"

let existingConnect: Promise<typeof import("mongoose")>

// noinspection JSUnusedGlobalSymbols
/**
 * A middleware for connecting to the database. The database url if not passed
 * it uses the environment variable DATABASE_URL, but if it exists it will
 * create a mongodb memory server for testing purposes.
 */
export const connectDb: (databaseUrl?: string) => NextMiddleware =
  (databaseUrl = process.env.DATABASE_URL) =>
  async (req, res, next) => {
    const { default: mongoose } = await import("mongoose")
    const { MongoMemoryServer } = await import("mongodb-memory-server")

    if (mongoose.connections[0].readyState) {
      return next()
    }

    if (!databaseUrl) {
      const mongoMemoryServer = new MongoMemoryServer()
      const uri = await mongoMemoryServer.getUri()
      console.info(`Mongo Memory Server: ${uri}`)
      databaseUrl = uri
    }

    if (!existingConnect) {
      existingConnect = mongoose.connect(databaseUrl, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    }

    await existingConnect

    await next()
  }
