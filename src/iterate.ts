import Keys from "./Keys"

export type ObjectValueIteratorValueGenerator<T extends object, R> = (
  obj: T,
  key: keyof T,
  value: T[keyof T],
  index: number
) => R

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
 * @see Also see {@link ObjectEntiresIterator}, {@link ObjectKeysIterator} and {@link ObjectValuesIterator}
 */

export class ObjectValueIterator<T extends object, TReturnValue> implements Iterable<TReturnValue> {
  private index: number
  private done: boolean
  private readonly obj: T
  private readonly valueGenerator: ObjectValueIteratorValueGenerator<T, TReturnValue>
  constructor(obj: T, valueGenerator: ObjectValueIteratorValueGenerator<T, TReturnValue>) {
    this.valueGenerator = valueGenerator
    this.obj = obj
    this.index = 0
    this.done = false
  }
  next(): IteratorResult<TReturnValue> {
    if (this.done) {
      return { done: true, value: undefined }
    }
    if (this.index >= Object.keys(this.obj).length) {
      this.done = true
      return { done: true, value: undefined }
    }
    const keys = Object.keys(this.obj)
    if (this.index >= keys.length) {
      this.done = true
      return { done: true, value: undefined }
    }
    const key = Keys.asKeyOf(keys[this.index], this.obj)
    const value = this.obj[key]
    const response = this.valueGenerator(this.obj, key, value, this.index)
    this.index++
    return { done: false, value: response }
  }

  [Symbol.iterator](): ObjectValueIterator<T, TReturnValue> {
    return new ObjectValueIterator<T, TReturnValue>(this.obj, this.valueGenerator)
  }
}

/**
 * `ObjectEntiresIterator` is an iterator for objects (Stronly typed)
 */
export class ObjectEntiresIterator<T extends object> extends ObjectValueIterator<T, [keyof T, T[keyof T]]> {
  constructor(obj: T) {
    super(obj, (obj, key, value) => [key, value])
  }
}

/**
 * `ObjectKeysIterator` is an iterator for object keys (Stronly typed)
 */
export class ObjectKeysIterator<T extends object> extends ObjectValueIterator<T, keyof T> {
  constructor(obj: T) {
    super(obj, (obj, key, value) => key)
  }
}

/**
 * `ObjectValuesIterator` is an iterator for object values (Stronly typed)
 */
export class ObjectValuesIterator<T extends object> extends ObjectValueIterator<T, T[keyof T]> {
  constructor(obj: T) {
    super(obj, (obj, key, value) => value)
  }
}

export function entries<T extends object>(obj: T) {
  return new ObjectEntiresIterator(obj)
}
export function keys<T extends object>(obj: T) {
  return new ObjectKeysIterator(obj)
}
export function values<T extends object>(obj: T) {
  return new ObjectValuesIterator(obj)
}

export function reduce<R, T extends object>(
  obj: T,
  init: R,
  reducer: (acc: R, key: keyof T, value: T[keyof T]) => R
): R {
  for (const [key, value] of entries(obj)) {
    init = reducer(init, key, value)
  }
  return init
}

export function reduceObj<R, T extends object>(obj: T, reducer: (acc: R, key: keyof T, value: T[keyof T]) => R): R {
  let init = {} as R
  for (const [key, value] of entries(obj)) {
    init = reducer(init, key, value)
  }
  return init
}

export function map<T extends object, R>(obj: T, mapper: (key: keyof T, value: T[keyof T]) => R): R[] {
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
