export type TrimLeft<S extends string> = S extends `${
  | "\t"
  | "\n"
  | " "}${infer R}`
  ? TrimLeft<R>
  : S;

export type TrimRight<S extends string> = S extends `${infer L}${
  | "\t"
  | "\n"
  | " "}`
  ? TrimRight<L>
  : S;

export type Trim<S extends string> = TrimRight<TrimLeft<S>>;

export type Capitalize<S extends string> = S extends `${infer L}${infer R}`
  ? `${Uppercase<L>}${R}`
  : S;

export type Replace<S extends string, From extends string, To extends string> =
  S extends `${infer L}${From}${infer R}`
    ? From extends ""
      ? S
      : `${L}${To}${R}`
    : S;

export type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer L}${From}${infer R}`
  ? From extends ""
    ? S
    : `${L}${To}${ReplaceAll<R, From, To>}`
  : S;

export type LengthOfString<S extends string, A extends any[] = []> =
  S extends `${infer C}${infer R}` ? LengthOfString<R, [C, ...A]> : A["length"];

// 获取字符串长度
export type LengthOfLongString<S extends string, R extends any[] = []> =
  S extends `${infer S1}${infer S2}${infer S3}${infer S4}${infer S5}${infer S6}${infer S7}${infer S8}`
    ? LengthOfString<S8, [any, any, any, any, any, any, any, ...R]>
    : S extends `${infer S1}${infer S2}${infer S3}${infer S4}`
    ? LengthOfString<S4, [any, any, any, ...R]>
    : S extends `${infer S1}${infer S2}`
    ? LengthOfString<S2, [any, ...R]>
    : R["length"];

export type StringToUnion<T extends string> = T extends `${infer L}${infer R}`
  ? L | StringToUnion<R>
  : never;

export type az =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

export type CamelCase<S extends string> =
  S extends `${infer L}-${infer M}${infer R}`
    ? M extends az
      ? `${L}${Uppercase<M>}${CamelCase<R>}`
      : M extends "-"
      ? `${L}-${CamelCase<`-${R}`>}`
      : `${L}-${M}${CamelCase<R>}`
    : S;

export type AZ =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

export type KebabCase2<S extends string> = S extends `${infer L}${infer R}`
  ? L extends AZ
    ? `-${Lowercase<L>}${KebabCase2<R>}`
    : `${L}${KebabCase2<R>}`
  : "";

export type KebabCase<S extends string> = S extends `${infer L}${infer R}`
  ? L extends AZ
    ? `${Lowercase<L>}${KebabCase2<R>}`
    : `${L}${KebabCase2<R>}`
  : "";

// 实现单词首字母大写
export type CapitalizeWords1<S extends string> =
  S extends `${infer L}${infer M}${infer R}`
    ? L extends " " | "." | ","
      ? `${L}${Uppercase<M>}${CapitalizeWords1<R>}`
      : `${L}${CapitalizeWords1<`${M}${R}`>}`
    : S;

export type CapitalizeWords<S extends string> = Capitalize<CapitalizeWords1<S>>;

// 实现单词驼峰格式
export type CamelCase1<S extends string> =
  S extends `${infer L}_${infer M}${infer R}`
    ? `${L}${Uppercase<M>}${CamelCase1<R>}`
    : S;

export type CamelCaseWords<S extends string> = CamelCase1<Lowercase<S>>;

// 实现字符串转数字
export type ToNumber<S extends string, T extends any[] = []> =
  S extends `${T["length"]}` ? T["length"] : ToNumber<S, [any, ...T]>;

// 实现Printf函数
export type Format<T extends string> =
  T extends `${infer S1}%${infer S2}${infer S3}`
    ? S2 extends "d"
      ? (a: number) => Format<S3>
      : S2 extends "s"
      ? (a: string) => Format<S3>
      : never
    : string;

export type JoinType<T extends string, P, R extends string = ""> = P extends []
  ? R
  : P extends string[]
  ? P extends [infer S1, ...infer S2]
    ? R extends ""
      ? JoinType<T, S2, `${P[0]}`>
      : JoinType<T, S2, `${R}${T}${P[0]}`>
    : `${R}${T}${P[0]}`
  : never;
