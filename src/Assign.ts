import Obj from "./Obj"
import { AsOptionable } from "./ObjectTypes"

export function override<T extends object>(obj: T, ...overrides: Partial<T>[]): T {
  return Object.assign(obj, ...overrides)
}

export function defaults<T extends object>(obj: AsOptionable<T>, defaults: Partial<T>): T {
  // overwrite undefined values
  for (const key of Obj(obj).keys()) {
    if (obj[key] === undefined && defaults[key] !== undefined) {
      obj[key] = defaults[key]
    }
  }
  return obj as T
}

const Assign = {
  override,
  defaults,
}

export default Assign
