export class IntXY {
  private _x: number
  private _y: number

  constructor(x: number, y: number) {
    this._x = ~~x
    this._y = ~~y
  }

  get x() {
    return this._x
  }
  get y() {
    return this._y
  }
  set x(x: number) {
    this._x = ~~x
  }
  set y(y: number) {
    this._y = ~~y
  }

  add({x, y}: IntXY): IntXY {
    return new IntXY(this.x + x, this.y + y)
  }
  addTo({x, y}: IntXY): void {
    this.x += x
    this.y += y
  }
}
