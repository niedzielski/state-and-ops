import {Int} from './branded'

describe('Int()', () => {
  test.each([
    ['min safe integer', Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
    ['negative integer', -1, -1],
    ['zero', 0, 0],
    ['positive integer', 1, 1],
    ['max safe integer', Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],

    ['negative infinity', Number.NEGATIVE_INFINITY, Number.MIN_SAFE_INTEGER],
    ['min fraction', -Number.MAX_VALUE, Number.MIN_SAFE_INTEGER],
    ['negative fraction', -1.5, -1],
    ['positive fraction', 1.5, 1],
    ['max fraction', Number.MAX_VALUE, Number.MAX_SAFE_INTEGER],
    ['positive infinity', Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER]
  ])('%s', (_, val, expected) => expect(Int(val)).toStrictEqual(expected))

  test('not a number', () => expect(() => Int(NaN)).toThrow())
})

describe('assert()', () => {
  test.each([
    ['min safe integer', Number.MIN_SAFE_INTEGER],
    ['negative integer', -1],
    ['zero', 0],
    ['positive integer', 1],
    ['max safe integer', Number.MAX_SAFE_INTEGER]
  ])('%s', (_, val) => Int.assert(val))

  test.each([
    ['negative infinity', Number.NEGATIVE_INFINITY],
    ['min fraction', -Number.MAX_VALUE],
    ['negative fraction', -1.5],
    ['positive fraction', 1.5],
    ['max fraction', Number.MAX_VALUE],
    ['positive infinity', Number.POSITIVE_INFINITY],
    ['not a number', NaN]
  ])('%s', (_, val) => expect(() => Int.assert(val)).toThrow())
})

describe('is()', () => {
  test.each([
    ['min safe integer', Number.MIN_SAFE_INTEGER],
    ['negative integer', -1],
    ['zero', 0],
    ['positive integer', 1],
    ['max safe integer', Number.MAX_SAFE_INTEGER]
  ])('%s', (_, val) => expect(Int.is(val)).toStrictEqual(true))

  test.each([
    ['negative infinity', Number.NEGATIVE_INFINITY],
    ['min fraction', -Number.MAX_VALUE],
    ['negative fraction', -1.5],
    ['positive fraction', 1.5],
    ['max fraction', Number.MAX_VALUE],
    ['positive infinity', Number.POSITIVE_INFINITY],
    ['not a number', NaN]
  ])('%s', (_, val) => expect(Int.is(val)).toStrictEqual(false))
})

describe('example', () => {
  test('mutability', () => {
    let int = Int(1)
    int = Int(2)
    expect(int).toStrictEqual(Int(2))
  })

  test('Int + Int === number', () => {
    const result: number = Int(1) + Int(2)
    expect(result).toStrictEqual(Int(3))
  })

  test('Int + number === number', () => {
    const result: number = Int(1) + 2.3
    expect(result).toStrictEqual(3.3)
  })

  test('declarative', () => {
    // The type checker is used to make sure there's no confusion with classes,
    // which require the `new` keyword for instantiation, is made. Both calling
    // a class without the keyword and calling a function with are errors.
    expect({x: Int(1), y: Int(2)}).toStrictEqual({x: 1, y: 2})
  })
})
