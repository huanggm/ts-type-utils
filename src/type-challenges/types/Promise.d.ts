/**
 * 获取Promise真实类型
 * @example
 * ```ts
 * type X = Promise<string>
 * type Y = Promise<{ field: number }>
 *
 * Awaited<X> // expected string
 * Awaited<Y> // expected { field: number }
 * ```
 */
export type Awaited<T> = T extends Promise<infer R> ? R : T;

export type AwaitedArray<T extends any[]> = {
  [P in keyof T]: Awaited<T[P]>;
};

/**
 * 实现PromiseAll函数
 * @example
 * ```ts
 * const promise1 = Promise.resolve(3);
 * const promise2 = 42;
 * const promise3 = new Promise<string>((resolve, reject) => {
 *   setTimeout(resolve, 100, 'foo');
 * });
 *
 * // expected to be `Promise<[number, number, string]>`
 * const p = Promise.all([promise1, promise2, promise3] as const)
 * ```
 */
export function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<AwaitedArray<T>>;
