/**
 * 实现 IsAny
 * @example
 * ```ts
 * IsAny<any> // true
 * IsAny<undefined> // false
 * IsAny<unknown> // false
 * IsAny<never> // false
 * IsAny<string> // false
 * ```
 */
export type IsAny<T> = boolean extends (T extends 1 ? true : false)
  ? true
  : false;

export type IsAnyV2<T> = [T] extends [never]
  ? false
  : T extends 1 & T
  ? true
  : false;
