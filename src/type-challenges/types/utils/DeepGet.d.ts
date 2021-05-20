/**
 * 实现DeepGet函数
 * @example
 * ```ts
 * type Data = {
 *   foo: {
 *     bar: {
 *       value: 'foobar',
 *       count: 6,
 *     },
 *     included: true,
 *   },
 *   hello: 'world'
 * }
 *
 * type A = DeepGet<Data, 'hello'> // 'world'
 * type B = DeepGet<Data, 'foo.bar.count'> // 6
 * type C = DeepGet<Data, 'foo.bar'> // { value: 'foobar', count: 6 }
 * ```
 */
export type DeepGet<T, K> = K extends `${infer L}.${infer R}`
  ? L extends keyof T
    ? DeepGet<T[L], R>
    : never
  : K extends ""
  ? never
  : K extends keyof T
  ? T[K]
  : never;
