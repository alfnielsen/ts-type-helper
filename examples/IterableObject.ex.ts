import iterate from "../src/iterate"

// base objects
const obj = { a: 1, b: 2 } as const

for (const [key, value] of Object.entries(obj)) {
  console.log(key) // => string (But we want 'a' | 'b')
  console.log(value) // => 1, 2 ( ✓ )
  console.log(obj[key]) // ✗ (tsc complains)
}
for (const key of Object.keys(obj)) {
  console.log(key) // => string (But we want 'a' | 'b')
  console.log(obj[key]) // ✗ (tsc complains)
}

for (const value of Object.values(obj)) {
  console.log(value) // => 1, 2 ( ✓ )
}

// The Iterate class fixes this:

for (const key of iterate.keys(obj)) {
  console.log(key) // => 'a' | 'b'
  console.log(obj[key]) // ✓ (tsc accepts)
}

for (const [key, value] of iterate.entries(obj)) {
  console.log(key) // => 'a', 'b'
  console.log(value) // => 1, 2
  console.log(obj[key]) // ✓
}

for (const value of iterate.values(obj)) {
  console.log(value) // => 1, 2 ( ✓ )
}
