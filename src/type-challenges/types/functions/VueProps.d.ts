// https://github.com/type-challenges/type-challenges/issues/1448

/**
 * 实现简单的Vue类型 - 额外支持props类型
 * @example
 * ```ts
 * const instance = SimpleVue({
 *   props: {
 *     propA: {},
 *     propB: { type: String },
 *     propC: { type: Boolean },
 *     propD: { type: ClassA },
 *     propE: { type: [String, Number] },
 *     propF: RegExp,
 *   },
 *   data() {
 *     return {
 *       firstname: 'Type',
 *       lastname: 'Challenges',
 *       amount: 10,
 *     }
 *   },
 *   computed: {
 *     fullname() {
 *       return this.firstname + ' ' + this.lastname
 *     }
 *   },
 *   methods: {
 *     hi() {
 *       alert(this.fullname.toLowerCase())
 *     }
 *   }
 * })
 * ```
 */
export function VueBasicProps<P, D, C, M>(options: Options<P, D, C, M>): any;

type Tuple2Union<T> = T extends Array<any> ? T[number] : T;

type ComputedValueType<C> = {
  [P in keyof C]: C[P] extends () => infer R ? R : never;
};

type Basic<T> = T extends (...args: any) => infer R
  ? R
  : T extends new (...args: any) => infer R
  ? R
  : T extends Array<any>
  ? { [K in keyof T]: Basic<T[K]> }
  : T;

type PropsType2<P> = {
  [K in keyof P]: P[K] extends (...args: any) => infer R
    ? R
    : P[K] extends new (...args: any) => infer R
    ? R
    : P[K] extends { type: infer T }
    ? Tuple2Union<Basic<T>>
    : any;
};

type Options<P, D, C, M> = {
  props: P;
  data: (this: PropsType2<P>) => D;
  computed: C & ThisType<D & C & PropsType2<P>>;
  methods: M & ThisType<D & ComputedValueType<C> & M & PropsType2<P>>;
};
