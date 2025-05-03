import SystemDataModel from "../../abstract.mjs";

/**
 * Data model template with information on physical items.
 * @mixin
 */
declare class PhysicalItemTemplate extends SystemDataModel<dnd5e.types.MergeSchemas<
  {
    // TODO: circularity
    // this should be ForeignDocumentField of Item, but circular, 
    // this however is correct enough due to being id only
    container: foundry.data.fields.DocumentIdField<
      {
        idOnly: true, label: "DND5E.Container"
      }
    >,
    quantity: foundry.data.fields.NumberField<{
      required: true, nullable: false, integer: true, initial: 1, min: 0, label: "DND5E.Quantity"
    }>,
    weight: foundry.data.fields.SchemaField<
      {
        value: foundry.data.fields.NumberField<{
          required: true, nullable: false, initial: 0, min: 0, label: "DND5E.Weight"
        }>,
        units: foundry.data.fields.StringField<{
          required: true, blank: false, label: "DND5E.UNITS.WEIGHT.Label", initial: () => string
        }>
      },
      { label: "DND5E.Weight" }
    >,
    price: foundry.data.fields.SchemaField<
      {
        value: foundry.data.fields.NumberField<{
          required: true, nullable: false, initial: 0, min: 0, label: "DND5E.Price"
        }>,
        denomination: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Currency.TypeKey, {
          required: true,
          blank:
          false,
          initial: "gp",
          label: "DND5E.Currency"
        }>
      },
      { label: "DND5E.Price" }
    >,
    rarity: dnd5e.types.fields.RestrictedStringField<
      dnd5e.types.Rarity.TypeKey,
      { required: true, blank: true, label: "DND5E.Rarity" }
    >
  },
  {
    price: foundry.data.fields.SchemaField<
      {},
      {},
      {},
      {
        valueInGP: number
      }
    >,
  }
>> {

  /* -------------------------------------------- */

  /**
   * Maximum depth items can be nested in containers.
   */
  static MAX_DEPTH: number;

  /* -------------------------------------------- */

  /**
   * Create filter configurations shared by all physical items.
   */
  static get compendiumBrowserPhysicalItemFilters(): [string, dnd5e.types.CompendiumBrowserFilterDefinitionEntry][]

  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Get a human-readable label for the price and denomination.
   */
  get priceLabel(): string

  /* -------------------------------------------- */

  /**
   * The weight of all of the items in an item stack.
   */
  get totalWeight(): number

  /* -------------------------------------------- */

  /**
   * Field specifications for physical items.
   */
  get physicalItemSheetFields(): {
    label: any;
    value: dnd5e.types.Rarity.TypeKey;
    requiresIdentification: boolean;
    field: foundry.data.fields.DataField.Unknown | undefined;
    choices: any;
    blank: string;
    classes: string;
  }[];

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Prepare physical item properties.
   */
  preparePhysicalData()

  /* -------------------------------------------- */
  /*  Migrations                                  */
  /* -------------------------------------------- */


  /**
   * Migrate the item's price from a single field to an object with currency.
   */
  static #migratePrice(source: PhysicalItemTemplate['_source'])

  /* -------------------------------------------- */

  /**
   * Migrate the item's rarity from freeform string to enum value.
   */
  static #migrateRarity(source: PhysicalItemTemplate['_source'])

  /* -------------------------------------------- */

  /**
   * Migrate the item's weight from a single field to an object with units & convert null weights to 0.
   */
  static #migrateWeight(source: PhysicalItemTemplate['_source'])

  /* -------------------------------------------- */
  /*  Socket Event Handlers                       */
  /* -------------------------------------------- */

  /**
   * Trigger a render on all sheets for items within which this item is contained.
   * @param options.formerContainer  UUID of the former container if this item was moved.
   * @protected
   */
  _renderContainers(options?: {
    formerContainer?: string
  } & foundry.applications.api.ApplicationV2.RenderOptions): Promise<void>


  /* -------------------------------------------- */
  /*  Helper Methods                              */
  /* -------------------------------------------- */

  /**
   * All of the containers this item is within up to the parent actor or collection.
   */
  allContainers(): Promise<Item.OfType<'container'>[]>

  /* -------------------------------------------- */

  /**
   * Calculate the total weight and return it in specific units.
   */
  totalWeightIn(units: string): number | Promise<number> 
}

declare global {
  namespace dnd5e.types {
    namespace Rarity {
      interface DefaultRarityTypes {
        artifact: true;
        common: true;
        legendary: true;
        rare: true;
        uncommon: true;
        verRare: true
      }

      /**
         * Override interface for declaration merging.
         * Add custom item rarity here.
         * @example
         * declare global {
         * namespace dnd5e.types.Rarity {
         * interface OverrideTypes {
         * hyperRare: true // e.g., Hyper-rare
         * }
         * }
         * }
         */
      interface OverrideTypes extends Record<string, boolean | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultRarityTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }
  }

  interface DND5EConfig {
    /**
     * List of various item rarities.
     */
    itemRarity: {
      [K in dnd5e.types.Rarity.TypeKey]: string
    }
  }
}

export default PhysicalItemTemplate