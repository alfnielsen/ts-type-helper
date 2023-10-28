# ts-type-helper

Add \"missing\" types for Typescript !

**Examples:**  

Strongly typed iterator versions of `for (let key of Object.entries(obj))`
```ts
// key is keyof typeof obj 
// not "string" as with Object.entries(obj) 
for (let key of iterate.entries(obj))
```

 isKeyOf, keyOf and other base functionality to make TS better like an iterator.entries() to replace Object.entires ect.

## Why?

For some elements of Typescript type-gymnastics is required to get the correct type.  
This library tries to make it easier to get the correct type without having to spend time on type-gymnastics,
and still keep the type-safety correct.

## Install

```bash
npm install --save-dev ts-type-helper
```

## Usage

import the functions or types you need from the library with
```ts
import { XXX } from 'ts-type-helper';
```

## Examples

Iterate over object keys and values:

```ts
import { interator } from 'ts-type-helper';

const obj = { a: 1, b: 2 };

for (const [key, value] of interator.entries(obj)) {
  // key is 'a' | 'b'
  console.log(key, value);
  // with Object.entries(obj) key would be string
}

```

**Object key check and casting:**

```ts
import { isKeyOf, keyOf, keyOfCast  } from 'ts-type-helper';

const obj = { a: 1, b: 2 };

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

```





