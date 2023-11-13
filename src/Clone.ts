import Obj from "./Obj"
import { AsWriteable, Writeable } from "./ObjectTypes"

export function shallowClone<T extends object>(obj: T, defaults?: Partial<T>, overrides?: Partial<T>): T {
  return Object.assign(defaults ?? {}, obj, overrides ?? {})
}

export function deepClone<T extends object>(obj: T, defaults?: Partial<T>, overrides?: Partial<T>): T {
  if (defaults || overrides) {
    return Object.assign(defaults ?? {}, structuredClone(obj), overrides ?? {}) as T
  }
  return structuredClone(obj)
}

export function writableClone<T extends object>(obj: T, defaults?: Partial<T>, overrides?: Partial<T>): AsWriteable<T> {
  return deepClone(obj, defaults, overrides)
}

export function readonlyClone<T extends object>(obj: T, defaults?: Partial<T>, overrides?: Partial<T>): Readonly<T> {
  return deepClone(obj, defaults, overrides)
}

export function imutableClone<T extends object>(obj: T, defaults?: Partial<T>, overrides?: Partial<T>): Readonly<T> {
  return Object.freeze(deepClone(obj, defaults, overrides))
}

export const Clone = {
  deep: deepClone,
  shallow: shallowClone,
  writable: writableClone,
  readonly: readonlyClone,
  imutable: imutableClone,
}

export default Clone
