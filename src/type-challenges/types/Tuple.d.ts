export type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P;
};

export type TupleToUnion<T extends readonly any[]> = T[number];

export type First<T extends any[]> = T extends [] ? never : T[0];

export type Last<T extends any[]> = T extends [...any, infer R] ? R : never;

export type Pop<T> = T extends [...items: infer L, tail: any] ? L : never;

export type Length<T extends readonly any[]> = T["length"];

export type Concat<T extends readonly any[], U extends readonly any[]> = [
  ...T,
  ...U
];

export type Includes<T extends readonly any[], U> = U extends T[number]
  ? true
  : false;

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

export type False = 0 | "" | false | [] | { [key: string]: never };

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
