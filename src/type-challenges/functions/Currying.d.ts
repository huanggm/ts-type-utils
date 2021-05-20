/**
 * 实现科里化函数
 * @example
 * ```ts
 * const add = (a: number, b: number) => a + b
 * const three = add(1, 2)
 *
 * const curriedAdd = Currying(add)
 * const five = curriedAdd(2)(3)
 * ```
 */
export function Currying<F>(fn: F): CurryingReturn<F>;
export type CurryingReturn<T> = T extends (
  ...args: [ll: infer LL, ...rr: infer RR]
) => infer R
  ? RR extends []
    ? T
    : (ll: LL) => CurryingReturn<(...args: RR) => R>
  : never;
