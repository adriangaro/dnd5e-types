/**
 * Common armor class calculations (Seam A). `CONFIG.DND5E.armorClasses`.
 */

declare global {
  namespace dnd5e.types {
    namespace ArmorClass {
      /** The built-in AC calculation methods. */
      interface DefaultTypes {
        natural: true;
        armored: true;
        unarmored: true;
        mage: true;
        draconic: true;
        unarmoredMonk: true;
        unarmoredBarb: true;
        unarmoredBard: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.armorClasses[key]` entry. */
      interface Config {
        /** Localized label for this calculation. */
        label: string;
        /** Roll formula used to compute the AC value. */
        formula?: string;
        /** Whether worn armor contributes to this calculation. */
        armored?: boolean;
        /** Whether a shield contributes to this calculation. */
        shielded?: boolean;
      }
    }

    interface DND5EConfig {
      armorClasses: { [K in dnd5e.types.ArmorClass.TypeKey]: dnd5e.types.ArmorClass.Config };
    }
  }
}

export {};
