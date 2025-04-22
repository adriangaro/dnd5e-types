import Advancement from "./advancement.mjs";
import HitPointsConfig from "../../applications/advancement/hit-points-config.mjs";
import HitPointsFlow from "../../applications/advancement/hit-points-flow.mjs";
import { simplifyBonus } from "../../utils.mjs";

/**
 * Advancement that presents the player with the option to roll hit points at each level or select the average value.
 * Keeps track of player hit point rolls or selection for each class level. **Can only be added to classes and each
 * class can only have one.**
 */
export default class HitPointsAdvancement extends Advancement<
  never,
  never
> {

  /* -------------------------------------------- */
  /*  Instance Properties                         */
  /* -------------------------------------------- */

  /**
   * The amount gained if the average is taken.
   */
  get average(): number

  /* -------------------------------------------- */

  /**
   * Shortcut to the hit die used by the class.
   */
  get hitDie(): string

  /* -------------------------------------------- */

  /**
   * The face value of the hit die used.
   */
  get hitDieValue(): number




  /* -------------------------------------------- */

  /**
   * Hit points given at the provided level.
   */
  valueForLevel(level: number): number | null

  /* -------------------------------------------- */

  /**
   * Hit points given at the provided level.
   */
  static valueForLevel(data: HitPointsAdvancement['value'], hitDieValue: number, level: number): number | null

  /* -------------------------------------------- */

  /**
   * Total hit points provided by this advancement.
   */
  total(): number

  /* -------------------------------------------- */

  /**
   * Total hit points taking the provided ability modifier into account, with a minimum of 1 per level.
   */
  getAdjustedTotal(mod: number): number

  /* -------------------------------------------- */
  /*  Application Methods                         */
  /* -------------------------------------------- */

  /**
   * Add the ability modifier and any bonuses to the provided hit points value to get the number to apply.
   */
  #getApplicableValue(value: number): number
}
