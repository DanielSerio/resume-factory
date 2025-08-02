export type DotNotationPath<T> = {
  [K in keyof T]: K extends string
  ? T[K] extends object
  ? `${K}` | `${K}.${DotNotationPath<T[K]>}`
  : `${K}`
  : never;
}[keyof T];

export type Pretty<Type> = {
  [k in keyof Type]: Type[k];
} & {};