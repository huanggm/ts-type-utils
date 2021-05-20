/**
 * 实现获取必须字段 - 返回对象
 * https://github.com/type-challenges/type-challenges/issues/1087
 * @example
 * ```ts
 * GetRequired<{ foo: number, bar?: string }> // expected to be { foo: number }
 * ```
 */
export type GetRequired<T> = Pick<T, RequiredKeys<T>>;

// 实现获取可选字段 - 返回对象
/**
 * @example
 * ```ts
 * GetOptional<{ foo: number, bar?: string }> // expected to be { bar?: string }
 * ```
 */
export type GetOptional<T> = Pick<T, OptionalKeys<T>>;

/**
 * 实现获取必填字段 - 返回合集
 * @example
 * ```ts
 * RequiredKeys<{ foo: number; bar?: string }>; // expected to be "foo"
 * ```
 */
export type RequiredKeys<T, K = keyof T> = K extends keyof T
  ? Omit<T, K> extends T
    ? never
    : K
  : never;

/**
 * 实现获取可选字段 - 返回合集
 * @example
 * ```ts
 * OptionalKeys<{ a: undefined, b?: undefined, c?: string, d?: null }>; // expected to be "b" | "c" | "d"
 * ```
 */
export type OptionalKeys<T, K = keyof T> = K extends keyof T
  ? Omit<T, K> extends T
    ? K
    : never
  : never;

/**
 * 替换合集中的对象中的部分key的类型
 * @example
 * ```ts
 * type NodeA = {
 *   type: 'A'
 *   name: string
 *   flag: number
 * }
 *
 * type NodeB = {
 *   type: 'B'
 *   id: number
 *   flag: number
 * }
 *
 * type NodeC = {
 *   type: 'C'
 *   name: string
 *   flag: number
 * }
 *
 *
 * type Nodes = NodeA | NodeB | NodeC
 *
 * type ReplacedNodes = ReplaceKeys<Nodes, 'name' | 'flag', {name: number, flag: string}> // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.
 *
 * type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', {aa: number}> // {type: 'A', name: never} | NodeB | {type: 'C', name: never} // would replace name to never
 * ```
 */
export type ReplaceKeys<U, T, Y> = {
  [k in keyof U]: k extends T ? (k extends keyof Y ? Y[k] : never) : U[k];
};

/**
 * 实现给对象添加属性
 * @example
 * ```ts
 * type Test = { id: '1' }
 * type Result = AppendKey<Test, 'value', 4> // expected to be { id: '1', value: 4 }
 * ```
 */
export type AppendKey<T, U extends string, V> = {
  [P in U | keyof T]: P extends keyof T ? T[P] : V;
};

/**
 * 实现两个对象的合并，后面对象覆盖前面对象的相同属性
 * @example
 * ```ts
 * type Foo = {
 *   a: number;
 *   b: string;
 * };
 * type Bar = {
 *   b: number;
 * };
 *

 * Merge<Foo, Bar> // expected to be { a: number; b: number; }
 * ```
 */
export type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
    ? F[K]
    : never;
};

/**
 * 实现 Diff
 * @example
 * ```ts
 * type Foo = {
 *   name: string
 *   age: string
 * }
 * type Bar = {
 *   name: string
 *   age: string
 *   gender: number
 * }
 *
 * Diff<Foo, Bar> // { gender: number }
 * ```
 */
export type Diff<O, O1> = {
  [K in
    | Exclude<keyof O, keyof O1>
    | Exclude<keyof O1, keyof O>]: K extends keyof O
    ? O[K]
    : K extends keyof O1
    ? O1[K]
    : never;
};

/**
 * 实现删除索引签名属性
 * @example
 * ```ts
 * type Foo = {
 *   [key: string]: any;
 *   foo(): void;
 * }
 *
 * type A = RemoveIndexSignature<Foo>  // expected { foo(): void }
 * ```
 */
export type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : K extends number
    ? never
    : K]: T[K];
};
