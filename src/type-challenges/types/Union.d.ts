/**
 * 排除合集中的某些类型
 * @example
 * ```ts
 * Exclude<"a" | "b" | "c", "a" | "b"> // expected "c"
 * ```
 */
export type Exclude<T, U> = T extends U ? never : T;

export type Extract<U, T> = U extends T ? U : never;

/**
 * 实现排列组合
 * @example
 * ```ts
 * type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
 * ```
 */
export type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends infer U
  ? [U, ...Permutation<Exclude<T, U>>]
  : [];

/**
 * @example
 * ```ts
 * type I = Union2Intersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
 * ```
 */
export type UnionToIntersection<U> = (
  U extends any ? (arg: U) => any : never
) extends (arg: infer I) => void
  ? I
  : never;

/**
 * @example
 * ```ts
 * LastInUnion<1 | 2> // 2
 * ```
 */
export type LastInUnion<U> = UnionToIntersection<
  U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
  ? L
  : never;

/**
 * @example
 * ```ts
 * UnionToTuple<1 | 2> // [1, 2]
 * ```
 */
export type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];
