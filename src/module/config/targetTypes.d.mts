/**
 * Single/area target types for abilities (label map). `CONFIG.DND5E.targetTypes`.
 *
 * Built by merging the labels of `individualTargetTypes` and `areaTargetTypes`.
 */

declare global {
  namespace dnd5e.types {
    namespace TargetType {
      /** Individual + area targeting keys. */
      interface DefaultTypes {
        // Individual targets
        self: true;
        ally: true;
        enemy: true;
        creature: true;
        object: true;
        space: true;
        creatureOrObject: true;
        any: true;
        willing: true;
        // Area targets
        circle: true;
        cone: true;
        cube: true;
        cylinder: true;
        line: true;
        radius: true;
        ring: true;
        sphere: true;
        square: true;
        wall: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      targetTypes: { [K in dnd5e.types.TargetType.TypeKey]: string };
    }
  }
}

export {};
