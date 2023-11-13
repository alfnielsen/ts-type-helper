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

export function defaults<T extends object>(obj: T, defaults: Partial<T>): T {
  return Object.assign(defaults, structuredClone(obj))
}

export function override<T extends object>(obj: T, overrides: Partial<T>): T {
  return Object.assign(structuredClone(obj), overrides)
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
  defaults: defaults,
  override: override,
}

export default Clone
