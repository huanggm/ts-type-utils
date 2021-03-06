/**
 * 实现 TrimLeft
 * @example
 * ```ts
 * type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
 * ```
 */
export type TrimLeft<S extends string> = S extends `${
  | "\t"
  | "\n"
  | " "}${infer R}`
  ? TrimLeft<R>
  : S;

/**
 * 实现 TrimRight
 * @example
 * ```ts
 * type trimed = TrimRight<'  Hello World  '> // expected to be '  Hello World'
 * ```
 */
export type TrimRight<S extends string> = S extends `${infer L}${
  | "\t"
  | "\n"
  | " "}`
  ? TrimRight<L>
  : S;

/**
 * 实现 Trim
 * @example
 * ```ts
 * type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
 * ```
 */
export type Trim<S extends string> = TrimRight<TrimLeft<S>>;

/**
 * 实现首字母大写
 * @example
 * ```ts
 * type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
 * ```
 */
export type Capitalize<S extends string> = S extends `${infer L}${infer R}`
  ? `${Uppercase<L>}${R}`
  : S;

/**
 * 实现Replace函数
 * @example
 * ```ts
 * type replaced = Replace<'types are fun!', 'fun', 'awesome'> // expected to be 'types are awesome!'
 * ```
 */
export type Replace<S extends string, From extends string, To extends string> =
  S extends `${infer L}${From}${infer R}`
    ? From extends ""
      ? S
      : `${L}${To}${R}`
    : S;

/**
 * 实现ReplaceAll函数
 * @example
 * ```ts
 * type replaced = ReplaceAll<'t y p e s', ' ', ''> // expected to be 'types'
 * ```
 */
