'use strict'

/**
 * Converts a JSON string into an object. If a member contains nested objects,
 * the nested objects are transformed before the parent object is.
 *
 * @param {String} text  A valid JSON string.
 * @param {Function} reviver A function that transforms the results. This function is called for each member of the object.
 *
 * @returns {*}
 */
export function parse<R = any> (input: string, reviver?: (this: any, key: string, value: any) => any): R | null {
  switch (true) {
    case input === 'null':
      return null

    case !JsonSignatureRegEx.test(input):
      return input as any

    case isSuspicious(input):
      return JSON.parse(input, (key, value) => clean(key, value, reviver))

    default:
      return JSON.parse(input, reviver)
  }
}

/**
 * Determine whether the given `value` contains `contructor` or `__proto__` keys.
 *
 * @param {String} value
 *
 * @returns {Boolean}
 */
function isSuspicious (value: string): boolean {
  return suspiciousProtoRegEx.test(value) || suspiciousConstructorRegEx.test(value)
}

/**
 * Returns the cleaned key-value-pair for the by removing `constructor` and `__proto__` keys.
 *
 * @param {String} key
 * @param {*} value
 * @param {Function} reviver
 *
 * @returns {*}
 */
function clean (key: string, value: any, reviver?: (this: any, key: string, value: any) => any): any {
  if (key === '__proto__' || key === 'constructor') {
    return
  }

  return reviver ? reviver(key, value) : value
}

const JsonSignatureRegEx = /^["{[]|^-?[0-9][0-9.]*$/

// https://github.com/fastify/secure-json-parse
const suspiciousProtoRegEx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/

// https://github.com/hapijs/bourne
const suspiciousConstructorRegEx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/
