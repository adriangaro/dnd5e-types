/**
 * Extends the base `Advancement` class directly (no separate data model).
 */

import type Advancement from "./advancement.mjs";

/**
 * Advancement that presents the player with the option to roll hit points at each level or select the average value.
 * Keeps track of player hit point rolls or selection for each class level. **Can only be added to classes and each
 * class can only have one.**
 */
declare class HitPointsAdvancement extends Advancement {
  static metadata: dnd5e.types.Advancement.Metadata & {
    name: "HitPoints";
    multiLevel: true;
  };

  // ---- Instance Properties ----

  /**
   * The amount gained if the average is taken.
   */
  get average(): number;

  /** @inheritDoc */
  override get levels(): number[];

  /**
   * Shortcut to the hit die used by the class.
   */
  get hitDie(): string;

  /**
   * The face value of the hit die used.
   */
  get hitDieValue(): number;

  // ---- Display Methods ----

  /** @inheritDoc */
  override configuredForLevel(level: number): boolean;

  /** @inheritDoc */
  override titleForLevel(
    level: number,
    options?: { configMode?: boolean; legacyDisplay?: boolean },
  ): string;

  /**
   * Hit points given at the provided level.
   * @param level - Level for which to get hit points.
   */
  valueForLevel(level: number): number | null;

  /**
   * Total hit points provided by this advancement.
   */
  total(): number;

  /**
   * Total hit points taking the provided ability modifier into account, with a minimum of 1 per level.
   * @param mod - Modifier to add per level.
   */
  getAdjustedTotal(mod: number): number;

  // ---- Static Methods ----

  /**
   * Hit points given at the provided level.
   * @param data        - Contents of `value` used to determine this value.
   * @param hitDieValue - Face value of the hit die used by this advancement.
   * @param level       - Level for which to get hit points.
   */
  static valueForLevel(
    data: Record<number, "max" | "avg" | number>,
    hitDieValue: number,
    level: number,
  ): number | null;

  /** @inheritDoc */
  static override availableForItem(item: globalThis.Item.Implementation): boolean;
}

declare global {
  namespace dnd5e.types.Advancement {
    interface DefaultTypes {
      HitPoints: typeof HitPointsAdvancement;
    }
  }
}

export default HitPointsAdvancement;
