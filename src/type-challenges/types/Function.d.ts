/**
 * 获取函数返回值类型
 * @example
 * ```ts
 * const fn = (v: boolean) => {
 *   if (v)
 *     return 1
 *   else
 *     return 2
 * }
 *
 * type a = ReturnType<typeof fn> // 应推导出 "1 | 2"
 * ```
 */
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

/**
 * 实现函数追加参数
 * @example
 * ```ts
 * type Fn = (a: number, b: string) => number
 *
 * type Result = AppendArgument<Fn, boolean>
 * // 期望是 (a: number, b: string, x: boolean) => number
 * ```
 */
export type AppendArgument<Fn extends (...args: any) => any, A> = (
  ...args: [...Parameters<Fn>, A]
) => ReturnType<Fn>;

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