import { Client } from "minio";
import getConfig from "next/config";

const config = getConfig();
const { s3 } = config?.serverRuntimeConfig || {};

declare global {
  // noinspection ES6ConvertVarToLetConst,JSUnusedGlobalSymbols
  var minio: {
    conn: Client | null;
  };
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.minio;

if (!cached) {
  cached = global.minio = { conn: null };
}

export default async function connectToFileStorage(): Promise<Client> {
  if (cached.conn) {
    return cached.conn;
  }

  cached.conn = new Client({
    endPoint: s3.endPoint,
    useSSL: s3.useSSL,
    accessKey: s3.accessKey,
    secretKey: s3.secretKey,
  });

  if (!(await cached.conn.bucketExists(s3.bucketName))) {
    await cached.conn.makeBucket(s3.bucketName, s3.region);
  }

  return cached.conn;
}
