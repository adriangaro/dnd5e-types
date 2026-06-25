/**
 * Trait advancement mode config domain (Seam A). `CONFIG.DND5E.traitModes`.
 *
 * Modes used within a trait advancement.
 */

declare global {
  namespace dnd5e.types {
    namespace TraitMode {
      /** Default trait advancement modes. */
      interface DefaultTypes {
        default: true;
        expertise: true;
        forcedExpertise: true;
        upgrade: true;
        mastery: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.traitModes[key]` entry. */
      interface Config {
        /** Localized label. */
        label: string;
        /** Localized hint. */
        hint: string;
      }
    }

    interface DND5EConfig {
      traitModes: { [K in dnd5e.types.TraitMode.TypeKey]: dnd5e.types.TraitMode.Config };
    }
  }
}

export {};
