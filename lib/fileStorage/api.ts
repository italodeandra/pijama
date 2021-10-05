import { badRequest, internalServerError, notFound } from "../api/errors";
import { NextApiHandler } from "next";
import connectToFileStorage from "./connectToFileStorage";
import getConfig from "next/config";

export type GetFileArgs = {
  fileStorage?: [string, string];
};

const {
  serverRuntimeConfig: { s3 },
} = getConfig();

const handler: NextApiHandler<Buffer> = async (req, res) => {
  try {
    const minio = await connectToFileStorage();

    const { fileStorage: params }: GetFileArgs = req.query;

    if (!params?.length) {
      return badRequest(res);
    }

    const file = await minio.getObject(s3.bucketName, params.join("/"));

    await new Promise(function (resolve) {
      file.pipe(res);
      file.on("end", (buffer: Buffer) => resolve(buffer));
    });
  } catch (e) {
    if (e.code === "NoSuchKey") {
      return notFound(res);
    }
    console.error(e);
    internalServerError(res);
  }
};

const FileStorage = () => {
  return handler;
};

export default FileStorage;
