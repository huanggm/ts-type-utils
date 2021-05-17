export type Awaited<T> = T extends Promise<infer R> ? R : T;

export type AwaitedArray<T extends any[]> = {
  [P in keyof T]: Awaited<T[P]>;
};

export function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<AwaitedArray<T>>;
