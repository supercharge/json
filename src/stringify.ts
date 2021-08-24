'use strict'

/**
 * Converts a JavaScript value to a JSON string.
 *
 * @param value A JavaScript value, usually an object or array, to be converted.
 * @param replacer A function that transforms the results.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 */
export function stringify (value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string {
  return JSON.stringify(value, replacer, space)
}
