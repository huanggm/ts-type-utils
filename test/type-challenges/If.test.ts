import { If } from "../../index";

import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<If<true, "a", "b">, "a">>,
  Expect<Equal<If<false, "a", 2>, 2>>
];

type aaa = null extends boolean ? 1 : 2;

// @ts-expect-error
type error = If<123, "a", "b">;
