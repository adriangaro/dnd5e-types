import { ItemDataModel } from "../abstract.mjs";
import IdentifiableTemplate from "./templates/identifiable.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import ItemTypeTemplate from "./templates/item-type.mjs";
import PhysicalItemTemplate from "./templates/physical-item.mjs";
import ItemTypeField from "./fields/item-type-field.mjs";

declare class _ItemDataModel extends ItemDataModel { }

/**
 * Data definition for Loot items.
 * @mixes ItemDescriptionTemplate
 * @mixes ItemTypeTemplate
 * @mixes IdentifiableTemplate
 * @mixes PhysicalItemTemplate
 */
declare class LootData extends _ItemDataModel.mixin(
  ItemDescriptionTemplate<'loot'>, IdentifiableTemplate, ItemTypeTemplate<'loot'>, PhysicalItemTemplate
)<
  dnd5e.types.MergeSchemas<
    {
      properties: foundry.data.fields.SetField<
        dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperties.Loot.TypeKey>,
        { label: "DND5E.ItemLootProperties" }
      >,
      type: ItemTypeField<'loot', { baseItem: false }, { label: "DND5E.ItemLootType" }>
    },
    {}
  >
> {


  /* -------------------------------------------- */

    metadata: fvttUtils.SimpleMerge<
      ItemDataModel['metadata'],
      {
        enchantable: true,
        inventoryItem: true,
        inventoryOrder: 600
      }
    >;
    static get metadata(): fvttUtils.SimpleMerge<
      ItemDataModel['metadata'],
      {
        enchantable: true,
        inventoryItem: true,
        inventoryOrder: 600
      }
    >;


  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Properties displayed in chat.
   */
  get chatProperties(): string[]
}
declare namespace LootData {
  
}

export default LootData

declare global {
  namespace dnd5e.types {
    namespace Loot {
      // --- Base Definitions ---
      interface DefaultLootTypes extends Record<string, string | null> {
        // this supports subtypes, just vanilla dnd5e has none
        art: null
        gear: null
        gem: null
        junk: null
        material: null
        resource: null
        treasure: null
      }

      /**
       * Override interface for declaration merging.
       * Add custom feat properties here.
       * @example
       * declare global {
       * namespace dnd5e.types.ItemProperties.Feat {
       * interface OverrideTypes {
       * combatManeuver: true
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, string | null | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultLootTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      interface LootTypeConfig {
        /**
         * Localized label for this type.
         */
        label: string
      }
    }


    namespace ItemProperties {


      namespace Loot {
        // --- Base Definitions ---
        interface DefaultLootProperties {
          mgc: true; // Magical (e.g., pile of magic dust)
        }

        /**
         * Override interface for declaration merging.
         * Add custom loot properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.ItemProperties.Loot {
         * interface OverrideTypes {
         * questItem: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> {}

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultLootProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      interface ValidPropertyMap {
        loot: ItemProperties.Loot.TypeKey;
      }
    }

    namespace ItemTypes {
      interface ItemTypeMap {
        loot: {
          [K in Loot.TypeKey]: ItemTypes.ItemTypeConfig<Loot.Types[K]>
        }
      }
    }

    namespace DataModelConfig {
      interface Item {
        loot: typeof LootData;
      }
    }

    interface DND5EConfig {
      /**
       * Types of "loot" items.
       */
      lootTypes: {
        [K in Loot.TypeKey]: Loot.LootTypeConfig
      }
    }
  }
}