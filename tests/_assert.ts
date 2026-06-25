/**
 * Compile-time assertion helpers. A failing assertion surfaces as a real tsc/tsgo
 * error (`Expect<false>`), so the canonical typecheck gate IS the test runner.
 */

/** Passes only when `T` is exactly `true`. */
export type Expect<T extends true> = T;

/** Passes only when `T` is exactly `false`. */
export type ExpectFalse<T extends false> = T;

/** Strict structural equality between `A` and `B`. */
export type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

/** `true` when `A` is assignable to `B`. */
export type Extends<A, B> = A extends B ? true : false;
