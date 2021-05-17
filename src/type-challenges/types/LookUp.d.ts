/**
 * 根据type字段获取相应的类型
 * @example
 * ```ts
 * interface Cat {
 *   type: 'cat'
 *   breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
 * }
 *
 * interface Dog {
 *   type: 'dog'ƒ
 *   breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
 *   color: 'brown' | 'white' | 'black'
 * }
 *
 * type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
 * ```
 */
export type LookUp<U, T> = U extends { type: T } ? U : never;
