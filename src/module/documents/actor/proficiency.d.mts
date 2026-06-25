/**
 * Object describing the proficiency for a specific ability or skill: a flat proficiency bonus, a
 * multiplier, and a rounding direction. It resolves to either a flat number or a dice term depending
 * on the system's `proficiencyModifier` setting. Appears in derived ability/skill data
 * (e.g. `system.abilities.str.saveProf`).
 *
 * EXPANDABILITY: the class is merged with a same-name `interface Proficiency` — downstream packages
 * add members by augmenting that interface. The proficiency-level type domain (multiplier keys) lives
 * in the global `dnd5e.types.Proficiency` kernel namespace below and is extended via its
 * `OverrideTypes` / `OverrideWeaponProficiencyTypes` seams.
 */

declare class Proficiency {
  /**
   * Object describing the proficiency for a specific ability or skill.
   * @param proficiency  Actor's flat proficiency bonus based on their current level.
   * @param multiplier   Value by which to multiply the actor's base proficiency value.
   * @param roundDown    Should half-values be rounded up or down?
   */
  constructor(proficiency: number, multiplier: number, roundDown?: boolean);

  /** Base proficiency value of the actor. */
  _baseProficiency: number;

  /** Value by which to multiply the actor's base proficiency value. */
  multiplier: number;

  /** Direction decimal results should be rounded ("up" or "down"). */
  rounding: "up" | "down";

  /** Should only deterministic proficiency be returned, regardless of system settings? */
  deterministic: boolean;

  /* ---- Properties (getters) ---- */

  /** Flat proficiency value regardless of proficiency mode. */
  get flat(): number;

  /** Dice-based proficiency value regardless of proficiency mode. */
  get dice(): string;

  /** Either flat or dice proficiency term based on configured setting. */
  get term(): string;

  /** Whether the proficiency is greater than zero. */
  get hasProficiency(): boolean;

  /* ---- Methods ---- */

  /**
   * Return a clone of this proficiency with any changes applied.
   * @param updates.proficiency  Actor's flat proficiency bonus based on their current level.
   * @param updates.multiplier   Value by which to multiply the actor's base proficiency value.
   * @param updates.roundDown    Should half-values be rounded up or down?
   */
  clone(updates?: { proficiency?: number; multiplier?: number; roundDown?: boolean }): Proficiency;

  /**
   * Override the default `toString` method to return flat proficiency for backwards compatibility in formula.
   * @returns Either flat or dice proficiency term based on configured setting.
   */
  toString(): string;

  /* ---- Statics ---- */

  /**
   * Calculate an actor's proficiency modifier based on level or CR.
   * @param level  Level or CR to use for calculating proficiency modifier.
   * @returns      Proficiency modifier.
   */
  static calculateMod(level: number): number;
}

declare interface Proficiency {}

declare namespace Proficiency {}

export default Proficiency;

declare global {
  namespace dnd5e.types {
    namespace Proficiency {
      interface DefaultProficiencyTypes {
        0: true;
        1: true;
        0.5: true;
        2: true;
      }

      /**
       * Override interface for declaration merging.
       * Add custom proficiency multiplier levels here.
       * @example
       * declare global {
       *   namespace dnd5e.types.Proficiency {
       *     interface OverrideTypes {
       *       3: true
       *     }
       *   }
       * }
       */
      interface OverrideTypes extends Record<string, boolean | never> {}

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<DefaultProficiencyTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      interface DefaultWeaponProficiencyTypes {
        0: true;
        1: true;
      }

      /**
       * Override interface for declaration merging.
       * Add custom weapon/armor proficiency multiplier levels here.
       */
      interface OverrideWeaponProficiencyTypes extends Record<string, boolean | never> {}

      // --- Derived Types ---
      type WeaponProficiencyTypes = dnd5e.types.MergeOverrideDefinition<
        DefaultWeaponProficiencyTypes,
        OverrideWeaponProficiencyTypes
      >;
      type WeaponProficiencyTypeKey = dnd5e.types.ExtractKeys<WeaponProficiencyTypes>;
    }

    interface DND5EConfig {
      /**
       * Skill, ability, and tool proficiency levels.
       * The key for each level represents its proficiency multiplier.
       */
      proficiencyLevels: {
        [K in Proficiency.TypeKey]: string;
      };
      /**
       * Weapon and armor item proficiency levels.
       */
      weaponAndArmorProficiencyLevels: {
        [K in Proficiency.WeaponProficiencyTypeKey]: string;
      };
    }
  }
}
