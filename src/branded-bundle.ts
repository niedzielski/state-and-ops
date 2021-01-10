interface IntXY {
  [brand]: void
  x: number
  y: number
}
declare const brand: unique symbol

interface XY {
  x: number
  y: number
}

export namespace IntXY {
  export function make(x: number, y: number): IntXY {
    return <IntXY>{x: ~~x, y: ~~y}
  }

  // Although the brand is unavailable for runtime type discrimination, you can still do assertions where wanted
  export function assert(xy: XY | IntXY): asserts xy is IntXY {
    if (!is(xy)) throw new Error(`${xy} is not an integral.`)
  }

  export function is(xy: XY | IntXY): xy is IntXY {
    return ~~xy.x === xy.x && ~~xy.y === xy.y
  }
  // ...
}
