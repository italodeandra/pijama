// noinspection JSUnusedGlobalSymbols

import { NextApiResponse } from "next"

/**
 * Respond with a bad request response.
 */
export const badRequest = (
  res: NextApiResponse,
  body?: { [key: string]: any }
) => res.status(400).send({ message: "Bad Request", ...body })

/**
 * Respond with an unauthorized response.
 */
export const unauthorized = (
  res: NextApiResponse,
  body?: { [key: string]: any }
) => res.status(401).send({ message: "Unauthorized", ...body })

/**
 * Respond with a not found response.
 */
export const notFound = (res: NextApiResponse, body?: { [key: string]: any }) =>
  res.status(404).send({ message: "Not Found", ...body })

/**
 * Respond with a conflict response.
 */
export const conflict = (res: NextApiResponse, body?: { [key: string]: any }) =>
  res.status(409).send({ message: "Conflict", ...body })

/**
 * Respond with an internal server error response.
 */
export const internalServerError = (
  res: NextApiResponse,
  body?: { [key: string]: any }
) => res.status(500).send({ message: "Internal Server Error", ...body })
