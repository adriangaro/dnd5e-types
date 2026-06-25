/**
 * Cover config domain (Seam A). `CONFIG.DND5E.cover`.
 *
 * The amount of cover provided by an object. In cases where multiple pieces
 * of cover are in play, we take the highest value.
 *
 * Maps the amount of cover (as a numeric fraction) to a localized label.
 */

declare global {
  namespace dnd5e.types {
    namespace Cover {
      /** Default cover steps: none, half, three-quarters, total. */
      interface DefaultTypes {
        0: true;
        0.5: true;
        0.75: true;
        1: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<number, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      cover: { [K in dnd5e.types.Cover.TypeKey]: string };
    }
  }
}

export {};
