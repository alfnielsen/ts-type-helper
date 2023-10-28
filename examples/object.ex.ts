import { isKeyOf, keyOf, keyOfCast } from "../src/keyOf"
import Obj, { entries, reduce } from "../src/iterate"
import { MappedKeys, Optionalble, Writeable } from "../src/objTypes"

const obj = { a: 1, b: 2 } as const

// reduce
const sum = reduce(obj, 0, (acc, key, value) => acc + value)

type vMap<T> = {
  [key in keyof T]: () => T[key]
}

const objF = reduce<vMap<Optionalble<typeof obj>>, typeof obj>(obj, {}, (acc, key, value) => {
  acc[key] = () => value
  return acc
})

Obj(obj).reduce(0, (acc, key, value) => acc + value)

Obj(obj).reduceObj<vMap<Writeable<typeof obj>>>((acc, key, value) => {
  acc[key] = () => value
  return acc
})
