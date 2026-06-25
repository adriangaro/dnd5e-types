/**
 * Range type config domain (Seam A). `CONFIG.DND5E.rangeTypes`.
 *
 * Non-numeric range descriptors used when measuring actions and effects (self, touch, etc.).
 */

declare global {
  namespace dnd5e.types {
    namespace RangeType {
      /** The core non-numeric range descriptors. */
      interface DefaultTypes {
        self: true;
        touch: true;
        spec: true;
        any: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      rangeTypes: { [K in dnd5e.types.RangeType.TypeKey]: string };
    }
  }
}

export {};
