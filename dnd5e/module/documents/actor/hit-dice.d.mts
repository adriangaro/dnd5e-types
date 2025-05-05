/**
 * Object describing the hit dice for an actor.
 */
export default class HitDice {
  constructor(actor: Actor.Implementation)

  /* -------------------------------------------- */
  actor: Actor.Implementation

  /**
   * Remaining hit dice.
   */
  get value(): number
  #value: number;

  /* -------------------------------------------- */

  /**
   * The actor's total amount of hit dice.
   */
  get max(): number;
  #max: number;

  /* -------------------------------------------- */

  /**
   * All valid die sizes derived from all classes.
   */
  sizes: Set<number>;

  /* -------------------------------------------- */

  /**
   * Store valid class items.
   */
  classes: Set<Item.Implementation>;

  /* -------------------------------------------- */

  /**
   * The smallest denomination.
   */
  get smallest(): string

  /* -------------------------------------------- */

  /**
   * The smallest die size of those available.
   */
  get smallestAvailable(): string

  /* -------------------------------------------- */

  /**
   * The smallest die size.
   */
  get smallestFace(): number

  /* -------------------------------------------- */

  /**
   * The largest denomination.
   */
  get largest(): string

  /* -------------------------------------------- */

  /**
   * The largest die size of those available.
   */
  get largestAvailable(): string

  /* -------------------------------------------- */

  /**
   * The largest die size.
   */
  get largestFace(): number

  /* -------------------------------------------- */

  /**
   * The percentage of remaining hit dice.
   */
  get pct(): number

  /* -------------------------------------------- */

  /**
   * Return an object of remaining hit dice categorized by size.
   */
  get bySize(): Record<string, number>

  /* -------------------------------------------- */

  /**
   * Override the default `toString` method for backwards compatibility.
   * @returns {number}    Remaining hit dice.
   */
  toString(): number

  /* -------------------------------------------- */

  /**
   * Create item updates for recovering hit dice during a rest.
   * @param {RestConfiguration} [config]
   * @param {number} [config.maxHitDice]    Maximum number of hit dice to recover.
   * @param {number} [config.fraction=0.5]  Fraction of max hit dice to recover. Only used if
   *                                        `maxHitDice` isn't specified.
   * @param {boolean} [config.largest]      Whether to restore the largest hit dice first.
   * @param {RestResult} [result={}]        Rest result being constructed.
   */
  createHitDiceUpdates(config?: Partial<dnd5e.documents.Actor5e.RestConfiguration> & {
    maxHitDice?: number,
    fraction?: number,
    largest?: boolean
  }, result?: dnd5e.documents.Actor5e.RestResult)
}
