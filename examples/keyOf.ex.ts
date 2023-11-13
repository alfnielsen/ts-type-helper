import { Iterate, Keys } from "../src"

// base objects
const obj = { a: 1, b: 2 } as const

for (const key of Object.keys(obj)) {
  console.log(obj[key]) // ✗
  if (Keys.isKeyOf(key, obj)) {
    console.log(obj[key]) // ✓
  }
}
// isKeyOf
for (const key of Object.keys(obj)) {
  console.log(obj[key]) // ✗
  const k = Keys.asKeyOf(key, obj)
  console.log(obj[k]) // ✓
  const k2 = Keys.asKeyOf<typeof obj>(key) // generic type inference
  console.log(obj[k2]) // ✓
}

for (const key of Object.keys(obj)) {
  console.log(obj[key]) // ✗
  const k = Keys.keyOf(key, obj)
  if (k) {
    console.log(obj[k]) // ✓
  }
  console.log(obj[k]) // ✗
  // Typescript still complains because it could be undefined.
  // If you know this is not undefined, use 'castAs' instead
}
