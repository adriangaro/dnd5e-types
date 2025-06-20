import { ItemDataModel } from "../abstract.mjs";
import CurrencyTemplate from "../shared/currency.mjs";
import EquippableItemTemplate from "./templates/equippable-item.mjs";
import IdentifiableTemplate from "./templates/identifiable.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import PhysicalItemTemplate from "./templates/physical-item.mjs";

declare class _ItemDataModel extends ItemDataModel { }

/**
 * Data definition for Container items.
 * @mixes ItemDescriptionTemplate
 * @mixes IdentifiableTemplate
 * @mixes PhysicalItemTemplate
 * @mixes EquippableItemTemplate
 * @mixes CurrencyTemplate
 */
declare class ContainerData extends _ItemDataModel.mixin(
  ItemDescriptionTemplate<'container'>, IdentifiableTemplate, PhysicalItemTemplate, EquippableItemTemplate, CurrencyTemplate
)<
  dnd5e.types.MergeSchemas<
    dnd5e.types.MergeSchemas<
      // Base schema fields defined directly in ContainerData.defineSchema()
      {
        capacity: foundry.data.fields.SchemaField<{
          count: foundry.data.fields.NumberField<{ min: 0, integer: true }>,
          volume: foundry.data.fields.SchemaField<{
            value: foundry.data.fields.NumberField<{ min: 0 }>,
            units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Volume.TypeKey>
          }>,
          weight: foundry.data.fields.SchemaField<{
            value: foundry.data.fields.NumberField<{ min: 0 }>,
            units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Weight.TypeKey>
          }>
        }>,
        properties: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperties.Container.TypeKey>
        >,
        // This overrides the quantity field from PhysicalItemTemplate to ensure the correct type is used
        quantity: foundry.data.fields.NumberField<{ min: 1, max: 1 }>
      },
      // The second object for derived properties added to inherited fields is empty,
      // as derived properties from mixins should be typed in the mixins' .d.mts files.
      {}
    >,
    fvttUtils.RemoveIndexSignatures<
      dnd5e.types.DataModelConfig.Item.container.OverrideSchema
    >
  >
> {

  /* -------------------------------------------- */
  /*  Model Configuration                         */
  /* -------------------------------------------- */

  static LOCALIZATION_PREFIXES: ["DND5E.CONTAINER", "DND5E.SOURCE"];

  static metadata: fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      enchantable: true,
    }
  >;

  override metadata: fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
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

  /**
   * Migrate the weightless property into `properties`.
   * @param source  The candidate source data from which the model will be constructed.
   */
  static _migrateWeightlessData(source: ContainerData['_source'])

  /**
   * Migrate capacity to support multiple fields and units.
   * @param source  The candidate source data from which the model will be constructed.
   */
  static #migrateCapacity(source: ContainerData['_source'])

  /* -------------------------------------------- */

  /**
   * Force quantity to always be 1.
   * @param source  The candidate source data from which the model will be constructed.
   */
  static #migrateQuantity(source: ContainerData['_source'])

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  prepareFinalData(): void;

  /** @inheritDoc */
  getFavoriteData(): Promise<
    ContainerData.FavoriteData
  >

  /** @inheritDoc */
  getSheetData(context: ContainerData.SheetData): Promise<void>

  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Get all of the items contained in this container. A promise if item is within a compendium.
   */

  get contents(): Collection<Item.Implementation> | Promise<Collection<Item.Implementation>>;

  /**
   * Get all of the items in this container and any sub-containers. A promise if item is within a compendium.
   */

  get allContainedItems(): Collection<Item.Implementation> | Promise<Collection<Item.Implementation>>;

  /**
     * Asynchronous helper method for fetching all contained items from a compendium.
     * @private
     */
  #allContainedItems(): Promise<Collection<Item.Implementation>>

  /**
   * Number of items contained in this container including items in sub-containers. Result is a promise if item
   * is within a compendium.
   */
  get contentsCount(): number | Promise<number>;

  /**
   * Weight of the items in this container. Result is a promise if item is within a compendium.
   */
  get contentsWeight(): number | Promise<number>;

  /**
   * The weight of this container with all of its contents. Result is a promise if item is within a compendium.
   */
  // @ts-expect-error
  override get totalWeight(): number | Promise<number>; // Overrides PhysicalItemTemplate getter

  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  /**
   * Fetch a specific contained item.
   */
  getContainedItem(id: string): Item.Implementation | Promise<Item.Implementation | undefined> | undefined;

  /**
   * Compute capacity information for this container.
   */
  computeCapacity(): Promise<ContainerData.ItemCapacityDescriptor>;
}


declare namespace ContainerData {
  type Schema = dnd5e.types.GetSchema<typeof ContainerData>

  interface ItemCapacityDescriptor {
    /** The current total weight or number of items in the container. */
    value: number;
    /** The maximum total weight or number of items in the container. */
    max: number;
    /** The percentage of total capacity. */
    pct: number;
    /** The units label. */
    units: string;
  }

  interface FavoriteData extends ItemDataModel.FavoriteData {
    uses?: ItemCapacityDescriptor
  }

  interface SheetData {
    subtitles: { label: string }[],
    parts: string[]
  }
}

declare global {
  namespace dnd5e.types {
    namespace ItemProperties {
      namespace Container {
        // --- Base Definitions ---
        interface DefaultContainerProperties {
          mgc: true; // Magical
          weightlessContents: true; // Contents do not count toward encumbrance
        }

        /**
         * Override interface for declaration merging.
         * Add custom container properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.ItemProperties.Container {
         * interface OverrideTypes {
         * extradimensional: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultContainerProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      interface ValidPropertyMap {
        container: ItemProperties.Container.TypeKey;
      }
    }


    namespace DataModelConfig {
      interface Item {
        container: typeof ContainerData;
      }
      namespace Item.container {
        interface OverrideSchema extends foundry.data.fields.DataSchema {

        }
      }
    }

    namespace Volume {
      interface DefaultVolumeUnits extends Record<string, true> {
        cubicFoot: true
        liter: true
      }

      interface OverrideTypes extends Record<string, true | never> {

      }

      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultVolumeUnits,
        OverrideTypes
      >

      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    namespace Weight {
      interface DefaultWeightUnits extends Record<string, true> {
        lb: true
        tn: true
        kg: true
        Mg: true
      }

      interface OverrideTypes extends Record<string, true | never> {

      }

      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultWeightUnits,
        OverrideTypes
      >

      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      // Does not seem to be used
      /**
       * Types of containers.
       */
      containerTypes: Record<string, string>
      /**
       * The valid units for measurement of volume.
       */
      volumeUnits: {
        [K in Volume.TypeKey]: DND5EConfig.UnitConfiguration
      }
      /**
       * The valid units for measurement of weight.
       */
      weightUnits: {
        [K in Weight.TypeKey]: DND5EConfig.UnitConfiguration
      }
    }
  }
}

export default ContainerData;
