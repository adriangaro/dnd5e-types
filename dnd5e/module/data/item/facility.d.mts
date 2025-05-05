import { ItemDataModel } from "../abstract.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import ItemTypeField from "./fields/item-type-field.mjs";
import ActivitiesTemplate from "./templates/activities.mjs";

declare class _ItemDataModel extends ItemDataModel { }

/**
 * @typedef FacilityOccupants
 * @property {string[]} value  A list of Actor UUIDs assigned to the facility.
 * @property {number} max      The facility's maximum occupant capacity.
 */

/**
 * The data definition for Facility items.
 * @mixes ActivitiesTemplate
 * @mixes ItemDescriptionTemplate
 */
declare class FacilityData extends _ItemDataModel.mixin(ActivitiesTemplate, ItemDescriptionTemplate<'facility'>)<

  dnd5e.types.MergeSchemas<
    dnd5e.types.MergeSchemas<
      {
        building: foundry.data.fields.SchemaField<{
          built: foundry.data.fields.BooleanField<{ required: true }>;
          size: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Facility.Sizes.TypeKey, { initial: "cramped", blank: false, nullable: false, required: true }>
        }>;
        craft: foundry.data.fields.SchemaField<{
          item: foundry.data.fields.DocumentUUIDField;
          quantity: foundry.data.fields.NumberField<{ required: true, integer: true, positive: true, initial: 1, nullable: false }>;
        }>;
        defenders: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.ArrayField<foundry.data.fields.DocumentUUIDField<{ type: "Actor" }>>,
          max: foundry.data.fields.NumberField<{ required: true, integer: true, positive: true }>
        }>;
        disabled: foundry.data.fields.BooleanField<{ required: true }>;
        enlargeable: foundry.data.fields.BooleanField<{ required: true }>;
        free: foundry.data.fields.BooleanField<{ required: true }>;
        hirelings: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.ArrayField<foundry.data.fields.DocumentUUIDField<{ type: "Actor" }>>,
          max: foundry.data.fields.NumberField<{ required: true, integer: true, positive: true }>
        }>;
        level: foundry.data.fields.NumberField<{ required: true, integer: true, positive: true, initial: 5 }>;
        order: foundry.data.fields.StringField<{ required: true }>;
        progress: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.NumberField<{ required: true, integer: true, min: 0, nullable: false, initial: 0 }>;
          max: foundry.data.fields.NumberField<{ required: true, integer: true, positive: true }>;
          order: foundry.data.fields.StringField<{ required: true }>;
        }>;
        size: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Facility.Sizes.TypeKey, { initial: "cramped", blank: false, nullable: false, required: true }>
        trade: foundry.data.fields.SchemaField<{
          creatures: foundry.data.fields.SchemaField<{
            value: foundry.data.fields.ArrayField<foundry.data.fields.DocumentUUIDField<{ type: "Actor" }>>,
            max: foundry.data.fields.NumberField<{ required: true, integer: true, positive: true }>
          }>;
          pending: foundry.data.fields.SchemaField<{
            creatures: foundry.data.fields.ArrayField<foundry.data.fields.DocumentUUIDField>;
            operation: foundry.data.fields.StringField<{ required: true, nullable: true, options: ["buy", "sell"], initial: null }>;
            stocked: foundry.data.fields.BooleanField<{ required: true }>;
            value: foundry.data.fields.NumberField<{ required: true, min: 0, integer: true }>;
          }>;
          profit: foundry.data.fields.NumberField<{ required: true, min: 0, integer: true }>;
          stock: foundry.data.fields.SchemaField<{
            stocked: foundry.data.fields.BooleanField<{ required: true }>;
            value: foundry.data.fields.NumberField<{ required: true, min: 0, integer: true }>;
            max: foundry.data.fields.NumberField<{ required: true, integer: true, positive: true }>;
          }>;
        }>;
        type: ItemTypeField<'facility', { value: "basic", baseItem: false }>;
      },
      // The second object for derived properties added to inherited fields is empty,
      // as derived properties from mixins should be typed in the mixins' .d.mts files.
      {
        progress: foundry.data.fields.SchemaField<
          {},
          foundry.data.fields.SchemaField.DefaultOptions,
          {},
          {
            pct: number
          }
        >
      }
    >,
    fvttUtils.RemoveIndexSignatures<
      dnd5e.types.DataModelConfig.Item.facility.OverrideSchema
    >
  >
> {


  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Create an ephemeral Order activity.
   * @param id     The static ID string for the order. Will have staticID called on it.
   * @param order  The order.
   * @protected
   */
  _createOrderActivity(id: string, order: string): dnd5e.types.Activity.OfType<'order'>


  /* -------------------------------------------- */

  price?: {
    value: number,
    days: number,
    denomination: dnd5e.types.Currency.TypeKey
  } | null

  squares: number

  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareFinalData()
}

