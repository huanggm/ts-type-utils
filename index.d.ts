// 实现 Pick
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
  }
  // 实现 Readonly
  type MyReadonly<T> = {
    readonly [E in keyof T]: T[E]
  }

  // 实现 Readonly2
  type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> & Readonly<Pick<T, K>>

  // 实现深度Readonly3
  type DeepReadonly<T = any> = {
    readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>;
  }
  // 元组转换为对象
  type TupleToObject<T extends readonly any[]> = {
    [P in T[number]]: P
  }

  // 元组转换为合集
  type TupleToUnion<T extends readonly any[]> = T[number]

  // 第一个元素
  type First = T extends [] ? never : T[0]

  // 实现数组 最后一个元素
  type Last = T extends [...any, infer R] ? R : never;

  // 实现数组 Pop
  type Pop<T> = T extends [...items: infer L, tail: any] ? L : never;

  // 获取元组长度
  type Length<T extends readonly any[]> = T['length']

  // 实现 Exclude
  type MyExclude<T, U> = T extends U ? never: T

  // 实现 Awaited
  type Awaited<T> = T extends Promise<infer P> ? P : never

  // 实现 If
  type If<C, T, F> = C extends true ? T : C extends false ? F : error

  // 实现 Concat
  type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U]

  // 实现 Includes
  type Includes<T extends readonly any[], U> = U extends T[number] ? true : false

  // 实现 MyReturnType
  type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

  // 实现 Omit
  type MyOmit<T, K> = {
    [P in Exclude<keyof T, K>]: T[P]
  }

  // 实现 Chainable
  type Chainable<T = {}> = {
    option<K extends string, V>(key: K, value: V): Chainable<T & {[P in K]: V}>
    get(): T
  }

  // 实现 PromiseAll
  type InferPromise<T> = T extends Promise<infer R> ? R : T;
  type Unwrap<T extends any[]> = {
    [P in keyof T]: InferPromise<T[P]>
  }
  declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<Unwrap<T>>;

  // 实现 Extract
  type Extract<U, T> = U extends T : U : never;

  // 实现 Lookup
  type LookUp<U, T> = U extends { type: T } ? U : never;

  // 实现 TrimLeft
  type TrimLeft<S extends string> = S extends `${'\t' | '\n' | ' '}${infer R}` ? TrimLeft<R> : S;

  // 实现 Trim
  type TrimLeft<S extends string> = S extends `${'\t' | '\n' | ' '}${infer R}` ? TrimLeft<R> : S;
  type TrimRight<S extends string> = S extends `${infer L}${'\t' | '\n' | ' '}` ? TrimRight<L> : S;
  type Trim<S extends string> = TrimRight<TrimLeft<S>>

  // 实现首字母大写 Capitalize
  type Capitalize<S extends string> = S extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : S;

  // 实现 Replace
  type Replace<S extends string, From extends string, To extends string> = S extends `${infer L}${From}${infer R}` ? From extends '' ? S : `${L}${To}${R}` : S;

  // 实现 ReplaceAll
  type ReplaceAll<S extends string, From extends string, To extends string> = S extends `${infer L}${From}${infer R}` ? From extends '' ? S : `${L}${To}${ReplaceAll<R, From, To>}` : S;

  // 实现追加函数参数
  type AppendArgument<Fn extends (...args: any) => any, A> = (...args: [...Parameters<Fn>, A]) => ReturnType<Fn>

  // 实现排列组合
  type Permutation<T, K = T> = [T] extends [never] ? [] : K extends infer U ? [U, ...Permutation<Exclude<T, U>>] : []

  // 实现字符串长度
  type LengthOfString<S extends string, A extends any[] = []> = S extends `${infer C}${infer R}` ? LengthOfString<R, [C, ...A]> : A['length']

  // 实现Flatten函数
  type Flatten<T extends any[]> = T extends [h: infer L, ...tail: infer R] ? [...L extends any[] ? L['length'] extends 1 ? L[0] extends any[] ? Flatten<L[0]> : Flatten<L> : Flatten<L>: [L], ...Flatten<R>] : [];

  // 实现对象添加属性
  type AppendToObject<T, U extends string, V> = { [P in U | keyof T]: P extends keyof T ? T[P] : V }

  // 实现绝对值1
  type Absolute<T extends number | string | bigint> = T extends `${infer First}${infer Rest}` ? First extends '-' ? Rest : T : Absolute<`${T}`>
  // 实现绝对值2-相对来说比较冗余
  type Absolute<T extends number | string | bigint> = T extends string ? T extends `${infer L}${infer R}` ? L extends '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9' ? `${L}${Absolute<R>}` : `${Absolute<R>}` : '' : Absolute<`${T}`>;

  // 实现字符串转联合类型
  type StringToUnion<T extends string> = T extends `${infer L}${infer R}` ? L | StringToUnion<R> : never;

  // 实现Merge，合并两个类型，并且可以覆盖
  type Merge<F, S> = {
    [K in keyof F | keyof S]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never;
  };

  // 实现CamelCase-驼峰字符串
  type az = "a"|"b"|"c"|"d"|"e"|"f"|"g"|"h"|"i"|"j"|"k"|"l"|"m"|"n"|"o"|"p"|"q"|"r"|"s"|"t"|"u"|"v"|"w"|"x"|"y"|"z";
  type CamelCase<S extends string> = S extends `${infer L}-${infer M}${infer R}` ? M extends az ? `${L}${Uppercase<M>}${CamelCase<R>}` : M extends '-' ? `${L}-${CamelCase<`-${R}`>}` : `${L}-${M}${CamelCase<R>}` : S;

  // 实现KebabCase
  type AZ = "A"|"B"|"C"|"D"|"E"|"F"|"G"|"H"|"I"|"J"|"K"|"L"|"M"|"N"|"O"|"P"|"Q"|"R"|"S"|"T"|"U"|"V"|"W"|"X"|"Y"|"Z";
  type KebabCase2<S extends string> = S extends `${infer L}${infer R}` ?  L extends AZ ? `-${Lowercase<L>}${KebabCase2<R>}` : `${L}${KebabCase2<R>}` : '';
  type KebabCase<S extends string> = S extends `${infer L}${infer R}` ? L extends AZ ? `${Lowercase<L>}${KebabCase2<R>}` : `${L}${KebabCase2<R>}` : '';

  // 实现 Diff
  type Diff<O, O1> = {
    [K in Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O>]: K extends keyof O ? O[K] : K extends keyof O1 ? O1[K] : never;
  }

  // 实现 AnyOf
  type FF = 0 | '' | false | [] | { [key: string]: never };
  type AnyOf<T extends readonly any[]> = T[number]extends FF ? false : true;

  // 判断是否是never
  type IsNever<T> = [T] extends [never] ? true : false;

  // 判断是否是联合类型
  type IsUnion<T, B = T> = T extends B ? [B] extends [T] ? false : true : never;

  // 替换联合类型的对象中的部分key的类型
  type ReplaceKeys<U, T, Y> = U extends infer S ? {
    [K in keyof S]: K extends T ? K extends keyof Y ? Y[K] : never : S[K]
  } : never;

  type ReplaceKeys<U, T, Y> = {
    [k in keyof U]: k extends T ? k extends keyof Y ? Y[k]: never : U[k]
  }

  // 实现删除索引签名属性
  type RemoveIndexSignature<T> = {
    [K in keyof T as string extends K ? never : K extends number ? never : K]: T[K]
  }

  // 实现 SimpleVue
  https://github.com/type-challenges/type-challenges/issues/1036#issue-823856668

  // 实现科里化
  type CurryingReturn<T> = T extends (...args: [ll: infer LL, ...rr: infer RR]) => infer R ? RR extends [] ? T : (ll: LL) => CurryingReturn<(...args: RR) => R> : never;

  // 联合类型转交集
  type UnionToIntersection<U> = (U extends any ? (arg: U) => any : never) extends ((arg: infer I) => void) ? I : never

  // 实现获取必须字段
  https://github.com/type-challenges/type-challenges/issues/1087

  // 实现获取可选字段
  type GetOptionalObjKeys<T, K = keyof T> = K extends keyof T ? Omit<T, K> extends T ? K : never : never;
  type GetOptional<T> = Pick<T, GetOptionalObjKeys<T>>;

  // 实现获取必填字段
  type RequiredKeys<T, K = keyof T> = K extends keyof T ? Omit<T, K> extends T ? never : K : never;

  // 实现获取可选字段
  type OptionalKeys<T, K = keyof T> = K extends keyof T ? Omit<T, K> extends T ? K : never : never;

  // 实现单词首字母大写
  type CapitalizeWords1<S extends string> = S extends `${infer L}${infer M}${infer R}` ? L extends ' ' | '.' | ',' ? `${L}${Uppercase<M>}${CapitalizeWords1<R>}` : `${L}${CapitalizeWords1<`${M}${R}`>}` : S;
  type CapitalizeWords<S extends string> = Capitalize<CapitalizeWords1<S>>

  // 实现单词驼峰格式
  type CamelCase1<S extends string> = S extends `${infer L}_${infer M}${infer R}` ? `${L}${Uppercase<M>}${CamelCase1<R>}` : S;
  type CamelCase<S extends string> = CamelCase1<Lowercase<S>>;

  // 实现C语言打印函数
  type Shrink<S extends string> = S extends `${infer L}%%${infer R}` ? `${L}${R}` : S;
  type ParsePrintFormat1<S extends string> = S extends `${infer L}%${infer M}${infer R}` ? M extends keyof ControlsMap ? [ControlsMap[M], ...ParsePrintFormat1<R>] : ParsePrintFormat1<R> : [];
  type ParsePrintFormat<S extends string> = ParsePrintFormat1<Shrink<S>>;

  // 实现vue props
  https://github.com/type-challenges/type-challenges/issues/1448

  // 实现 IsAny
  type IsAny<T> = [T] extends [never] ? false : T extends 1 & T ? true : false;
  type IsAny<T> = boolean extends (T extends 1 ? true : false) ? true : false;

  // 实现Get函数
  type Get<T, K> = K extends `${infer L}.${infer R}` ? L extends keyof T ? Get<T[L], R> : never : K extends '' ? never : K extends keyof T ? T[K] : never;

  // 实现字符串转数字
  type ToNumber<S extends string, T extends any[] = []> = S extends `${T['length']}` ? T['length'] : ToNumber<S, [any, ...T]>;

  // 实现过滤函数
  type FilterOut<T extends any[], F> = T extends [f: infer S1, ...l: infer S2] ? [S1] extends [F] ? FilterOut<S2, F> : [S1, ...FilterOut<S2, F>] : [];

  // 实现Enum枚举类型
  type IndexOf<T extends readonly string[], K extends string, R extends any[] = []> = T extends readonly [infer S1, ...infer S2] ? S1 extends K ? R['length'] : S2 extends readonly string[] ? IndexOf<S2, K, [any, ...R]> : never : never;

  // 实现Printf函数
  type Format<T extends string> = T extends `${infer S1}%${infer S2}${infer S3}` ? S2 extends 'd' ? (a: number) => Format<S3> : S2 extends 's' ? (a: string) => Format<S3> : never : string;

  // 实现唯一对象标识
  const sym = Symbol();
  type DeepObjectToUniq<O extends object> = { [K in keyof O]: O[K] extends object ? DeepObjectToUniq<O[K]> & {[sym]?: [O, K]} : O[K] }

  // 获取字符串长度
  type LengthOfString<S extends string, R extends any[] = []> = S extends `${infer S1}${infer S2}${infer S3}${infer S4}${infer S5}${infer S6}${infer S7}${infer S8}` ? LengthOfString<S8, [any, any, any, any, any, any, any, ...R]> : S extends `${infer S1}${infer S2}${infer S3}${infer S4}` ? LengthOfString<S4, [any, any, any, ...R]> : S extends `${infer S1}${infer S2}` ? LengthOfString<S2, [any, ...R]> : R['length'];

  // 实现字符串join函数
  type JoinType<T extends string, P, R extends string = ''> = P extends [] ? R : (P extends string[] ? P extends [infer S1, ...infer S2] ? R extends '' ? JoinType<T, S2, `${P[0]}`> : JoinType<T, S2, `${R}${T}${P[0]}`> : `${R}${T}${P[0]}` : never);

  // 实现 DeepPick
  type UnionToIntercetion<U> = (U extends any ? (arg: U) => any : never) extends ((arg: infer I) => any) ? I : never;
  type DeepPick<D, Keys> = UnionToIntercetion<Keys extends infer K ? DeepPick2<D, K> : never>;
  type DeepPick2<D, K> = K extends `${infer L}.${infer R}` ? L extends keyof D ? { [ll in L]: DeepPick2<D[L], R> } : unknown : K extends keyof D ? { [kk in K]: D[K] } : unknown;
