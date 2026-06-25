/**
 * Item rarity config domain (Seam A, label-map). `CONFIG.DND5E.itemRarity`.
 */

declare global {
  namespace dnd5e.types {
    namespace ItemRarity {
      /** Core item rarities. */
      interface DefaultTypes {
        common: true;
        uncommon: true;
        rare: true;
        veryRare: true;
        legendary: true;
        artifact: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      /** List of various item rarities. */
      itemRarity: { [K in dnd5e.types.ItemRarity.TypeKey]: string };
    }
  }
}

export {};
