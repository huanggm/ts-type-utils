// 实现C语言打印函数
/**
 * @example
 * ```ts
 * ParsePrintFormat<''> // []
 * ParsePrintFormat<'Any string.'> // []
 * ParsePrintFormat<'The result is %d.'> // ['dec']
 * ParsePrintFormat<'The result is %%d.'> // []
 * ParsePrintFormat<'The result is %%%d.'> // ['dec']
 * ParsePrintFormat<'The result is %f.'> // ['float']
 * ParsePrintFormat<'The result is %h.'> // ['hex']
 * ParsePrintFormat<'The result is %q.'> // []
 * ParsePrintFormat<'Hello %s: score is %d.'> // ['string', 'dec']
 * ParsePrintFormat<'The result is %'> // []
 * ```
 */
export type ParsePrintFormat<S extends string> = ParsePrintFormatReturn<Shrink<S>>;

type ControlsMap = {
  c: "char";
  s: "string";
  d: "dec";
  o: "oct";
  h: "hex";
  f: "float";
  p: "pointer";
};

export type Shrink<S extends string> = S extends `${infer L}%%${infer R}`
  ? `${L}${R}`
  : S;

export type ParsePrintFormatReturn<S extends string> =
  S extends `${infer L}%${infer M}${infer R}`
    ? M extends keyof ControlsMap
      ? [ControlsMap[M], ...ParsePrintFormatReturn<R>]
      : ParsePrintFormatReturn<R>
    : [];

/**
 * 实现Printf函数
 * @example
 * ```ts
 * Equal<Format<'abc'> // string
 * Equal<Format<'a%sbc'> // (s1: string) => string
 * Equal<Format<'a%dbc'> // (d1: number) => string
 * Equal<Format<'a%dbc%s'> // (d1: number) => (s1: string) => string
 * ```
 */
export type Format<T extends string> =
  T extends `${infer S1}%${infer S2}${infer S3}`
    ? S2 extends "d"
      ? (a: number) => Format<S3>
      : S2 extends "s"
      ? (a: string) => Format<S3>
      : never
    : string;
