/* eslint-disable no-var */

import { Db, MongoClient, MongoClientOptions, Collection } from "mongodb";
import getConfig from "next/config";

type DatabaseConnect = { client: MongoClient; db: Db; uri: string };

declare global {
  // noinspection ES6ConvertVarToLetConst,JSUnusedGlobalSymbols
  var mongo: {
    conn: DatabaseConnect | null;
    promise: Promise<DatabaseConnect> | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collections: Record<string, Collection<any>>;
  };
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null, collections: {} };
}

export default async function connectToDatabase(): Promise<DatabaseConnect> {
  const config = getConfig();
  const { mongodbUri, appEnv } = config.serverRuntimeConfig || {};

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options: MongoClientOptions = {};

    let uri = mongodbUri;
    /**
     * Starts and connects to a MongoDB Memory Server if missing the URI and not on production
     */
    if (!uri && appEnv !== "production") {
      const { MongoMemoryServer } = await import("mongodb-memory-server");

      const mongod = await MongoMemoryServer.create({
        instance: { port: 5432 },
      });
      uri = mongod.getUri();
      console.info("Started a MongoDB Memory Server at", uri);
    }

    if (!uri) {
      throw new Error("Please define the MONGODB_URI environment variable");
    }

    cached.promise = MongoClient.connect(uri, options).then((client) => {
      return {
        client,
        db: client.db(),
        uri,
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
