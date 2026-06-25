/**
 * Basic ammunition types (Seam A, UUID-map). `CONFIG.DND5E.ammoIds`.
 *
 * Values are compendium item UUIDs for the default ammunition entries.
 */

declare global {
  namespace dnd5e.types {
    namespace AmmoId {
      /** The basic ammunition types. */
      interface DefaultTypes {
        arrow: true;
        blowgunNeedle: true;
        crossbowBolt: true;
        firearmBullet: true;
        slingBullet: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      /** Compendium item UUIDs keyed by ammunition id. */
      ammoIds: { [K in dnd5e.types.AmmoId.TypeKey]: string };
    }
  }
}

export {};
