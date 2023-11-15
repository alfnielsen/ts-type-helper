import { ObjectLike } from "./ObjectTypes"

export type ObjectValueIteratorValueGenerator<T extends ObjectLike<T>, R> = (
  obj: T,
  key: keyof T,
  value: T[keyof T],
  index: number
) => R

export type ObjectEntries<T extends ObjectLike<T>> = [
  keyof T, //key
  T[keyof T], //value
  number //index
]

export type IteratorStepOptions = {
  start?: number
  end?: number
  step?: number
}

/**
 * `ObjectValueIterator` is an iterator for objects (Stronly typed)
 * This is the base class for other objects iterators.
 *
 * This base takes a value generator function that is called for each value when iterating
 *
 * @example
 * export class ObjectEntiresIterator<T extends object> extends ObjectValueIterator<T, [keyof T, T[keyof T]]>
 * {
 *   constructor(obj: T) {
 *     // This generator returns the [key, value] as a tuple
 *     super(obj, (obj, key, value) => [key, value])
 *   }
 * }
 * export class ObjectKeysIterator<T extends object> extends ObjectValueIterator<keyof T>
 * {
 *   constructor(obj: T) {
 *     // This generator returns the only the key
 *     super(obj, (obj, key, value) => key)
 *   }
 * }
 *
 * @see Also see {@link ObjectEntriesIterator}, {@link ObjectKeysIterator} and {@link ObjectValuesIterator}
 */

export class ObjectValueIterator<T extends ObjectLike<T>, TReturnValue> implements Iterable<TReturnValue> {
  private index: number
  private done: boolean
  private end: number
  private step: number
  private keys: (keyof T)[]
  private readonly obj: T
  private readonly valueGenerator: ObjectValueIteratorValueGenerator<T, TReturnValue>
  constructor(
    obj: T,
    valueGenerator: ObjectValueIteratorValueGenerator<T, TReturnValue>,
    stepOptions: IteratorStepOptions = {}
  ) {
    this.valueGenerator = valueGenerator
    this.obj = obj
    this.end = stepOptions.end ?? Infinity
    this.step = stepOptions.step ?? 1
    this.index = stepOptions.start ?? 0
    this.done = false
    this.keys = Object.keys(obj) as (keyof T)[]
  }
  next(): IteratorResult<TReturnValue> {
    if (this.done) {
      return { done: true, value: undefined }
    }
    if (this.index >= this.keys.length || this.index >= this.end) {
      this.done = true
      return { done: true, value: undefined }
    }
    if (this.index >= this.keys.length) {
      this.done = true
      return { done: true, value: undefined }
    }
    const key = this.keys[this.index]
    const value = this.obj[key]
    const response = this.valueGenerator(this.obj, key as keyof T, value, this.index)
    this.index += this.step
    return { done: false, value: response }
  }

  /**
   * change the start index (to skip values)
   * @param count
   * @returns
   */
  skip(count: number): this {
    this.index += count
    return this
  }
  /**
   * change the end index (to stop the iterator)
   * @param count
   * @returns
   */
  limit(count: number): this {
    this.end = this.index + count
    return this
  }
  /**
   * change the step (to skip values)
   * @param step
   * @returns
   */
  stepBy(step: number): this {
    this.step = step
    return this
  }
  /**
   * set end index (to stop the iterator)
   * @param end
   * @returns
   */
  stopAt(end: number): this {
    this.end = end
    return this
  }

  /**
   * stop the iterator
   * @returns
   */
  stop(): this {
    this.done = true
    return this
  }

  /**
   * forEach the values of the iterator (value, key, index)
   * @param callback
   */
  forEach(callback: (value: TReturnValue, index: number) => void | false): void {
    let i = 0
    for (const v of this) {
      const returnValue = callback(v, i)
      if (returnValue === false) {
        break
      }
      i++
    }
  }
  /**
   * map the values of the iterator to an array
   * @param mapper
   * @param filterNull If true, mapped null values will be filtered out [default: true]
   * @returns
   */
  map<R>(mapper: (value: TReturnValue, index: number, outArr: R[]) => R | null, filterNull = true): R[] {
    const outArr: R[] = []
    let i = 0
    for (const v of this) {
      const item = mapper(v, i, outArr)
      if (filterNull && item === null) {
        continue
      }
      outArr.push(item as R)
      i++
    }
    return outArr
  }

