/**
 * Attack classification config domain (Seam A). `CONFIG.DND5E.attackClassifications`.
 *
 * Classifications of attacks based on what is performing them (weapon/spell/unarmed).
 */

declare global {
  namespace dnd5e.types {
    namespace AttackClassification {
      /** Core attack classifications. */
      interface DefaultTypes {
        weapon: true;
        spell: true;
        unarmed: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.attackClassifications[key]` entry. */
      interface Config {
        /** Localized label. */
        label: string;
      }
    }

    interface DND5EConfig {
      attackClassifications: {
        [K in dnd5e.types.AttackClassification.TypeKey]: dnd5e.types.AttackClassification.Config;
      };
    }
  }
}

export {};
