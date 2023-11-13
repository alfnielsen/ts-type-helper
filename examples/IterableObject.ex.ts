import { Obj } from "../src"

// base objects
const item = { a: 1, b: 2 } as const

for (const [key, value] of Object.entries(item)) {
  console.log(key) // => string (But we want 'a' | 'b')
  console.log(value) // => 1, 2 ( ✓ )
  console.log(item[key]) // ✗
}
for (const key of Object.keys(item)) {
  console.log(key) // => string (But we want 'a' | 'b')
  console.log(item[key]) // ✗
}

for (const value of Object.values(item)) {
  console.log(value) // => 1, 2 ( ✓ )
}

// ------------------------- The "obj" (iterator) method -------------------------

for (const key of Obj(item).keys()) {
  console.log(key) // => 'a' | 'b'
  console.log(item[key]) // ✓
}

for (const [key, value] of Obj(item).entries()) {
  console.log(key) // => 'a', 'b'
  console.log(value) // => 1, 2
  console.log(item[key]) // ✓
}

for (const value of Obj(item).values()) {
  console.log(value) // => 1, 2 ( ✓ )
}
