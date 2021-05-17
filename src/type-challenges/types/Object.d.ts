import { UnionToIntersection } from "./Union";

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

export type Omit<T, K> = {
  [P in Exclude<keyof T, K>]: T[P];
};

export type AppendToObject<T, U extends string, V> = {
  [P in U | keyof T]: P extends keyof T ? T[P] : V;
};

export type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
    ? F[K]
    : never;
};

export type Diff<O, O1> = {
  [K in
    | Exclude<keyof O, keyof O1>
    | Exclude<keyof O1, keyof O>]: K extends keyof O
    ? O[K]
    : K extends keyof O1
    ? O1[K]
    : never;
};

// 替换联合类型的对象中的部分key的类型
export type ReplaceKeys<U, T, Y> = {
  [k in keyof U]: k extends T ? (k extends keyof Y ? Y[k] : never) : U[k];
};

// 实现删除索引签名属性
export type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : K extends number
    ? never
    : K]: T[K];
};

// 实现获取必须字段
// https://github.com/type-challenges/type-challenges/issues/1087

// 实现获取可选字段
export type GetOptionalObjKeys<T, K = keyof T> = K extends keyof T
  ? Omit<T, K> extends T
    ? K
    : never
  : never;

export type GetOptional<T> = Pick<T, GetOptionalObjKeys<T>>;

// 实现获取必填字段
export type RequiredKeys<T, K = keyof T> = K extends keyof T
  ? Omit<T, K> extends T
    ? never
    : K
  : never;

// 实现获取可选字段
export type OptionalKeys<T, K = keyof T> = K extends keyof T
  ? Omit<T, K> extends T
    ? K
    : never
  : never;

// 实现Get函数
export type Get<T, K> = K extends `${infer L}.${infer R}`
  ? L extends keyof T
    ? Get<T[L], R>
    : never
  : K extends ""
  ? never
  : K extends keyof T
  ? T[K]
  : never;
