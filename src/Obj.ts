import { entries, keys, map, reduce, reduceObj, values } from "./Iterate"
import Clone from "./Clone"
import Keys from "./Keys"
import Assign from "./Assign"

export function Obj<T extends object>(obj: T) {
  return {
    // iterate
    entries: () => entries(obj),
    keys: () => keys(obj),
    values: () => values(obj),
    reduce: <R>(init: R, reducer: (acc: R, key: keyof T, value: T[keyof T]) => R) => reduce(obj, init, reducer),
    reduceObj: <R>(reducer: (acc: R, key: keyof T, value: T[keyof T]) => R) => reduceObj(obj, reducer),
    map: <R>(mapper: (k: keyof T, value: T[keyof T]) => R) => map(obj, mapper),
    // mutate
    assignProp: <D extends Partial<T>>(overrides: D) => Object.assign(obj, overrides),
    // keys
    hasKey: (k: string) => Keys.isKeyOf(k, obj),
    keyOf: (k: string) => Keys.keyOf(k, obj),
    key: (k: string) => Keys.asKeyOf(k, obj),
    // props
    freeze: () => Object.freeze(obj),
    // clone
    clone: <D extends Partial<T>, O extends Partial<T>>(defaults?: D, override?: O) =>
      Clone.deep(obj, defaults, override),
    shallowClone: <D extends Partial<T>, O extends Partial<T>>(defaults?: D, override?: O) =>
      Clone.shallow(obj, defaults, override),
    writableClone: <D extends Partial<T>, O extends Partial<T>>(defaults?: D, override?: O) =>
      Clone.writable(obj, defaults, override),
    readonlyClone: <D extends Partial<T>, O extends Partial<T>>(defaults?: D, override?: O) =>
      Clone.readonly(obj, defaults, override),
    imutableClone: <D extends Partial<T>, O extends Partial<T>>(defaults?: D, override?: O) =>
      Clone.imutable(obj, defaults, override),
    defaults: <D extends Partial<T>>(defaults: D) => Assign.defaults<T>(obj, defaults),
    override: <D extends Partial<T>>(overrides: D) => Assign.override<T>(obj, overrides),
  }
}

export default Obj
