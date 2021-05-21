/**
 * Creates an array with numbers from 1 to the passed count.
 * Useful for creating fake arrays with specific number of items.
 */
export const numericArray = (count: number) =>
  Array.from(Array(count), (d, i) => i + 1)
