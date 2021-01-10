export class IntXY {
  private _x: number
  private _y: number

  constructor(x: number, y: number) {
    this._x = Math.trunc(x)
    this._y = Math.trunc(y)
  }

  get x() {
    return this._x
  }
  get y() {
    return this._y
  }
  set x(x: number) {
    this._x = Math.trunc(x)
  }
  set y(y: number) {
    this._y = Math.trunc(y)
  }

  add({x, y}: IntXY): IntXY {
    return new IntXY(this.x + x, this.y + y)
  }
  addTo({x, y}: IntXY): void {
    this.x += x
    this.y += y
  }
}
