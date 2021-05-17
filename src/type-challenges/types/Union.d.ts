export type Exclude<T, U> = T extends U ? never : T;

export type Extract<U, T> = U extends T ? U : never;

export type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends infer U
  ? [U, ...Permutation<Exclude<T, U>>]
  : [];

export type UnionToIntersection<U> = (
  U extends any ? (arg: U) => any : never
) extends (arg: infer I) => void
  ? I
  : never;
