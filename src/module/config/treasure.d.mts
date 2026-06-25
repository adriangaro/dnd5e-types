/**
 * NPC treasure category config domain (Seam A). `CONFIG.DND5E.treasure`.
 */

declare global {
  namespace dnd5e.types {
    namespace Treasure {
      /** The default NPC treasure categories. */
      interface DefaultTypes {
        any: true;
        arcana: true;
        armaments: true;
        implements: true;
        individual: true;
        relics: true;
      }

      /** Downstream merge point — add `{ myCategory: true }` here. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.treasure[key]` entry (TreasureConfiguration5e). */
      interface Config {
        /** The human-readable treasure category name. */
        label: string;
      }
    }

    interface DND5EConfig {
      treasure: { [K in dnd5e.types.Treasure.TypeKey]: dnd5e.types.Treasure.Config };
    }
  }
}

export {};
