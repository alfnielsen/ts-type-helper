/**
 * Create a range of numbers from 0 to `count` - 1
 * (Optional) `step` can be provided to increment by a value other than 1
 * @param count
 * @param step
 */
export function rangeOf(count: number, step?: number): number[] {
  return range(0, count - 1, step)
}

/**
 * Create a range of numbers from 0 to `count` - 1
 * (Optional) `step` can be provided to increment by a value other than 1
 * @param count
 * @param step
 */
export function arrRange<T, A extends ArrayLike<T>>(arr: A, from: number, to: number): T[] {
  const outArr: T[] = []
  for (let i = from; i < to; i++) {
    outArr.push(arr[i])
  }
  return outArr
}

/**
 * Create a range of numbers from `start` to `end`
 * (Optional) `step` can be provided to increment by a value other than 1
 * @param start
 * @param end
 * @param step
 * @returns
 */
export function range(start: number, end: number, step: number = 1): number[] {
  const arr = []
  for (let i = start; i <= end; i += step) {
    arr.push(i)
  }
  return arr
}

/**
 * Create a range of characters from `start` to `end` (inclusive, following ASCII table)
 * Normally used with `String.fromCharCode(...charRange(65, 90))` to create a range of uppercase letters (A-Z)
 * or `String.fromCharCode(...charRange(97, 122))` to create a range of lowercase letters (a-z)
 * (Optional) `step` can be provided to increment by a value other than 1
 * @param start
 * @param end
 * @param step
 * @returns
 */
export function characterRange(start: string, end: string, step: number = 1): string[] {
  const startNum = start.charCodeAt(0)
  const endNum = end.charCodeAt(0)
  const arr = []
  for (let i = startNum; i < endNum; i += step) {
    arr.push(String.fromCharCode(i))
  }
  return arr
}

export const Range = {
  range,
  rangeCount: rangeOf,
  characterRange,
}

export default Range
