export type AppendArgument<Fn extends (...args: any) => any, A> = (
  ...args: [...Parameters<Fn>, A]
) => ReturnType<Fn>;

export type CurryingReturn<T> = T extends (
  ...args: [ll: infer LL, ...rr: infer RR]
) => infer R
  ? RR extends []
    ? T
    : (ll: LL) => CurryingReturn<(...args: RR) => R>
  : never;
