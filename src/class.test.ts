import {Int} from './class'

describe('Int() and get Int.val', () => {
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
  ])('%s', (_, val, expected) => {
    const int = new Int(val)
    expect(int.val).toStrictEqual(expected)
  })

  test('not a number', () => expect(() => new Int(NaN)).toThrow())
})

describe('set Int.val', () => {
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
  ])('%s', (_, val, expected) => {
    const int = new Int(0)
    int.val = val
    expect(int.val).toStrictEqual(expected)
  })

  test('not a number', () => {
    const int = new Int(0)
    expect(() => {
      int.val = NaN
    }).toThrow()
  })
})

describe('add()', () => {
  test('adds', () => {
    const int = new Int(10)
    const result = int.add(new Int(1))
    expect(result.val).toStrictEqual(11)
  })

  test('no side-effects', () => {
    const int = new Int(11)
    int.add(new Int(1))
    expect(int.val).toStrictEqual(11)
  })
})

test('addTo()', () => {
  const int = new Int(10)
  int.addTo(new Int(1))
  expect(int.val).toStrictEqual(11)
})
