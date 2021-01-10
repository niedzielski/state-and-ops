interface IntXY {
  type: 'IntXY'
  x: number
  y: number
}

// Creates a new bundle that all other operators will expect.
export function newIntXY(x: number, y: number): IntXY {
  return {type: 'IntXY', x: ~~x, y: ~~y}
}

// Operates on the bundle and returns a new bundle.
export function add(left: IntXY, right: IntXY): IntXY {
  return {type: 'IntXY', x: left.x + right.x, y: left.y + right.y}
}

// Mutates the bundle.
export function addTo(xy: IntXY, val: IntXY): void {
  xy.x += val.x
  xy.y += val.y
}
