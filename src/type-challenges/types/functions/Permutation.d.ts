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
