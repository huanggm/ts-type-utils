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
