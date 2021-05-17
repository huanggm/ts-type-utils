/**
 * 实现 If
 * @example
 * ```ts
 * type A = If<true, 'a', 'b'>  // expected to be 'a'
 * type B = If<false, 'a', 'b'> // expected to be 'b'
 * ```
 */
export type If<C, T, F> = C extends true ? T : C extends false ? F : never;
