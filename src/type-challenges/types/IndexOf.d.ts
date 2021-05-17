export type IndexOf<
  T extends readonly string[],
  K extends string,
  R extends any[] = []
> = T extends readonly [infer S1, ...infer S2]
  ? S1 extends K
    ? R["length"]
    : S2 extends readonly string[]
    ? IndexOf<S2, K, [any, ...R]>
    : never
  : never;
