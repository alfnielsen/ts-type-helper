import { expect, test } from "bun:test"
import { Range } from "../src/Range"

test("Range.range", () => {
  let i = 0
  const r = Range.range(0, 3)
  expect(r).toEqual([0, 1, 2, 3])

  const r2 = Range.range(0, 21, 7)
  expect(r2).toEqual([0, 7, 14, 21])
})

test("Range.rangeOf", () => {
  let i = 0
  const r = Range.rangeCount(3)
  // console.log(r)
  expect(r).toEqual([0, 1, 2])

  const r2 = Range.rangeCount(22, 7)
  // console.log(r2)
  expect(r2).toEqual([0, 7, 14, 21])
})
