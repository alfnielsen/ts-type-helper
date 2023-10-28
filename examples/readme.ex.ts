import { isKeyOf, keyOf, keyOfCast } from "../src/keyOf"
import { entries } from "../src/iterate"

const obj = { a: 1, b: 2 }

// ## Iterator
for (const [key, value] of entries(obj)) {
  // key is 'a' | 'b'
  console.log(key, value)
  // with Object.entries(obj) key would be string
}

// ## isKeyOf / keyOf / keyOfCast
for (const key of Object.keys(obj)) {
  // Problem: key is string
  console.log(key, obj[key]) // error
  //  isKeyOf
  if (isKeyOf(key, obj)) {
    console.log(key, obj[key]) // key is 'a' | 'b'
  }
  //  keyOfCast
  var k = keyOfCast(key, obj) // k is 'a' | 'b' | undefined
  console.log(obj[k]) // error (k could be undefined)
  if (k) {
    console.log(obj[k]) // k is 'a' | 'b'
  }
  //  keyOf
  console.log(key, obj[keyOf(key, obj)]) // key is 'a' | 'b'
}
