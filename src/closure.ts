export interface IntXY {
  x: number
  y: number
  add(right: IntXY): IntXY
  addTo(val: IntXY): void
}

export function newIntXY(x: number, y: number): IntXY {
  let _x = ~~x
  let _y = ~~y
  return {
    get x() {
      return _x
    },
    get y() {
      return _y
    },
    set x(x: number) {
      _x = ~~x
    },
    set y(y: number) {
      _y = ~~y
    },

    add({x, y}: IntXY): IntXY {
      return newIntXY(_x + x, _y + y)
    },
    addTo({x, y}: IntXY): void {
      _x += x
      _y += y
    }
  }
}
