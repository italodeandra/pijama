import type { NextMiddleware } from "next-api-middleware"

let existingConnect: Promise<typeof import("mongoose")>

// noinspection JSUnusedGlobalSymbols
export const connectDb: (databaseUrl?: string) => NextMiddleware = (
  databaseUrl
) => async (req, res, next) => {
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
