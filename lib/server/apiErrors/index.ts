// noinspection JSUnusedGlobalSymbols

import { NextApiResponse } from "next"

/**
 * Respond with a bad request response.
 */
export const badRequest = (res: NextApiResponse) =>
  res.status(400).send("Bad Request")

/**
 * Respond with an unauthorized response.
 */
export const unauthorized = (res: NextApiResponse) =>
  res.status(401).send("Unauthorized")

/**
 * Respond with a not found response.
 */
export const notFound = (res: NextApiResponse) =>
  res.status(404).send("Not Found")

/**
 * Respond with a conflict response.
 */
export const conflict = (res: NextApiResponse) =>
  res.status(409).send("Conflict")

/**
 * Respond with an internal server error response.
 */
export const internalServerError = (res: NextApiResponse) =>
  res.status(500).send("Internal Server Error")
