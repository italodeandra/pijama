/**
 * Create an promise and waits the passed milliseconds for it to auto resolve.
 * Useful for making your application wait for something.
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
