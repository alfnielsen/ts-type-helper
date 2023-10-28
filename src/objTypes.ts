export type Readonly<T> = { readonly [P in keyof T]: T[keyof T] }

export type Writeable<T> = { -readonly [P in keyof T]: T[keyof T] }

export type Optionalble<T> = { -readonly [P in keyof T]?: T[keyof T] }

export type MappedKeys<T, R> = { -readonly [P in keyof T]: R }
