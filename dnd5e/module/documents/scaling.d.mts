/**
 * Lightweight class containing scaling information for an item that is used in roll data to ensure it is available
 * in the correct format in roll formulas: `@scaling` is the scaling value, and `@scaling.increase` as the scaling
 * steps above baseline.
 */
export default class Scaling {
  constructor(increase: number)

  /* -------------------------------------------- */

  /**
   * Scaling steps above baseline.
   */
  #increase: number;

  get increase(): number

  /* -------------------------------------------- */

  /**
   * Value of the scaling starting 1.
   */
  get value(): string
}
