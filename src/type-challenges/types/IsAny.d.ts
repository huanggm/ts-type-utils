// 实现 IsAny
export type IsAny<T> = boolean extends (T extends 1 ? true : false)
  ? true
  : false;

export type IsAny2<T> = [T] extends [never]
  ? false
  : T extends 1 & T
  ? true
  : false;
