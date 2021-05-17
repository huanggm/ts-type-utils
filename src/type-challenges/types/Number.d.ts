export type Absolute<T extends number | string | bigint> =
  T extends `${infer First}${infer Rest}`
    ? First extends "-"
      ? Rest
      : T
    : Absolute<`${T}`>;

export type Absolute2<T extends number | string | bigint> = T extends string
  ? T extends `${infer L}${infer R}`
    ? L extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
      ? `${L}${Absolute2<R>}`
      : `${Absolute2<R>}`
    : ""
  : Absolute2<`${T}`>;
