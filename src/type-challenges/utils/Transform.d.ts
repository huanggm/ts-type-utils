/**
 * 字符串转合集
 * @example
 * ```ts
 * type Test = '123';
 * type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
 * ```
 */
export type StringToUnion<T extends string> = T extends `${infer L}${infer R}`
  ? L | StringToUnion<R>
  : never;

/**
 * 实现字符串转数字
 * @example
 * ```ts
 * StringToNumber<'0'> // 0
 * StringToNumber<'5'> // 5
 * StringToNumber<'12'> // 12
 * StringToNumber<'27'> // 27
 * ```
 */
export type StringToNumber<S extends string, T extends any[] = []> =
  S extends `${T["length"]}` ? T["length"] : StringToNumber<S, [any, ...T]>;

/**
 * 元组转换为对象
 * @example
 * ```ts
 * const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
 * const result: TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
 * ```
 */
export type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P;
};

/**
 * 元组转合集
 * @example
 * ```ts
 * type Arr = ['1', '2', '3']
 * const a: TupleToUnion<Arr> // expected to be '1' | '2' | '3'
 * ```
 */
export type TupleToUnion<T extends readonly any[]> = T[number];

/**
 * @example
 * ```ts
 * TupleToEnum<["macOS", "Windows", "Linux"]>
 * // -> { readonly MacOS: "macOS", readonly Windows: "Windows", readonly Linux: "Linux" }
 *
 * TupleToEnum<["macOS", "Windows", "Linux"], true>
 * // -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }
 * ```
 */
export type TupleToEnum<
  T extends readonly string[],
  N extends boolean = false
> = {
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
