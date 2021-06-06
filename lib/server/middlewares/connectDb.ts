import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import type { NextMiddleware } from "next-api-middleware"

let existingConnection: Promise<typeof mongoose> | undefined

export const connect = async (databaseUrl?: string) => {
  if (mongoose.connections[0].readyState) {
    return
  }

  if (!existingConnection) {
    if (!databaseUrl) {
      const mongoMemoryServer = new MongoMemoryServer()
      const uri = await mongoMemoryServer.getUri()
      console.info(`Mongo Memory Server: ${uri}`)
      databaseUrl = uri
    }

    existingConnection = mongoose.connect(databaseUrl, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }

  await existingConnection
}

// noinspection JSUnusedGlobalSymbols
/**
 * A middleware for connecting to the database. The database url if not passed
 * it uses the environment variable DATABASE_URL, but if it exists it will
 * create a mongodb memory server for testing purposes.
 */
export const connectDb: (databaseUrl?: string) => NextMiddleware =
  (databaseUrl?: string) => async (req, res, next) => {
    await withDb(next, databaseUrl)()
  }

export const withDb =
  <T extends Function>(callback: T, databaseUrl = process.env.DATABASE_URL) =>
  async (...props) => {
    await connect(databaseUrl)
    return callback(...props)
  }