  /**
   * flatMap the values of the iterator to an array
   * @param mapper
   * @param filterNull
   * @returns
   */
  flatMap<R>(mapper: (value: TReturnValue, index: number, outArr: R[]) => R | R[] | null, filterNull = true): R[] {
    const outArr: R[] = []
    let i = 0
    for (const v of this) {
      const items = mapper(v, i, outArr)
      if (filterNull && items === null) {
        continue
      }
      if (items instanceof Array) {
        outArr.push(...items)
      } else {
        outArr.push(items as R)
      }
      i++
    }
    return outArr
  }

  /**
   * reduce the values of the iterator to a single value
   * @param init
   * @param reducer
   * @returns
   */
  reduce<R>(init: R, reducer: (acc: R, value: TReturnValue, index: number) => R): R {
    let i = 0
    let acc = init
    for (const v of this) {
      acc = reducer(acc, v, i)
      i++
    }
    return acc
  }

  // [Symbol.iterator](): ObjectValueIterator<T, TReturnValue> {
  //   return new ObjectValueIterator<T, TReturnValue>(this.obj, this.valueGenerator, this.index, this.end, this.step)
  // }

  [Symbol.iterator](): ObjectValueIterator<T, TReturnValue> {
    return this
  }
}

/**
 * `ObjectEntiresIterator` is an iterator for objects (Stronly typed)
 */

export class ObjectEntriesIterator<T extends ObjectLike<T>> extends ObjectValueIterator<
  T,
  [keyof T, T[keyof T], number]
> {
  constructor(obj: T, stepOptions?: IteratorStepOptions) {
    super(obj, (obj, key, value, index) => [key, value, index], stepOptions)
  }
}

/**
 * `ObjectKeysIterator` is an iterator for object keys (Stronly typed)
 */
export class ObjectKeysIterator<T extends ObjectLike<T>> extends ObjectValueIterator<T, keyof T> {
  constructor(obj: T, stepOptions?: IteratorStepOptions) {
    super(obj, (obj, key, value, index) => key, stepOptions)
  }
}

/**
 * `ObjectValuesIterator` is an iterator for object values (Stronly typed)
 */
export class ObjectValuesIterator<T extends ObjectLike<T>> extends ObjectValueIterator<T, T[keyof T]> {
  constructor(obj: T, stepOptions?: IteratorStepOptions) {
    super(obj, (obj, key, value, index) => value, stepOptions)
  }
}

export function entries<T extends ObjectLike<T>>(obj: T, stepOptions?: IteratorStepOptions) {
  return new ObjectEntriesIterator(obj, stepOptions)
}

export function keys<T extends ObjectLike<T>>(obj: T, stepOptions?: IteratorStepOptions) {
  return new ObjectKeysIterator(obj, stepOptions)
}

export function values<T extends ObjectLike<T>>(obj: T, stepOptions?: IteratorStepOptions) {
  return new ObjectValuesIterator(obj, stepOptions)
}

export function reduce<R, T extends ObjectLike<T>>(
  obj: T,
  acc: R,
  reducer: (acc: R, key: keyof T, value: T[keyof T], index: number) => R
): R {
  for (const [key, value, index] of entries(obj)) {
    acc = reducer(acc, key, value, index)
  }
  return acc
}

export function reduceObj<R, T extends ObjectLike<T>>(
  obj: T,
  reducer: (acc: R, key: keyof T, value: T[keyof T]) => R
): R {
  let init = {} as R
  for (const [key, value] of entries(obj)) {
    init = reducer(init, key, value)
  }
  return init
}

export function map<T extends ObjectLike<T>, R>(obj: T, mapper: (key: keyof T, value: T[keyof T]) => R): R[] {
  return reduce(obj, [] as R[], (acc, key, value) => {
    acc.push(mapper(key, value))
    return acc
  })
}

export const Iterate = {
  entries,
  keys,
  values,
  reduce,
  reduceObj,
  map,
}

export default Iterate
