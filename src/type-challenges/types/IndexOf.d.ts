/**
 * @example
 * ```ts
 * Enum<["macOS", "Windows", "Linux"]>
 * // -> { readonly MacOS: "macOS", readonly Windows: "Windows", readonly Linux: "Linux" }
 *
 * Enum<["macOS", "Windows", "Linux"], true>
 * // -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }
 * ```
 */
export type Enum<T extends readonly string[], N extends boolean = false> = {
  readonly [Key in T[number] as Capitalize<Key>]: N extends false
    ? Key
    : IndexOf<T, Key>;
};

export type IndexOf<
  Arr extends readonly string[],
  T extends string,
  Passed extends any[] = []
> = Arr[Passed["length"]] extends T
  ? Passed["length"]
  : IndexOf<Arr, T, [...Passed, 1]>;

export type IndexOfV2<
  T extends readonly string[],
  K extends string,
  R extends any[] = []
> = T extends readonly [infer S1, ...infer S2]
  ? S1 extends K
    ? R["length"]
    : S2 extends readonly string[]
    ? IndexOfV2<S2, K, [any, ...R]>
    : never
  : never;
