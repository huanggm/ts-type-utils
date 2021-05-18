import { UnionToIntersection } from "./Union";

/**
 * 实现 Pick
 * @example
 * ```ts
 * interface Todo {
 *   title: string
 *   description: string
 *   completed: boolean
 * }
 *
 * type TodoPreview = MyPick<Todo, 'title' | 'completed'>
 *
 * const todo: TodoPreview = {
 *     title: 'Clean room',
 *     completed: false,
 * }
 * ```
 */
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 实现 DeepPick
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

/**
 * 实现 Omit
 * @example
 * ```ts
 * interface Todo {
 *   title: string
 *   description: string
 *   completed: boolean
 * }
 *
 * type TodoPreview = MyOmit<Todo, 'description' | 'title'>
 *
 * const todo: TodoPreview = {
 *   completed: false,
 * }
 * ```
 */
export type Omit<T, K> = {
  [P in Exclude<keyof T, K>]: T[P];
};

/**
 * 实现给对象添加属性
 * @example
 * ```ts
 * type Test = { id: '1' }
 * type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
 * ```
 */
export type AppendToObject<T, U extends string, V> = {
  [P in U | keyof T]: P extends keyof T ? T[P] : V;
};

/**
 * 实现两个对象的合并
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
