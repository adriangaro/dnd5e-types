/**
 * Loot item type config domain (Seam A). `CONFIG.DND5E.lootTypes`.
 */

declare global {
  namespace dnd5e.types {
    namespace LootType {
      /** Core loot types. */
      interface DefaultTypes {
        art: true;
        gear: true;
        gem: true;
        junk: true;
        material: true;
        resource: true;
        trade: true;
        treasure: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.lootTypes[key]` entry. */
      interface Config {
        /** Localized label. */
        label: string;
      }
    }

    interface DND5EConfig {
      /** Types of "loot" items. */
      lootTypes: { [K in dnd5e.types.LootType.TypeKey]: dnd5e.types.LootType.Config };
    }
  }
}

export {};
