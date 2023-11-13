/**
 * Test if a key is a key of an object
 *
 * (Let typescript know that a key is a key of an object, to allow for indexing ect.)
 *
 * @example
 * ```ts
 * for (const key of Object.keys(obj)) {
 *   console.log(obj[key]) // ✗
 *   if (isKeyOf(key, obj)) {
 *     console.log(obj[key]) // ✓
 *   }
 * }
 * ```
 * @see Also see {@link asKeyOf} and {@link keyOf}
 * @param k
 * @param x
 * @returns
 */
export function isKeyOf<T extends object>(k: PropertyKey, x: T): k is keyof T {
  return k in x
}

/**
 * `keyOf` is like `isKeyOf` but it asserts that the key is not undefined
 *
 * No real checks are done, it just tells TS that the key is a key of the object.
 *
 * @example
 * ```ts
 * for (const key of Object.keys(obj)) {
 *   console.log(obj[key]) // ✗
 *   const k = keyOf(key, obj)
 *   console.log(obj[k]) // ✓
 *   const k2 = keyOf<typeof obj>(key) // generic type inference
 *   console.log(obj[k2]) // ✓
 * }
 * ```
 * @see Also see {@link isKeyOf} and {@link keyOf}
 * @param x
 * @param k
 * @returns
 */
export function asKeyOf<T extends object>(k: PropertyKey, x?: T): keyof T {
  return k as keyof T
}

/**
 * `keyOfCast` is like `isKeyOf` but it return the key (or undefined if it is not a key of the object)
 *
 * @example
 * ```ts
 * for (const key of Object.keys(obj)) {
 *   console.log(obj[key]) // ✗
 *   const k = keyOfCast(key, obj)
 *   if (k) {
 *     console.log(obj[k]) // ✓
 *   }
 *   console.log(obj[k]) // ✗
 *   // Typescript still complains because it could be undefined.
 *   // If you know this is not undefined, use 'castAs' instead
 * }
 * ```
 * @see Also see {@link asKeyOf} and {@link keyOf}
 * @param x
 * @param k
 * @returns
 */
export function keyOf<T extends object>(k: PropertyKey, x: T): keyof T | undefined {
  if (k in x) return k as keyof T
}

export const Keys = {
  isKeyOf,
  asKeyOf,
  keyOf,
}

export default Keys
