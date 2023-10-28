import { iterate } from "../src/iterate"
import { keyOf, keyOfCast, isKeyOf } from "../src/keyOf"

// base objects
const obj = { a: 1, b: 2 } as const

for (const key of Object.keys(obj)) {
  console.log(obj[key]) // ✗
  if (isKeyOf(key, obj)) {
    console.log(obj[key]) // ✓
  }
}
// isKeyOf
for (const key of Object.keys(obj)) {
  console.log(obj[key]) // ✗
  const k = keyOf(key, obj)
  console.log(obj[k]) // ✓
  const k2 = keyOf<typeof obj>(key) // generic type inference
  console.log(obj[k2]) // ✓
}

keyOfCast
for (const key of Object.keys(obj)) {
  console.log(obj[key]) // ✗
  const k = keyOfCast(key, obj)
  if (k) {
    console.log(obj[k]) // ✓
  }
  console.log(obj[k]) // ✗
  // Typescript still complains because it could be undefined.
  // If you know this is not undefined, use 'castAs' instead
}
