export class Int {
  private _val: number

  constructor(val: number) {
    this._val = toInt(val)
  }

  get val() {
    return this._val
  }

  set val(val: number) {
    this._val = toInt(val)
  }

  add(int: Int): Int {
    return new Int(this.val + int.val)
  }

  addTo(int: Int): void {
    this.val += int.val
  }
}

function toInt(val: number): number {
  if (Number.isNaN(val))
    throw new Error(`${val} is not convertible to an integer.`)
  if (val > Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER
  if (val < Number.MIN_SAFE_INTEGER) return Number.MIN_SAFE_INTEGER
  return Math.trunc(val)
}
