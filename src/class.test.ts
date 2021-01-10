import {IntXY} from './class'

describe('getters', () => {
  test.each([
    ['simple', 1, 2, 1, 2],
    ['differs', 3, 4, 3, 4],
    ['fractional', 1.2, 3.4, 1, 3]
  ])('%#', (_, inX, inY, outX, outY) => {
    const xy = new IntXY(inX, inY)
    expect(xy.x).toStrictEqual(outX)
    expect(xy.y).toStrictEqual(outY)
  })
})

describe('setters', () => {
  test.each([
    ['simple', 1, 2, 1, 2],
    ['differs', 3, 4, 3, 4],
    ['fractional', 1.2, 3.4, 1, 3]
  ])('%#', (_, inX, inY, outX, outY) => {
    const xy = new IntXY(0, 0)
    xy.x = inX
    xy.y = inY
    expect(xy.x).toStrictEqual(outX)
    expect(xy.y).toStrictEqual(outY)
  })
})

describe('add()', () => {
  test('adds', () => {
    const xy = new IntXY(10, 10)
    const result = xy.add(new IntXY(1, 2))
    expect(result.x).toStrictEqual(11)
    expect(result.y).toStrictEqual(12)
  })

  test('no side-effects', () => {
    const xy = new IntXY(11, 12)
    xy.add(new IntXY(1, 2))
    expect(xy.x).toStrictEqual(11)
    expect(xy.y).toStrictEqual(12)
  })
})

test('addTo()', () => {
  const xy = new IntXY(10, 10)
  xy.addTo(new IntXY(1, 2))
  expect(xy.x).toStrictEqual(11)
  expect(xy.y).toStrictEqual(12)
})
