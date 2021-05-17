// 实现C语言打印函数
export type Shrink<S extends string> = S extends `${infer L}%%${infer R}`
  ? `${L}${R}`
  : S;
export type ParsePrintFormat1<S extends string> =
  S extends `${infer L}%${infer M}${infer R}`
    ? M extends keyof ControlsMap
      ? [ControlsMap[M], ...ParsePrintFormat1<R>]
      : ParsePrintFormat1<R>
    : [];
export type ParsePrintFormat<S extends string> = ParsePrintFormat1<Shrink<S>>;
