/**
 * 给对象增加新的key
 */
export type AppendKey<T, U extends string, V> = {
  [P in U | keyof T]: P extends keyof T ? T[P] : V;
};

/**
 * 给数组push新值
 */
export type PushUniq<T extends any[], U> = U extends T[number] ? T : [...T, U];

/**
 * 给对象的数组属性中push新值-还是返回这个对象
 */
export type PushKey<R, U extends string, V> = {
  [K in keyof R]: K extends U
    ? R[K] extends infer M
      ? M extends any[]
        ? PushUniq<M, V>
        : V extends R[K]
        ? V
        : [R[K], V]
      : never
    : R[K];
};

/**
 * 解析query-string
 * @example
 * ```ts
 * ParseQueryString<''> // {}
 * ParseQueryString<'k1'> // { k1: true }
 * ParseQueryString<'k1&k1'> // { k1: true }
 * ParseQueryString<'k1&k2'> // { k1: true, k2: true }
 * ParseQueryString<'k1=v1'> // { k1: 'v1' }
 * ParseQueryString<'k1=v1&k1=v2'> // { k1: ['v1', 'v2'] }
 * ParseQueryString<'k1=v1&k2=v2'> // { k1: 'v1', k2: 'v2' }
 * ParseQueryString<'k1=v1&k2=v2&k1=v2'> // { k1: ['v1', 'v2'], k2: 'v2' }
 * ParseQueryString<'k1=v1&k2'> // { k1: 'v1', k2: true }
 * ParseQueryString<'k1=v1&k1=v1'> // { k1: 'v1' }
 * ParseQueryString<'k1=v1&k1=v2&k1=v1'> // { k1: ['v1', 'v2'] }
 * ```
 */
export type ParseQueryString<S extends string, R extends any = {}> =
  S extends ""
    ? R
    : S extends `${infer A}&${infer B}`
    ? ParseQueryString<B, ParseQueryString<A, R>>
    : S extends `${infer P}=${infer Q}`
    ? P extends keyof R
      ? PushKey<R, P, Q>
      : AppendKey<R, P, Q>
    : S extends keyof R
    ? PushKey<R, S, true>
    : AppendKey<R, S, true>;
