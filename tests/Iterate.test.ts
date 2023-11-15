import { expect, test } from "bun:test"
import { Iterate } from "../src/Iterate"

const Obj1 = {
  a: 1,
  b: 2,
  c: "Hello",
}

const Arr1 = [2, 4, 8]
const Arr2 = [2, 4, "Hello"]

const arrayKeys = ["0", "1", "2"] as const
const arrayvalues = [2, 4, 8] as const

const objKeys = ["a", "b", "c"] as const
const objValues = [1, 2, "Hello"] as const

test("Iterate.keys", () => {
  let i = 0
  for (const key of Iterate.keys(Obj1)) {
    expect(key).toEqual(objKeys[i])
    i++
  }
})

test("Iterate.keys.skip", () => {
  let i = 0
  const res = ["b", "c"] as (keyof typeof Obj1)[]
  for (const key of Iterate.keys(Obj1, { start: 1 })) {
    expect(key).toEqual(res[i])
    i++
  }

  i = 0
  for (const key of Iterate.keys(Obj1).skip(1)) {
    expect(key).toEqual(res[i])
    i++
  }

  i = 0
  const iterator = Iterate.keys(Obj1)
  const res2 = ["a", "c"] as (keyof typeof Obj1)[]
  for (const key of iterator) {
    expect(key).toEqual(res2[i])
    iterator.skip(1)
    i++
  }
})

test("Iterate.valuesOf", () => {
  let i = 0
  for (const value of Iterate.values(Obj1)) {
    expect(value).toEqual(objValues[i])
    i++
  }
})

test("Iterate.entries", () => {
  let i = 0
  const obj = {
    a: 1,
    b: 2,
    c: "Hello",
  }
  const keys = ["a", "b", "c"] as const
  const values = [1, 2, "Hello"] as const

  for (const ent of Iterate.entries(obj)) {
    expect(ent[0]).toEqual(keys[i])
    expect(ent[1]).toEqual(values[i])
    i++
  }
})

test("Iterate.entries.foreach", () => {
  let i = 0
  const obj = {
    a: 1,
    b: 2,
    c: "Hello",
  }
  const keys = ["a", "b", "c"] as const
  const values = [1, 2, "Hello"] as const
  Iterate.entries(obj).forEach(([key, val], index) => {
    expect(key).toEqual(keys[index])
    expect(val).toEqual(values[index])
  })
})
test("Iterate.entries.map (including null filter)", () => {
  let i = 0
  const obj = {
    a: 1,
    b: 2,
    c: "Hello",
  }
  const keys = ["a", "b", "c"] as const
  const values = [1, 2, "Hello"] as const
  const ff = Iterate.entries(obj).map(([key, val], index) => {
    if (typeof val === "number") {
      return val * 2
    }
    return null
  })
  expect(ff).toEqual([2, 4])
})
test("Iterate.entries.flatMap (including null filter)", () => {
  const obj = {
    a: 1,
    b: 2,
    c: "Hello",
  }
  const ff = Iterate.entries(obj).flatMap(([key, val], index) => {
    if (typeof val === "number") {
      return [key, val * 2]
    }
    return null
  })
  // console.log(ff)
  expect(ff).toEqual(["a", 2, "b", 4])
})

test("Iterate.map", () => {
  const res = Iterate.map(Obj1, (key, value) => [key, value])
  expect(res).toEqual([
    ["a", 1],
    ["b", 2],
    ["c", "Hello"],
  ])
})

test("Iterate.reduce (to Array)", () => {
  const entiresArr = Iterate.reduce(Obj1, [] as [string, any][], (acc, key, value) => {
    acc.push([key, value])
    return acc
  })
  expect(entiresArr).toEqual([
    ["a", 1],
    ["b", 2],
    ["c", "Hello"],
  ])
  const resNumbers = Iterate.reduce(Obj1, [] as number[], (acc, key, value) => {
    if (value === 2 || key === "a") {
      acc.push(value as number)
    }
    return acc
  })
  expect(resNumbers).toEqual([1, 2])
})

test("Iterate.reduce (to num)", () => {
  const res = Iterate.reduce(Obj1, 0, (acc, key, value) => {
    if (typeof value === "number") {
      acc += value
    }
    return acc
  })
  expect(res).toEqual(3)
})

test("Iterate.reduce (to object)", () => {
  const res = Iterate.reduce(Obj1, {} as Record<keyof typeof Obj1, string>, (acc, key, value) => {
    acc[key] = "" + value
    return acc
  })
  expect(res).toEqual({
    a: "1",
    b: "2",
    c: "Hello",
  })
})

test("Iterate.reduceObj", () => {
  const res = Iterate.reduceObj<Record<keyof typeof Obj1, string>, typeof Obj1>(Obj1, (acc, key, value) => {
    acc[key] = "" + value
    return acc
  })
  expect(res).toEqual({
    a: "1",
    b: "2",
    c: "Hello",
  })
})

// test("Iterate.reduceObj", () => {
//   const res = Iterate.reduceObjKeys<Record<keyof typeof Obj1, string>, typeof Obj1>(Obj1, (acc, key, value) => {
//     acc[key] = "" + value
//     return acc
//   })
//   expect(res).toEqual({
//     a: "1",
//     b: "2",
//     c: "Hello",
//   })
// })

// test("Iterate.reduceObj", () => {
//   const res = Obj(Obj1).map((key, value) => [key, value])
//   expect(res).toEqual([
//     ["a", 1],
//     ["b", 2],
//     ["c", "Hello"],
//   ])
// })

// reduce,
// reduceObj,
// map,
