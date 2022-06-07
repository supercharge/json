'use strict'

const JSON = require('../dist')
const { expect } = require('expect')
const { test } = require('@japa/runner')
const { stringify } = require('../dist')

test.group('JSON.stringify', () => {
  test('ensure parse is a function', () => {
    expect(typeof stringify === 'function').toBe(true)
    expect(typeof JSON.stringify === 'function').toBe(true)
  })

  test('stringify an object', () => {
    expect(stringify({ name: 'Supercharge' })).toEqual('{"name":"Supercharge"}')
  })
})
