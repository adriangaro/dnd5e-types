/**
 * Attack mode config domain (Seam A). `CONFIG.DND5E.attackModes`.
 *
 * Attack modes available for weapons (oneHanded/twoHanded/offhand/ranged/thrown/thrown-offhand).
 * Note: runtime object is `Object.seal`ed.
 */

declare global {
  namespace dnd5e.types {
    namespace AttackMode {
      /** Core attack modes. */
      interface DefaultTypes {
        oneHanded: true;
        twoHanded: true;
        offhand: true;
        ranged: true;
        thrown: true;
        "thrown-offhand": true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.attackModes[key]` entry. */
      interface Config {
        /** Localized label. */
        label: string;
      }
    }

    interface DND5EConfig {
      attackModes: {
        [K in dnd5e.types.AttackMode.TypeKey]: dnd5e.types.AttackMode.Config;
      };
    }
  }
}

export {};
