'use strict'

const JSON = require('../dist')
const { stringify } = require('../dist')

describe('JSON.stringify', () => {
  it('ensure parse is a function', () => {
    expect(typeof stringify === 'function').toBe(true)
    expect(typeof JSON.stringify === 'function').toBe(true)
  })

  it('stringify an object', () => {
    expect(stringify({ name: 'Supercharge' })).toEqual('{"name":"Supercharge"}')
  })
})
