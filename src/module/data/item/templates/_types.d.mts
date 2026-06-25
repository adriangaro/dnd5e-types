/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/item/templates/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.item.templates {
      interface ActivitiesTemplateData {
      activities: dnd5e.types.Activity.Collection; // Activities on this item.
      uses: dnd5e.types.data.shared.UsesData; // Item's limited uses & recovery.
      }

      interface AdvancementTemplateData {
      advancement: dnd5e.types.Advancement.Collection; // Advancement objects for this item.
      }

      interface EquippableItemTemplateData {
      attunement: dnd5e.types.AttunementType.TypeKey | ""; // Attunement information as defined in `DND5E.attunementTypes`.
      attuned: boolean; // Is this item attuned on its owning actor?
      equipped: boolean; // Is this item equipped on its owning actor?
      }

      interface IdentifiableTemplateData {
      identified: boolean; // Has this item been identified?
      unidentified: {
        name: string; // Name of the item when it is unidentified.
        description: string; // Description displayed if item is unidentified.
      };
      }

      interface ItemDescriptionTemplateData {
      /** Various item descriptions. */
      description: {
        value: string; // Full item description.
        chat: string; // Description displayed in chat card.
      };
      identifier: string; // Identifier slug for this item.
      source: dnd5e.types.data.shared.SourceData; // Adventure or sourcebook where this item originated.
      }

      interface MountableTemplateData {
      cover: number; // Amount of cover this item affords to its crew on a vehicle.
      crew: {
        max: number; // The number of crew this station can support.
        value: string[]; // The crew assigned to this station.
      };
      hp: {
        value: number; // Current hit point value.
        max: number; // Max hit points.
        dt: number; // Damage threshold.
        conditions: string; // Conditions that are triggered when this equipment takes damage.
      };
      speed: {
        conditions: string; // Conditions that may affect item's speed.
        value: number; // Speed granted by this piece of equipment measured in feet or meters depending on system setting.
      };
      }

      interface PhysicalItemTemplateData {
      container: string; // Container within which this item is located.
      quantity: number; // Number of items in a stack.
      weight: dnd5e.types.core.UnitValue5e; // The Item's weight.
      price: {
        value: number; // Item's cost in the specified denomination.
        denomination: dnd5e.types.Currency.TypeKey; // Currency denomination used to determine price.
      };
      rarity: dnd5e.types.ItemRarity.TypeKey | ""; // Item rarity as defined in `DND5E.itemRarity`.
      }

      interface StartingEquipmentTemplateData {
      startingEquipment: import("../../../../module/data/item/templates/starting-equipment.mjs").EquipmentEntryData[]; // Different equipment entries that will be granted.
      wealth: string; // Formula used to determine starting wealth.
      }

  }
}

export {};
