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
 * 元组中第一个元素
 * @example
 * ```ts
 * type arr1 = ['a', 'b', 'c']
 * type arr2 = [3, 2, 1]
 *
 * type head1 = First<arr1> // expected to be 'a'
 * type head2 = First<arr2> // expected to be 3
 * ```
 */
export type First<T extends any[]> = T extends [] ? never : T[0];

/**
 * 元组中最后一个元素
 * @example
 * ```ts
 * type arr1 = ['a', 'b', 'c']
 * type arr2 = [3, 2, 1]
 *
 * type tail1 = Last<arr1> // expected to be 'c'
 * type tail2 = Last<arr2> // expected to be 1
 * ```
 */
export type Last<T extends any[]> = T extends [...any, infer R] ? R : never;

/**
 * 实现出堆 - Pop
 * @example
 * ```ts
 * type arr1 = ['a', 'b', 'c', 'd']
 * type arr2 = [3, 2, 1]
 *
 * type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
 * type re2 = Pop<arr2> // expected to be [3, 2]
 * ```
 */
export type Pop<T> = T extends [...items: infer L, tail: any] ? L : never;

/**
 * 获取元组长度
 * @example
 * ```ts
 * type tesla = ['tesla', 'model 3', 'model X', 'model Y']
 * type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
 *
 * type teslaLength = LengthOfTuple<tesla>  // expected 4
 * type spaceXLength = LengthOfTuple<spaceX> // expected 5
 * ```
 */
export type LengthOfTuple<T extends readonly any[]> = T["length"];

/**
 * 实现元组concat
 * @example
 * ```ts
 * type Result = Concat<[1], [2]> // expected to be [1, 2]
 * ```
 */
export type Concat<T extends readonly any[], U extends readonly any[]> = [
  ...T,
  ...U
];

/**
 * 实现元组Includes
 * @example
 * ```ts
 * type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
 * ```
 */
export type Includes<T extends readonly any[], U> = U extends T[number]
  ? true
  : false;

/**
 * 实现元组扁平化
 * @example
 * ```ts
 * type flatten = Flatten<[1, 2, [3, 4], [[[5]]]> // [1, 2, 3, 4, 5]
 * ```
 */
export type Flatten<T extends any[]> = T extends [h: infer L, ...tail: infer R]
  ? [
      ...(L extends any[]
        ? L["length"] extends 1
          ? L[0] extends any[]
            ? Flatten<L[0]>
            : Flatten<L>
          : Flatten<L>
        : [L]),
      ...Flatten<R>
    ]
  : [];

/**
 * 定义python like的false值的元组
 */
export type False = 0 | "" | false | [] | { [key: string]: never };

/**
 * 实现python中的AnyOf函数 - 任意一个元素不是false则返回true
 * @example
 * ```ts
 * type Sample1 = AnyOf<[1, "", false, [], {}]>; // expected to be true.
 * type Sample2 = AnyOf<[0, "", false, [], {}]>; // expected to be false.
 * ```
 */
export type AnyOf<T extends readonly any[]> = T[number] extends False
  ? false
  : true;

// 实现过滤函数
export type FilterOut<T extends any[], F> = T extends [
  f: infer S1,
  ...l: infer S2
]
  ? [S1] extends [F]
    ? FilterOut<S2, F>
    : [S1, ...FilterOut<S2, F>]
  : [];
