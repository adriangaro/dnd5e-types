
declare class Proficiency {
  _baseProficiency: number;
  multiplier: number;
  rounding: 'up' | 'down'
  /**
 * Object describing the proficiency for a specific ability or skill.
 *
 * @param {number} proficiency   Actor's flat proficiency bonus based on their current level.
 * @param {number} multiplier    Value by which to multiply the actor's base proficiency value.
 * @param {boolean} [roundDown]  Should half-values be rounded up or down?
 */
  constructor(proficiency: number, multiplier: number, roundDown?: boolean)

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Should only deterministic proficiency be returned, regardless of system settings?
   */
  deterministic: boolean

  /* -------------------------------------------- */

  /**
   * Flat proficiency value regardless of proficiency mode.
   */
  get flat(): number

  /* -------------------------------------------- */

  /**
   * Dice-based proficiency value regardless of proficiency mode.
   */
  get dice(): string

  /* -------------------------------------------- */

  /**
   * Either flat or dice proficiency term based on configured setting.
   */
  get term(): string

  /* -------------------------------------------- */

  /**
   * Whether the proficiency is greater than zero.
   */
  get hasProficiency(): boolean
  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  /**
   * Calculate an actor's proficiency modifier based on level or CR.
   * @param level  Level or CR To use for calculating proficiency modifier.
   */
  static calculateMod(level: number): number

  /* -------------------------------------------- */

  /**
   * Return a clone of this proficiency with any changes applied.
   * @param updates.proficiency  Actor's flat proficiency bonus based on their current level.
   * @param updates.multiplier   Value by which to multiply the actor's base proficiency value.
   * @param updates.roundDown   Should half-values be rounded up or down?
   */
  clone(updates?: { 
    proficiency?: number, 
    multiplier?: number, 
    roundDown?: boolean 
  }): Proficiency
  /* -------------------------------------------- */

  /**
   * Override the default `toString` method to return flat proficiency for backwards compatibility in formula.
   * @returns Either flat or dice proficiency term based on configured setting.
   */
  toString(): string
}

declare namespace Proficiency {

}



export default Proficiency;