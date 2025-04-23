/**
 * Primary die used when performing a D20 roll.
 */
export default class D20Die extends foundry.dice.terms.Die {
  /* -------------------------------------------- */

  /**
   * Critical success target if no critical failure is set in options.
   */
  static CRITICAL_SUCCESS_TOTAL: number;

  /* -------------------------------------------- */

  /**
   * Critical failure target if no critical failure is set in options.
   */
  static CRITICAL_FAILURE_TOTAL: number;

  /* -------------------------------------------- */

  /**
   * Is the result of this roll a critical success? Returns `undefined` if roll isn't evaluated.
   */
  get isCriticalSuccess(): boolean | undefined

  /* -------------------------------------------- */

  /**
   * Is the result of this roll a critical failure? Returns `undefined` if roll isn't evaluated.
   */
  get isCriticalFailure(): boolean | undefined
  /* -------------------------------------------- */

  /**
   * Is this a valid challenge die?
   */
  get isValid(): boolean

  /* -------------------------------------------- */
  /*  Die Modification                            */
  /* -------------------------------------------- */

  /**
   * Apply advantage mode to this die.
   */
  applyAdvantage(advantageMode: dnd5e.dice.D20Roll.AdvantageMode)

  /* -------------------------------------------- */

  /**
   * Set or unset the specified flag on this die.
   */
  applyFlag(flag: string, enabled: boolean)

  /* -------------------------------------------- */

  /**
   * Apply a minimum or maximum value to this die.
   */
  applyRange(values: {
    minimum: number,
    maximum: number
  })
}
