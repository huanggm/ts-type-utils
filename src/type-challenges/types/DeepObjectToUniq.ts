const sym = Symbol();

export type DeepObjectToUniq<O extends object> = {
  [K in keyof O]: O[K] extends object
    ? DeepObjectToUniq<O[K]> & { [sym]?: [O, K] }
    : O[K];
};
