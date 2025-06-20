import { ItemDataModel } from "../abstract.mjs";
import DamageField from "../shared/damage-field.mjs";
import UsesField from "../shared/uses-field.mjs";
import ActivitiesTemplate from "./templates/activities.mjs";
import EquippableItemTemplate from "./templates/equippable-item.mjs";
import IdentifiableTemplate from "./templates/identifiable.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import ItemTypeTemplate from "./templates/item-type.mjs";
import PhysicalItemTemplate from "./templates/physical-item.mjs";
import ItemTypeField from "./fields/item-type-field.mjs";

declare class _ItemDataModel extends ItemDataModel { }
/**
 * Data definition for Consumable items.
 */
declare class ConsumableData extends _ItemDataModel.mixin(
  ActivitiesTemplate, ItemDescriptionTemplate<'consumable'>, IdentifiableTemplate, ItemTypeTemplate<'consumable'>,
  PhysicalItemTemplate, EquippableItemTemplate
)<
dnd5e.types.MergeSchemas<
  dnd5e.types.MergeSchemas<
    {
      damage: foundry.data.fields.SchemaField<{
        base: DamageField,
        replace: foundry.data.fields.BooleanField
      }>,
      magicalBonus: foundry.data.fields.NumberField<{ min: 0, integer: true }>,
      properties: foundry.data.fields.SetField<
        dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperties.Consumable.TypeKey>
      >,
      type: ItemTypeField<'consumable', {}, { label: "DND5E.ItemConsumableType" }>,
      uses: UsesField<{
        autoDestroy: foundry.data.fields.BooleanField<{ required: true }>
      }>
    },
    {}
  >,
      fvttUtils.RemoveIndexSignatures<
        dnd5e.types.DataModelConfig.Item.consumable.OverrideSchema
      >
    >
> {
  /* -------------------------------------------- */

  metadata: fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      hasEffects: true,
      enchantable: true,
    }
  >;
  static get metadata(): fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      hasEffects: true,
      enchantable: true,
    }
  >;

  /* -------------------------------------------- */

  /**
   * Default configuration for this item type's inventory section.
   */
  static get inventorySection(): dnd5e.applications.components.InventoryElement.InventorySectionDescriptor


  /* -------------------------------------------- */
  /*  Data Migrations                             */
  /* -------------------------------------------- */

  /* -------------------------------------------- */

  /**
   * Migrate weapon damage from old parts.
   */
  static #migrateDamage(source: ConsumableData['_source'])

  /* -------------------------------------------- */

  /**
   * Migrate the properties object into a set.
   */
  static #migratePropertiesData(source: ConsumableData['_source'])

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /* -------------------------------------------- */

  /** @inheritDoc */
  getFavoriteData: () => Promise<
    ConsumableData.FavoriteData<this>
  >

  /** @inheritDoc */
  getSheetData(context: ConsumableData.SheetData): Promise<void>

  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Properties displayed in chat.
   */
  get chatProperties(): string[]

  /* -------------------------------------------- */

  /**
   * Does this item have base damage defined in `damage.base` to offer to an activity?
   */
  get offersBaseDamage(): boolean

  /* -------------------------------------------- */

  /**
   * The proficiency multiplier for this item.
   */
  get proficiencyMultiplier(): number
}

declare namespace ConsumableData {
  type Schema = dnd5e.types.GetSchema<typeof ConsumableData>
  interface FavoriteData<This> extends ItemDataModel.FavoriteData {
    subtitle: [string, string],
    uses?: dnd5e.types.GetKeyReturn<This, 'getUsesData'>,
    quantity: number
  }

  interface SheetData {
    subtitles: { label: string }[],
    parts: string[],
    damageTypes: dnd5e.types.FormSelectOption[],
    denominationOptions: dnd5e.types.FormSelectOption[],
    itemType: string,
    itemSubtypes: string[]
  }
}

declare global {
  namespace dnd5e.types {
    namespace Consumable {
      namespace Ammo {
        interface DefaultAmmoTypes extends Record<string, boolean> {
          "arrow": true,
          "crossbowBolt": true,
          "firearmBullet": true,
          "slingBullet": true,
          "blowgunNeedle": true
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
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultAmmoTypes,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      namespace Poison {
        interface DefaultPoisonTypes extends Record<string, boolean> {
          "contact": true,
          "ingested": true,
          "inhaled": true,
          "injury": true
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
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultPoisonTypes,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      // --- Base Definitions ---
      interface DefaultConsumableTypes extends Record<string, string | null> {
        ammo: dnd5e.types.Consumable.Ammo.TypeKey
        food: null,
        poison: dnd5e.types.Consumable.Poison.TypeKey
        potion: null,
        rod: null,
        scroll: null,
        trinket: null,
        wand: null
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
      interface OverrideTypes extends Record<string, string | null | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultConsumableTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    namespace ItemProperties {
      namespace Consumable {
        // --- Base Definitions ---
        interface DefaultConsumableProperties {
          mgc: true; // Magical
        }

        /**
         * Override interface for declaration merging.
         * Add custom consumable properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.ItemProperties.Consumable {
         * interface OverrideTypes {
         * cursed: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> {}

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultConsumableProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      interface ValidPropertyMap {
        consumable: ItemProperties.Consumable.TypeKey;  
      }
    }
    namespace ItemTypes {
      interface ItemTypeMap {
        consumable: {
          [K in Consumable.TypeKey]: dnd5e.types.ItemTypes.ItemTypeConfig<Consumable.Types[K]>
        }
      }
    }
    namespace DataModelConfig {
      interface Item {
        consumable: typeof ConsumableData;
      }
      namespace Item.consumable {
        interface OverrideSchema extends foundry.data.fields.DataSchema {

        }
      }
    }

    interface DND5EConfig {
      /**
       * The basic ammunition types.
       * @enum {string}
       */
      ammoIds: {
        [K in Consumable.Ammo.TypeKey]: string
      }
      /**
       * Enumerate the valid consumable types which are recognized by the system.
       */
      consumableTypes: {
        [K in Consumable.TypeKey]: dnd5e.types.ItemTypes.StrictItemTypeConfig<Consumable.Types[K]>
      }
    }
  }
}

export default ConsumableData;