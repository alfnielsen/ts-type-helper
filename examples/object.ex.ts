import { Obj, Iterate, Writeable, AsOptionable } from "../src"

const obj = { a: 1, b: 2 } as const

// reduce
const sum = Iterate.reduce(obj, 0, (acc, key, value) => acc + value)

type TFuntionMap<T> = {
  [P in keyof T]: () => T[P]
}

// reduce from value (ex 0, object, ...)
Obj(obj).reduce(0, (acc, key, value) => acc + value)

// reduce from object
const objNum = Iterate.reduce(obj, 0, (acc, key, value) => {
  return acc + value
})

// ----- Reduce Object using the Iterator -----

// Usin the Iterate ex 1
const objIterator1 = Iterate.reduce(obj, {} as TFuntionMap<Writeable<typeof obj>>, (acc, key, value) => {
  acc[key] = () => value
  return acc
})

// Usin the Iterate ex 2
const objIterator2 = Iterate.reduceObj<TFuntionMap<Writeable<typeof obj>>, typeof obj>(obj, (acc, key, value) => {
  acc[key] = () => value
  return acc
})

// ----- Reduce Object using Obj -----
// reduce from object
Obj(obj).reduce({} as TFuntionMap<Writeable<typeof obj>>, (acc, key, value) => {
  acc[key] = () => value
  return acc
})

// reduce from object
Obj(obj).reduceObj<TFuntionMap<Writeable<typeof obj>>>((acc, key, value) => {
  acc[key] = () => value
  return acc
})
