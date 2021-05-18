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
export type ParsePrintFormat<S extends string> = ParsePrintFormat1<Shrink<S>>;

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

export type ParsePrintFormat1<S extends string> =
  S extends `${infer L}%${infer M}${infer R}`
    ? M extends keyof ControlsMap
      ? [ControlsMap[M], ...ParsePrintFormat1<R>]
      : ParsePrintFormat1<R>
    : [];