declare global {
  namespace dnd5e.types {
    namespace Facility {
      namespace Advancement {
        // --- Base Definitions ---
        interface DefaultAdvancementProperties {
          basic: true;
          special: true;
        }

        /**
         * Override interface for declaration merging.
         * Add custom advancement properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.Order.Advancement {
         * interface OverrideTypes {
         * customProperty: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultAdvancementProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      namespace Orders {
        // --- Base Definitions ---
        interface DefaultOrdersProperties {
          build: true;
          change: true;
          craft: true;
          empower: true;
          enlarge: true;
          harvest: true;
          maintain: true;
          recruit: true;
          repair: true;
          research: true;
          trade: true;
        }

        /**
         * Override interface for declaration merging.
         * Add custom orders properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.Order.Orders {
         * interface OverrideTypes {
         * customProperty: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultOrdersProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;

        interface OrdersConfig {
          /**
           * The human-readable name of the order.  
           */
          label: string,
          /**
           * The SVG icon for this order.
           */
          icon: string,
          /**
           * Whether this order can be issued to basic facilities.
           */
          basic?: boolean
          /**
           * The amount of time taken to complete the order if different to a normal bastion turn.
           */
          duration?: number
          /**
           * This order is not normally available for execution.
           */
          hidden?: boolean
        }
      }

      namespace Sizes {
        // --- Base Definitions ---
        interface DefaultSizesProperties {
          cramped: true;
          roomy: true;
          vast: true;
        }

        /**
         * Override interface for declaration merging.
         * Add custom sizes properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.Order.Sizes {
         * interface OverrideTypes {
         * customProperty: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultSizesProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;

        interface SizesConfig {
          /**
           * The human-readable name of the size category.
           */
          label: string,
          /**
           * The number of days to build the facility.
           */
          days: number,
          /**
           * The maximum area the facility may occupy in the bastion plan.
           */
          squares: number,
          /**
           * The cost in gold pieces to build the facility.
           */
          value: number
        }
      }

      namespace Types {
        // --- Base Definitions ---
        namespace Basic {
          interface DefaultTypes {
            "bedroom": true,
            "courtyard": true,
            "diningRoom": true,
            "kitchen": true,
            "parlor": true,
            "storage": true
          }

          /**
           * Override interface for declaration merging.
           * Add custom types properties here.
           * @example
           * declare global {
           * namespace dnd5e.types.Order.Types {
           * interface OverrideTypes {
           * customProperty: true
           * }
           * }
           * }
           */
          interface OverrideTypes extends Record<string, boolean | never> { }

          // --- Derived Types ---
          type Types = dnd5e.types.MergeOverrideDefinition<
            DefaultTypes,
            OverrideTypes
          >;
          type TypeKey = dnd5e.types.ExtractKeys<Types>;

        }

        namespace Special {
          interface DefaultTypes {
            "arcaneStudy": true,
            "archive": true,
            "armory": true,
            "barrack": true,
            "demiplane": true,
            "gamingHall": true,
            "garden": true,
            "greenhouse": true,
            "guildhall": true,
            "laboratory": true,
            "library": true,
            "meditationChamber": true,
            "menagerie": true,
            "observatory": true,
            "pub": true,
            "reliquary": true,
            "sacristy": true,
            "sanctuary": true,
            "sanctum": true,
            "scriptorium": true,
            "smithy": true,
            "stable": true,
            "storehouse": true,
            "teleportationCircle": true,
            "theater": true,
            "trainingArea": true,
            "trophyRoom": true,
            "warRoom": true,
            "workshop": true
          }

          /**
           * Override interface for declaration merging.
           * Add custom types properties here.
           * @example
           * declare global {
           * namespace dnd5e.types.Order.Types {
           * interface OverrideTypes {
           * customProperty: true
           * }
           * }
           * }
           */
          interface OverrideTypes extends Record<string, boolean | never> { }

          // --- Derived Types ---
          type Types = dnd5e.types.MergeOverrideDefinition<
            DefaultTypes,
            OverrideTypes
          >;
          type TypeKey = dnd5e.types.ExtractKeys<Types>;

        }

        interface DefaultTypesProperties extends Record<string, string | null | never> {
          basic: Basic.TypeKey;
          special: Special.TypeKey;
        }

        /**
         * Override interface for declaration merging.
         * Add custom types properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.Order.Types {
         * interface OverrideTypes {
         * customProperty: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, string | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultTypesProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;

        interface TypesConfig<Type extends TypeKey> {
          label: string,
          subtypes: Types[Type][]
        }
      }
    }

    namespace ItemTypes {
      interface ItemTypeMap {
        facility: {
          [K in dnd5e.types.Facility.Types.TypeKey]: dnd5e.types.ItemTypes.ItemTypeConfig<dnd5e.types.Facility.Types.Types[K]>
        }
      }
    }
    namespace ItemProperties {
      interface ValidPropertyMap {
        facility: never
      }
    }
    namespace DataModelConfig {
      interface Item {
        facility: typeof FacilityData;
      }
      namespace Item.facility {
        interface OverrideSchema extends foundry.data.fields.DataSchema {

        }
      }
    }

    interface DND5EConfig {
      /**
       * Configuration data for bastion facilities.
       */
      facilities: {
        /**
         * The number of free facilities of a given type awarded
         * at certain character levels.
         */
        advancement: {
          [K in dnd5e.types.Facility.Advancement.TypeKey]: Record<number, number>
        }
        /**
         * Orders that can be issued to a facility.
         */
        orders: {
          [K in dnd5e.types.Facility.Orders.TypeKey]: dnd5e.types.Facility.Orders.OrdersConfig
        }
        /**
         * Facility size categories.
         */
        sizes: {
          [K in dnd5e.types.Facility.Sizes.TypeKey]: dnd5e.types.Facility.Sizes.SizesConfig
        }
        /**
         * Facility types and subtypes.
         */
        types: {
          [K in dnd5e.types.Facility.Types.TypeKey]: dnd5e.types.Facility.Types.TypesConfig<K>
        }
      }
    }
  }
}


export default FacilityData;