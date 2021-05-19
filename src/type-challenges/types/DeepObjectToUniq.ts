const sym = Symbol();
/**
 * 给对象增加唯一属性
 *
 * https://github.com/type-challenges/type-challenges/blob/master/questions/553-hard-deep-object-to-unique/README.md
 *
 * @example
 * ```ts
 * import { Equal, IsTrue, IsFalse } from "@type-challenges/utils"
 *
 * type Quz = { quz: 4 }
 *
 * type Foo = { foo: 2; baz: Quz; bar: Quz }
 * type Bar = { foo: 2; baz: Quz; bar: Quz & { quzz?: 0 } }
 *
 * type UniqFoo = DeepObjectToUniq<Foo>
 * type UniqBar = DeepObjectToUniq<Bar>
 *
 * declare let foo: Foo
 * declare let uniqFoo: UniqFoo
 *
 * uniqFoo = foo
 * foo = uniqFoo
 *
 * type cases = [
 *   IsFalse<Equal<UniqFoo, Foo>>,
 *   IsTrue<Equal<UniqFoo["foo"], Foo["foo"]>>,
 *   IsTrue<Equal<UniqFoo["bar"]["quz"], Foo["bar"]["quz"]>>,
 *   IsFalse<Equal<UniqFoo["bar"], UniqFoo["baz"]>>,
 *   IsFalse<Equal<UniqBar["baz"], UniqFoo["baz"]>>,
 *   IsTrue<Equal<keyof UniqBar["baz"], keyof UniqFoo["baz"]>>,
 *   IsTrue<Equal<keyof Foo, keyof UniqFoo & string>>
 * ];
 * ```
 */
export type DeepObjectToUniq<O extends object> = {
  [K in keyof O]: O[K] extends object
    ? DeepObjectToUniq<O[K]> & { [sym]?: [O, K] }
    : O[K];
};
