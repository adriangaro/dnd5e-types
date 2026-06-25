/**
 * Source-pack registry config domain (Seam A). `CONFIG.DND5E.sourcePacks`.
 *
 * Maps logical source keys to compendium pack collection ids used for localized items.
 * Keys stay expandable; each value is a compendium pack id string.
 */

declare global {
  namespace dnd5e.types {
    namespace SourcePack {
      /** Compendium packs used for localized items. */
      interface DefaultTypes {
        BACKGROUNDS: true;
        CLASSES: true;
        ITEMS: true;
        RACES: true;
      }

      /** Downstream merge point — add `{ MY_PACK: true }` here. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      sourcePacks: { [K in dnd5e.types.SourcePack.TypeKey]: string };
    }
  }
}

export {};
