// https://github.com/type-challenges/type-challenges/issues/1036#issue-823856668

/**
 * 实现简单的Vue类型
 * @example
 * ```ts
 * const instance = SimpleVue({
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
export function SimpleVue<D, C, M>(options: Options<D, C, M>): any;

export type ComputedValueType<C> = {
  [P in keyof C]: C[P] extends () => infer R ? R : never;
};

export type Options<D, C, M> = {
  data: (this: void) => D;
  computed: C & ThisType<D>;
  methods: M & ThisType<D & ComputedValueType<C> & M>;
};
