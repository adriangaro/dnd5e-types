/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/abstract/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.abstract {
      interface ActorDataModelMetadata extends SystemDataModelMetadata {
      supportsAdvancement: boolean; // Can advancement be performed for this actor type?
      }

      interface ChatMessageDataModelMetadata {
      actions: Record<string, foundry.applications.api.ApplicationV2.ClickAction | { handler: foundry.applications.api.ApplicationV2.ClickAction; buttons: number[] }>; // Default click actions for buttons on the message.
      template: string; // Template to use when rendering this message.
      }

      interface ItemDataModelMetadata extends SystemDataModelMetadata {
      compendiumGearSource: boolean; // Only for physical items. When fetching item as gear from a NPC, prefer the compendium source over the embedded version.
      enchantable: boolean; // Can this item be modified by enchantment effects?
      hasEffects: boolean; // Display the effects tab on this item's sheet.
      singleton: boolean; // Should only a single item of this type be allowed on an actor?
      inventory?: dnd5e.types.applications.components.InventorySectionDescriptor; // Configuration for displaying this item type in its own section in creature inventories.
      }

      interface FavoriteData5e {
      img: string; // The icon path.
      title: string; // The title.
      subtitle?: string|string[]; // An optional subtitle or several subtitle parts.
      value?: number; // A single value to display.
      quantity?: number; // The item's quantity.
      modifier?: string|number; // A modifier associated with the item.
      passive?: number; // A passive score associated with the item.
      range?: { // The item's range.
        value?: number; // The first range increment.
        long?: number|null; // The second range increment.
        units?: dnd5e.types.RangeType.TypeKey | dnd5e.types.DistanceUnit.TypeKey; // The range units.
      };
      save?: { // The item's saving throw.
        ability?: dnd5e.types.Ability.TypeKey; // The saving throw ability.
        dc?: number; // The saving throw DC.
      };
      uses?: { // Data on an item's uses.
        value?: number; // The current available uses.
        max?: number; // The maximum available uses.
        name?: string; // The property to update on the item. If none is provided, the property will not be updatable.
      };
      toggle?: boolean; // The effect's toggle state.
      suppressed?: boolean; // Whether the favorite is suppressed.
      }

      interface SystemDataModelMetadata {
      systemFlagsModel?: foundry.abstract.DataModel.AnyConstructor | null; // Model that represents flags data within the dnd5e namespace.
      }

  }
}

export {};
