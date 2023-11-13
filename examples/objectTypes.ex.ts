import { MappedKeys, Optionable, Obj, Writeable } from "../src"

const base = { a: 1, b: 2, c: "Hello" }
const objRreadonlyProps = Object.freeze(Object.assign({}, base))
objRreadonlyProps.a = 2 // ✗

const objWriteableProps: Writeable<typeof objRreadonlyProps> = Object.assign({}, objRreadonlyProps)
objWriteableProps.a = 2 // ✓

const objOptinalProps = { a: 1, b: 2, c: "Hello" } as { a?: number; b?: number; c?: string }

const nonOptionalObjIncorrect1: Partial<typeof objRreadonlyProps> = Object.assign({}, objOptinalProps) // ✗
const nonOptionalObjIncorrect1: Partial<typeof objRreadonlyProps> = Obj(objOptinalProps).clone() // ✗

const nonOptionalObjIncorrect = Obj(objOptinalProps).clone() //
nonOptionalObjIncorrect.a = 10 // ✓
nonOptionalObjIncorrect.b = 20 // ✓
nonOptionalObjIncorrect.c = "Hello" // ✓
nonOptionalObjIncorrect.a = undefined // ✓ (optional)
nonOptionalObjIncorrect.b = "Hello" // ✗ (number)
nonOptionalObjIncorrect.c = 42 // ✗ (string)

const nonOptionalObjIncorrectReadonly = Obj(objRreadonlyProps).clone() //

nonOptionalObjIncorrectReadonly.a = 2 // ✗ (Readonly)
nonOptionalObjIncorrectReadonly.b = 2 // ✗ (Readonly)
nonOptionalObjIncorrectReadonly.c = "Hello" // ✗ (Readonly)

const nonOptionalObjIncorrectReadonlyOverride = Obj(objRreadonlyProps).clone({
  a: 42,
}) //
nonOptionalObjIncorrectReadonlyOverride.a = 2 // ✗ (Readonly)

const nonOptionalObjIncorrectWritableOverride = Obj(objRreadonlyProps).writableClone({
  a: 42,
}) //
nonOptionalObjIncorrectWritableOverride.a = 2 // ✓ (number)
nonOptionalObjIncorrectWritableOverride.b = 2 // ✓ (number)
nonOptionalObjIncorrectWritableOverride.c = 2 // ✗ (string)
nonOptionalObjIncorrectWritableOverride.c = "ok" // ✓

const nonOptionalObjCorrectClone = Obj(objOptinalProps).clone({
  b: 2,
  c: "Hello",
}) // ✗

const nonOptionalObjCorrectClone = Obj(objOptinalProps).clone({
  b: 2,
  c: "Hello",
}) // ✗

nonOptionalObjCorrectClone.a = 2 // number | undefined
nonOptionalObjCorrectClone.b = 2 // number | undefined
nonOptionalObjCorrectClone.c = "Hello" // string | undefined

const nonOptionalObjCorrectWritableClone = Obj(objOptinalProps).writableClone({
  b: 2,
  c: "Hello",
}) // ✗

nonOptionalObjCorrectWritableClone.a = 2 // number | undefined
nonOptionalObjCorrectWritableClone.b = 2 // number | undefined
nonOptionalObjCorrectWritableClone.c = "Hello" // string | undefined

const nonOptionalObjCorrect2: Partial<typeof objOptinalProps> = Obj(objOptinalProps).defaults({
  b: 2,
  c: "Hello",
}) // ✗

const nonOptionalObjCorrect3: Partial<typeof objOptinalProps> = Obj(objOptinalProps).override({
  b: 2,
  c: "Hello",
}) // ✗

const nonOptionalObjCorrectNative: Partial<typeof objOptinalProps> = Object.assign(
  {
    a: 1,
    b: 2,
    c: "Hello",
  },
  objOptinalProps
) // ✓

typeof nonOptionalObjCorrectNative.a // ✓ (number)
typeof nonOptionalObjCorrectNative.b // ✓ (number)
typeof nonOptionalObjCorrectNative.c // ✓ (string)

const nonOptionalObjCorrect: Partial<typeof objOptinalProps> = {
  a: 1,
  b: 2,
  c: "Hello",
} // ✓
