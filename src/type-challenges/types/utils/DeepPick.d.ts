import { UnionToIntersection } from "./Transform";

/**
 * 实现深度pick
 * @example
 * ```ts
 * type Obj = {
 *   a: number,
 *   b: string,
 *   c:  boolean,
 *   obj: {
 *     d: number,
 *     e: string,
 *     f:  boolean,
 *     obj2: {
 *       g: number,
 *       h: string,
 *       i: boolean,
 *     }
 *   },
 *   obj3: {
 *     j: number,
 *     k: string,
 *     l: boolean,
 *   }
 * }
 *
 * DeepPick<Obj, ''> // unknown
 * DeepPick<Obj, 'a'> // { a: number }
 * DeepPick<Obj, 'a' | 'obj.e'> // { a: number } & { obj: { e: string }}
 * DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'> // { a: number } & { obj: { e: string }} & { obj: { obj2: { i: boolean } }}
 * ```
 */
export type DeepPick<D, Keys> = UnionToIntersection<
  Keys extends infer K ? DeepPick2<D, K> : never
>;
export type DeepPick2<D, K> = K extends `${infer L}.${infer R}`
  ? L extends keyof D
    ? { [ll in L]: DeepPick2<D[L], R> }
    : unknown
  : K extends keyof D
  ? { [kk in K]: D[K] }
  : unknown;
