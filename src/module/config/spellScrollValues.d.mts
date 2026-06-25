/**
 * Spell scroll save DC / attack bonus values per spell level (Seam A). `CONFIG.DND5E.spellScrollValues`.
 *
 * Keyed by spell level; if a matching level isn't found, the nearest lower level is used.
 */

declare global {
  namespace dnd5e.types {
    namespace SpellScrollValue {
      /** Levels that have explicit DC/bonus values defined. */
      interface DefaultTypes {
        0: true;
        3: true;
        5: true;
        7: true;
        9: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.spellScrollValues[level]` entry. */
      interface Config {
        /** Attack to hit bonus. */
        bonus: number;
        /** Saving throw DC. */
        dc: number;
      }
    }

    interface DND5EConfig {
      spellScrollValues: { [K in dnd5e.types.SpellScrollValue.TypeKey]: dnd5e.types.SpellScrollValue.Config };
    }
  }
}

export {};
