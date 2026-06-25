/**
 * Hit die denominations (Seam A, array-valued). `CONFIG.DND5E.hitDieTypes`.
 *
 * Runtime value is an ordered array of die-denomination strings (`["d4","d6",…]`). The
 * namespace below keeps the set of valid denominations downstream-expandable; the config
 * entry is an array of those keys.
 */

declare global {
  namespace dnd5e.types {
    namespace HitDieType {
      /** Core hit die denominations. */
      interface DefaultTypes {
        d4: true;
        d6: true;
        d8: true;
        d10: true;
        d12: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types> & string;
    }

    interface DND5EConfig {
      /** Denominations of hit dice which can apply to classes. */
      hitDieTypes: dnd5e.types.HitDieType.TypeKey[];
    }
  }
}

export {};
