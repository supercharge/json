'use strict'

const Json = require('../dist')
const { parse } = require('../dist')

describe('JSON.parse', () => {
  it('ensure parse is a function', () => {
    expect(Json.parse === parse).toBe(true)
    expect(typeof parse === 'function').toBe(true)
    expect(typeof Json.parse === 'function').toBe(true)
  })

  it('parse an object string', () => {
    expect(parse('{"name":"Supercharge"}')).toEqual({ name: 'Supercharge' })
  })

  it('parse null', () => {
    expect(parse('null')).toEqual(null)
  })

  it('parse undefined', () => {
    expect(parse()).toEqual(undefined)
    expect(parse(undefined)).toEqual(undefined)
  })

  it('parse number', () => {
    expect(parse('0')).toBe(0)
  })

  it('parse string', () => {
    expect(parse('"supercharge"')).toBe('supercharge')
  })

  it('parse buffer', () => {
    expect(
      parse(Buffer.from('"Supercharge"'))
    ).toBe(
      JSON.parse(Buffer.from('"Supercharge"'))
    )
  })

  it('parse object with reviver', () => {
    const reviver = (_, value) => {
      return typeof value === 'number'
        ? value + 1
        : value
    }

    expect(parse('{"a": 1, "b": 2}', reviver)).toEqual({ a: 2, b: 3 })
  })

  it('sanitizes object with reviver', () => {
    const reviver = (_, value) => {
      return typeof value === 'number'
        ? value + 1
        : value
    }

    expect(parse('{ "a": 1, "b": 2, "name":"supercharge", "__proto__": { "x": 7 } }', reviver)).toEqual({
      a: 2, b: 3, name: 'supercharge'
    })
  })

  it('sanitizes object', () => {
    expect(parse('{ "a": 1, "b": 2, "__proto__": { "x": 7 } }')).toEqual({ a: 1, b: 2 })
  })

  it('sanitizes nested object', () => {
    const json =
      '{ "a": 1, "__proto__": { "x": 7 }, "c": { "d": "text", "__proto__": { "y": 8 }, "e": { "f": 3 } } }'

    expect(parse(json)).toEqual({
      a: 1, c: { d: 'text', e: { f: 3 } }
    })
  })
})
