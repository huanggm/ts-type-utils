/**
 * 实现Get函数
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
 * type A = Get<Data, 'hello'> // 'world'
 * type B = Get<Data, 'foo.bar.count'> // 6
 * type C = Get<Data, 'foo.bar'> // { value: 'foobar', count: 6 }
 * ```
 */
export type Get<T, K> = K extends `${infer L}.${infer R}`
  ? L extends keyof T
    ? Get<T[L], R>
    : never
  : K extends ""
  ? never
  : K extends keyof T
  ? T[K]
  : never;
