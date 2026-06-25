/**
 * Lightweight class containing scaling information for an item that is used in roll data to ensure it is available
 * in the correct format in roll formulas: `@scaling` is the scaling value, and `@scaling.increase` as the scaling
 * steps above baseline.
 *
 * Plain class: NOT a FoundryVTT document — no mixin, no `SubType` generic, no registration into
 * fvtt-types' configuration. It is constructed directly and consumed via roll data.
 *
 * EXPANDABILITY: the class is merged with a same-name `interface Scaling` — downstream packages add
 * members by augmenting that interface (the document analogue of the data-model Seam-D override
 * interfaces).
 */

declare class Scaling {
  /**
   * @param increase  Scaling steps above baseline.
   */
  constructor(increase: number);

  /** Scaling steps above baseline. */
  get increase(): number;

  /** Value of the scaling, starting at 1. */
  get value(): number;

  /** @override */
  toString(): string;
}

declare namespace Scaling {}

export default Scaling;
