// noinspection JSUnusedGlobalSymbols

import { NextApiResponse } from "next"

export const badRequest = (res: NextApiResponse) =>
  res.status(400).send("Bad Request")
export const unauthorized = (res: NextApiResponse) =>
  res.status(401).send("Unauthorized")
export const notFound = (res: NextApiResponse) =>
  res.status(404).send("Not Found")
export const conflict = (res: NextApiResponse) =>
  res.status(409).send("Conflict")
export const internalServerError = (res: NextApiResponse) =>
  res.status(500).send("Internal Server Error")
