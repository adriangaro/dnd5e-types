/**
 * Container types config domain (Seam A). `CONFIG.DND5E.containerTypes`.
 *
 * Label-map style: each value is a compendium item id (string) for the container.
 *
 * Downstream modules add a type in one line:
 *   declare global { namespace dnd5e.types.ContainerType { interface OverrideTypes { myContainer: true } } }
 */

declare global {
  namespace dnd5e.types {
    namespace ContainerType {
      /** Core container types. */
      interface DefaultTypes {
        backpack: true;
        barrel: true;
        basket: true;
        boltcase: true;
        bottle: true;
        bucket: true;
        case: true;
        chest: true;
        flask: true;
        jug: true;
        pot: true;
        pitcher: true;
        pouch: true;
        quiver: true;
        sack: true;
        saddlebags: true;
        tankard: true;
        vial: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      /** Each value is a compendium item id for the container. */
      containerTypes: { [K in dnd5e.types.ContainerType.TypeKey]: string };
    }
  }
}

export {};
