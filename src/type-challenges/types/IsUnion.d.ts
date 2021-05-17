export type IsUnion<T, B = T> = T extends B
  ? [B] extends [T]
    ? false
    : true
  : never;
