/**
 * 实现 Readonly
 * @example
 * ```ts
 * interface Todo {
 *   title: string
 *   description: string
 * }
 *
 * const todo: Readonly<Todo> = {
 *   title: "Hey",
 *   description: "foobar"
 * }
 *
 * todo.title = "Hello" // Error: cannot reassign a readonly property
 * todo.description = "barFoo" // Error: cannot reassign a readonly property
 * ```
 */
export type Readonly<T> = {
  readonly [E in keyof T]: T[E];
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
