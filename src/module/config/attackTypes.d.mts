/**
 * Attack type config domain (Seam A). `CONFIG.DND5E.attackTypes`.
 *
 * Types of attacks based on range (melee/ranged). Note: runtime object is `Object.seal`ed.
 */

declare global {
  namespace dnd5e.types {
    namespace AttackType {
      /** Core attack types. */
      interface DefaultTypes {
        melee: true;
        ranged: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.attackTypes[key]` entry. */
      interface Config {
        /** Localized label. */
        label: string;
      }
    }

    interface DND5EConfig {
      attackTypes: {
        [K in dnd5e.types.AttackType.TypeKey]: dnd5e.types.AttackType.Config;
      };
    }
  }
}

export {};
