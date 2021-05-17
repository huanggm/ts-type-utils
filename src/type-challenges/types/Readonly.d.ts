export type Readonly<T> = {
  readonly [E in keyof T]: T[E];
};

export type ReadonlyWithKeys<T, K extends keyof T = keyof T> = Omit<T, K> &
  Readonly<Pick<T, K>>;

export type DeepReadonly<T = any> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>;
};
