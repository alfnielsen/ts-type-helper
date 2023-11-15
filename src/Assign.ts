import Obj from "./Obj"
import { AsOptionable, ObjectLike } from "./ObjectTypes"

export function override<T extends ObjectLike<T>>(obj: T, ...overrides: Partial<T>[]): T {
  return Object.assign(obj, ...overrides)
}

export function defaults<T extends ObjectLike<T>>(obj: AsOptionable<T>, defaults: Partial<T>): T {
  // overwrite undefined values
  for (const key of Obj(obj).keys()) {
    if (obj[key] === undefined && defaults[key] !== undefined) {
      obj[key] = defaults[key]
    }
  }
  return obj as T
}

export function mapValues<T extends ObjectLike<T>>(obj: T, mapper: (key: keyof T, value: T[keyof T]) => any): T {
  // overwrite undefined values
  for (const [key, value] of Obj(obj).entries()) {
    obj[key] = mapper(key, value)
  }
  return obj as T
}

const Assign = {
  override,
  defaults,
  mapValues,
}

export default Assign
