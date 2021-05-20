/**
 * Make all properties in T optional
 */
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

/**
 * Make all properties in T required
 */
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * Make all properties in T readonly
 */
export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * 实现指定 key 的 Readonly
 * @example
 * ```ts
 * interface Todo {
 *   title: string
 *   description: string
 *   completed: boolean
 * }
 *
 * const todo: ReadonlyWithKeys<Todo, 'title' | 'description'> = {
 *   title: "Hey",
 *   description: "foobar",
 *   completed: false,
 * }
 *
 * todo.title = "Hello" // Error: cannot reassign a readonly property
 * todo.description = "barFoo" // Error: cannot reassign a readonly property
 * todo.completed = true // OK
 * ```
 */
export type ReadonlyWithKeys<T, K extends keyof T = keyof T> = Omit<T, K> &
  Readonly<Pick<T, K>>;

/**
 * 实现深度 Readonly
 * @example
 * ```ts
 * type X = {
 *   x: {
 *     a: 1
 *     b: 'hi'
 *   }
 *   y: 'hey'
 * }
 *
 * type Expected = {
 *   readonly x: {
 *     readonly a: 1
 *     readonly b: 'hi'
 *   }
 *   readonly y: 'hey'
 * }
 *
 * const todo: DeepReadonly<X> // should be same as `Expected`
 * ```
 */
export type DeepReadonly<T = any> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>;
};

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * Construct a type with a set of properties K of type T
 */
export type Record<K extends keyof any, T> = {
  [P in K]: T;
};

/**
 * 排除合集中的某些类型
 * Exclude from T those types that are assignable to U
 * @example
 * ```ts
 * Exclude<"a" | "b" | "c", "a" | "b"> // expected "c"
 * ```
 */
export type Exclude<T, U> = T extends U ? never : T;

/**
 * Extract from T those types that are assignable to U
 * @example
 * ```ts
 * Extract<"a" | "b" | "c", "a" | "b" | "d"> // expected "a" | "b"
 * ```
 */
export type Extract<T, U> = T extends U ? T : never;

/**
 * Construct a type with the properties of T except for those in type K.
 */
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/**
 * Exclude null and undefined from T
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * Obtain the parameters of a function type in a tuple
 */
export type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

/**
 * Obtain the parameters of a constructor function type in a tuple
 */
export type ConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;

/**
 * Obtain the return type of a function type
 */
export type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

/**
 * Obtain the return type of a constructor function type
 */
export type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;
