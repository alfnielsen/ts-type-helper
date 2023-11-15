export type ObjectLike<T> = { [k: string]: T[keyof T] }
/**
 * Remove "readonly" from all properties
 */
export type AsWriteable<T> = { -readonly [P in keyof T]: T[P] }

/**
 * Remove "readonly" from all properties (and Partial)
 */
export type Writeable<T> = { -readonly [P in keyof T]: T[keyof T] }

/**
 * Remove "readonly" from all properties and make them optional
 */
export type AsOptionable<T> = { -readonly [P in keyof T]?: T[P] }

/**
 * Remove "readonly" from all properties and make them optional (and Partial)
 */
export type Optionable<T> = { -readonly [P in keyof T]?: T[keyof T] }

export type MappedKeys<T, R> = { -readonly [P in keyof T]: R }

// Readonly<T> is already defined in lib.es5.d.ts
//export type Readonly<T> = { readonly [P in keyof T]: T[P] }
// Required<T> is already defined in lib.es5.d.ts
//export type NonOptional<T> = { [P in keyof T]-?: T[P] }
