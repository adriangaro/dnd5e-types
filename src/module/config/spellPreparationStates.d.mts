/**
 * Spell-preparation-state config domain (Seam A). `CONFIG.DND5E.spellPreparationStates`.
 *
 * Keyed record of objects describing each preparation state (unprepared / prepared /
 * always prepared) with a localized label and numeric ordering value.
 */

declare global {
  namespace dnd5e.types {
    namespace SpellPreparationState {
      /** Core preparation states. */
      interface DefaultTypes {
        unprepared: true;
        prepared: true;
        always: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.spellPreparationStates[key]` entry. */
      interface Config {
        /** The human-readable label. */
        label: string;
        /** A unique number representing this state. */
        value: number;
      }
    }

    interface DND5EConfig {
      spellPreparationStates: {
        [K in dnd5e.types.SpellPreparationState.TypeKey]: dnd5e.types.SpellPreparationState.Config;
      };
    }
  }
}

export {};
