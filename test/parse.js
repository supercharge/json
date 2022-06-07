'use strict'

const Json = require('../dist')
const { parse } = require('../dist')
const { expect } = require('expect')
const { test } = require('@japa/runner')

test.group('JSON.parse', () => {
  test('ensure parse is a function', () => {
    expect(Json.parse === parse).toBe(true)
    expect(typeof parse === 'function').toBe(true)
    expect(typeof Json.parse === 'function').toBe(true)
  })

  test('parse an object string', () => {
    expect(parse('{"name":"Supercharge"}')).toEqual({ name: 'Supercharge' })
  })

  test('parse null', () => {
    expect(parse('null')).toEqual(null)
  })

  test('parse undefined', () => {
    expect(parse()).toEqual(undefined)
    expect(parse(undefined)).toEqual(undefined)
  })

  test('parse number', () => {
    expect(parse('0')).toBe(0)
  })

  test('parse string', () => {
    expect(parse('"supercharge"')).toBe('supercharge')
  })

  test('parse buffer', () => {
    expect(
      parse(Buffer.from('"Supercharge"'))
    ).toBe(
      JSON.parse(Buffer.from('"Supercharge"'))
    )
  })

  test('parse object with reviver', () => {
    const reviver = (_, value) => {
      return typeof value === 'number'
        ? value + 1
        : value
    }

    expect(parse('{"a": 1, "b": 2}', reviver)).toEqual({ a: 2, b: 3 })
  })

  test('sanitizes object with reviver', () => {
    const reviver = (_, value) => {
      return typeof value === 'number'
        ? value + 1
        : value
    }

    expect(parse('{ "a": 1, "b": 2, "name":"supercharge", "__proto__": { "x": 7 } }', reviver)).toEqual({
      a: 2, b: 3, name: 'supercharge'
    })
  })

  test('sanitizes object', () => {
    expect(parse('{ "a": 1, "b": 2, "__proto__": { "x": 7 } }')).toEqual({ a: 1, b: 2 })
  })

  test('sanitizes nested object', () => {
    const json =
      '{ "a": 1, "__proto__": { "x": 7 }, "c": { "d": "text", "__proto__": { "y": 8 }, "e": { "f": 3 } } }'

    expect(parse(json)).toEqual({
      a: 1, c: { d: 'text', e: { f: 3 } }
    })
  })
})
