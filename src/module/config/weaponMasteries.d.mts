/**
 * Weapon mastery config domain (Seam A). `CONFIG.DND5E.weaponMasteries`.
 *
 * Downstream modules add a mastery in one line:
 *   declare global { namespace dnd5e.types.WeaponMastery { interface OverrideTypes { rend: true } } }
 */

declare global {
  namespace dnd5e.types {
    namespace WeaponMastery {
      interface DefaultTypes {
        cleave: true;
        graze: true;
        nick: true;
        push: true;
        sap: true;
        slow: true;
        topple: true;
        vex: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.weaponMasteries[key]` entry. */
      interface Config {
        /** Localized label for the mastery. */
        label: string;
        /** UUID reference to a rule page describing this mastery. */
        reference?: string;
      }
    }

    interface DND5EConfig {
      weaponMasteries: { [K in dnd5e.types.WeaponMastery.TypeKey]: dnd5e.types.WeaponMastery.Config };
    }
  }
}

export {};
