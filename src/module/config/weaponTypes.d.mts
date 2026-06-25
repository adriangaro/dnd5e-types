/**
 * Weapon type config domain (Seam A, label map). `CONFIG.DND5E.weaponTypes`.
 *
 * The set of types which a weapon item can take.
 */

declare global {
  namespace dnd5e.types {
    namespace WeaponType {
      interface DefaultTypes {
        simpleM: true;
        simpleR: true;
        martialM: true;
        martialR: true;
        natural: true;
        improv: true;
        siege: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      weaponTypes: { [K in dnd5e.types.WeaponType.TypeKey]: string };
    }
  }
}

export {};
