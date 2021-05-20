/**
 * 字符串或者数字转绝对值 - 去掉负号
 * @example
 * ```ts
 * type Test = -100;
 * type Result = Absolute<Test>; // expected to be "100"
 * ```
 */
export type Absolute<T extends number | string | bigint> =
  T extends `${infer First}${infer Rest}`
    ? First extends "-"
      ? Rest
      : T
    : Absolute<`${T}`>;

/**
 * 字符串或者数字转绝对值 - 去掉负号
 * 这里是Absolute的第二种实现方式
 * @example
 * ```ts
 * type Test = -100;
 * type Result = AbsoluteV2<Test>; // expected to be "100"
 * ```
 */
export type AbsoluteV2<T extends number | string | bigint> = T extends string
  ? T extends `${infer L}${infer R}`
    ? L extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
      ? `${L}${AbsoluteV2<R>}`
      : `${AbsoluteV2<R>}`
    : ""
  : AbsoluteV2<`${T}`>;