export type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer L}${From}${infer R}`
  ? From extends ""
    ? S
    : `${L}${To}${ReplaceAll<R, From, To>}`
  : S;

/**
 * 实现获取字符串长度
 * @example
 * ```ts
 * LengthOfString<''> // expected to be 0
 * LengthOfString<'kumiko'> // expected to be 6
 * LengthOfString<'reina'> // expected to be 5
 * LengthOfString<'Sound! Euphonium'> // expected to be 16
 * ```
 */
export type LengthOfString<S extends string, A extends any[] = []> =
  S extends `${infer C}${infer R}` ? LengthOfString<R, [C, ...A]> : A["length"];

/**
 * 获取超长字符串的长度，因为ts中递归最多45次
 * @example
 * ```ts
 * LengthOfString<"aaaaaaaaaaaaggggggggggggggggggggkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"> // 272
 * ```
 */
export type LengthOfLongString<S extends string> =
  LongStringToTuple<S>["length"];

export type LongStringToTuple<S extends string> =
  S extends `${infer A}${infer B}${infer C}${infer D}${infer E}${infer F}${infer G}${infer H}${infer I}${infer J}${infer K}${infer L}${infer O}`
    ? [A, B, C, D, E, F, G, H, I, J, K, L, ...LongStringToTuple<O>]
    : S extends `${infer A}${infer B}${infer C}${infer D}${infer E}${infer F}${infer G}${infer H}${infer I}`
    ? [A, B, C, D, E, F, G, H, ...LongStringToTuple<I>]
    : S extends `${infer A}${infer B}`
    ? [A, ...LongStringToTuple<B>]
    : [];

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

/**
 * 实现单词转驼峰格式
 * @example
 * ```ts
 * CamelCase<'foo-bar-baz'> // 'fooBarBaz'
 * CamelCase<'foo-Bar-Baz'> // 'foo-Bar-Baz'
 * CamelCase<'foo-bar'> // 'fooBar'
 * CamelCase<'foo_bar'> // 'foo_bar'
 * CamelCase<'foo--bar----baz'> // 'foo-Bar---Baz'
 * CamelCase<'a-b-c'> // 'aBC'
 * CamelCase<'a-b-c-'> // 'aBC-'
 * CamelCase<'ABC'> // 'ABC'
 * CamelCase<'-'> // '-'
 * CamelCase<''> // ''
 * CamelCase<'😎'> // '😎'
 * ```
 */
export type CamelCase<S extends string> =
  S extends `${infer L}-${infer M}${infer R}`
    ? M extends az
      ? `${L}${Uppercase<M>}${CamelCase<R>}`
      : M extends "-"
      ? `${L}-${CamelCase<`-${R}`>}`
      : `${L}-${M}${CamelCase<R>}`
    : S;

/**
 * 先转小写，再转驼峰
 * @example
 * ```ts
 * CamelCase<'foobar'> // 'foobar'
 * CamelCase<'FOOBAR'> // 'foobar'
 * CamelCase<'foo_bar'> // 'fooBar'
 * CamelCase<'foo_bar_hello_world'> // 'fooBarHelloWorld'
 * CamelCase<'HELLO_WORLD_WITH_TYPES'> // 'helloWorldWithTypes'
 * CamelCase<''> // ''
 * ```
 */
export type CamelCaseWords<S extends string> = CamelCaseWordsReturn<
  Lowercase<S>
>;
// 实现单词驼峰格式
export type CamelCaseWordsReturn<S extends string> =
  S extends `${infer L}_${infer M}${infer R}`
    ? `${L}${Uppercase<M>}${CamelCaseWordsReturn<R>}`
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

/**
 * 实现单词转连线形式
 * @example
 * ```ts
 * KebabCase<'FooBarBaz'> // 'foo-bar-baz'
 * KebabCase<'fooBarBaz'> // 'foo-bar-baz'
 * KebabCase<'foo-bar'> // 'foo-bar'
 * KebabCase<'foo_bar'> // 'foo_bar'
 * KebabCase<'Foo-Bar'> // 'foo--bar'
 * KebabCase<'ABC'> // 'a-b-c'
 * KebabCase<'-'> // '-'
 * KebabCase<''> // ''
 * KebabCase<'😎'> // '😎'
 * ```
 */
export type KebabCase<S extends string> = S extends `${infer L}${infer R}`
  ? L extends AZ
    ? `${Lowercase<L>}${KebabCaseWithDash<R>}`
    : `${L}${KebabCaseWithDash<R>}`
  : "";

/**
 * 大写字母转小写字母+短横线
 */
export type KebabCaseWithDash<S extends string> =
  S extends `${infer L}${infer R}`
    ? L extends AZ
      ? `-${Lowercase<L>}${KebabCaseWithDash<R>}`
      : `${L}${KebabCaseWithDash<R>}`
    : "";

/**
 * 单词首字母大写
 * @example
 * ```ts
 * CapitalizeWords<'hello world, my friends'> // expected to be 'Hello World, My Friends'
 * ```
 */
export type CapitalizeWords<S extends string> = Capitalize<
  CapitalizeWordsReturn<S>
>;

// 实现单词首字母大写
export type CapitalizeWordsReturn<S extends string> =
  S extends `${infer L}${infer M}${infer R}`
    ? L extends " " | "." | ","
      ? `${L}${Uppercase<M>}${CapitalizeWordsReturn<R>}`
      : `${L}${CapitalizeWordsReturn<`${M}${R}`>}`
    : S;

/**
 * 实现join函数
 * @example
 * ```ts
 * // Edge cases
 * const noCharsOutput = join('-')();
 * const oneCharOutput = join('-')('a');
 * const noDelimiterOutput = join('')('a', 'b', 'c');
 *
 * // Regular cases
 * const hyphenOutput = join('-')('a', 'b', 'c');
 * const hashOutput = join('#')('a', 'b', 'c');
 * const twoCharOutput = join('-')('a', 'b');
 * const longOutput = join('-')('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');
 *
 * typeof noCharsOutput // ''
 * typeof oneCharOutput // 'a'
 * typeof noDelimiterOutput // 'abc'
 * typeof twoCharOutput // 'a-b'
 * typeof hyphenOutput // 'a-b-c'
 * typeof hashOutput // 'a#b#c'
 * typeof longOutput // 'a-b-c-d-e-f-g-h'
 * ```
 */
export type JoinType<T extends string, P, R extends string = ""> = P extends []
  ? R
  : P extends string[]
  ? P extends [infer S1, ...infer S2]
    ? R extends ""
      ? JoinType<T, S2, `${P[0]}`>
      : JoinType<T, S2, `${R}${T}${P[0]}`>
    : `${R}${T}${P[0]}`
  : never;
