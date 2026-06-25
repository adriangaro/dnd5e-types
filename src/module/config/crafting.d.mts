/**
 * Crafting cost config domain. `CONFIG.DND5E.crafting`.
 *
 * A single configuration object (not a keyed Seam-A record) describing
 * crafting time/cost multipliers and per-rarity / per-level costs.
 */

declare global {
  namespace dnd5e.types {
    namespace Crafting {
      /** A flat day/gold cost for crafting an item. */
      interface Costs {
        /** Number of days required to craft the item, not including its base item. */
        days: number;
        /** Amount of gold required for raw materials, not including the base item. */
        gold: number;
      }

      /** Day/gold multipliers applied relative to a base item's cost. */
      interface CostsMultiplier {
        /** The days multiplier. */
        days: number;
        /** The gold multiplier. */
        gold: number;
      }

      /** Shape of `CONFIG.DND5E.crafting`. */
      interface Config {
        /** Discounts for crafting a magical consumable. */
        consumable: CostsMultiplier;
        /** Crafting costs for items that are exceptions to the general rules, by identifier. */
        exceptions: Record<string, Costs>;
        /** Magic item crafting costs by rarity. */
        magic: Partial<Record<dnd5e.types.ItemRarity.TypeKey, Costs>>;
        /** Multipliers for crafting mundane items. */
        mundane: CostsMultiplier;
        /** Crafting costs for spell scrolls by level. */
        scrolls: Partial<Record<dnd5e.types.SpellLevel.TypeKey, Costs>>;
      }
    }

    interface DND5EConfig {
      crafting: dnd5e.types.Crafting.Config;
    }
  }
}

export {};
