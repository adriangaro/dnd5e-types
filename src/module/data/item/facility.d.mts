/**
 * The data definition for Facility items.
 *
 * Item subtype for bastion facilities. Mixes Activities and ItemDescription templates via
 * `ItemDataModel.mixin(...)` and adds its own building/craft/defenders/trade/etc. fields. Follows
 * the canonical loot pattern: schema composed from mixed templates via
 * `SystemDataModel.MergeTemplateSchemas` + own fields, Seam-D overrides folded at a single point,
 * Seam-C registration on `dnd5e.types.DataModelConfig.Item`. `prepareDerivedData` computes a handful
 * of derived values surfaced via the `Derived` overlay.
 */

import SystemDataModel, { ItemDataModel, ItemDataModelMixin } from "../abstract/system-data-model.mjs";
import type ActivitiesTemplate from "./templates/activities.mjs";
import type ItemDescriptionTemplate from "./templates/item-description.mjs";

declare global {
  namespace dnd5e.types.Item.Facility {
    /** Templates folded by `ItemDataModel.mixin(...)`. */
    type Templates = [
      typeof ActivitiesTemplate,
      typeof ItemDescriptionTemplate,
    ];

    /** Pre-Seam-D source schema: mixed template schemas + facility's own fields. */
    type BaseSchema = dnd5e.types.MergeSchemas<
      SystemDataModel.MergeTemplateSchemas<dnd5e.types.Item.Facility.Templates>,
      {
        building: foundry.data.fields.SchemaField<{
          built: foundry.data.fields.BooleanField<{ required: true }>;
          size: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Facility.Size.TypeKey, { blank: false; nullable: false; required: true }>;
        }>;
        craft: foundry.data.fields.SchemaField<{
          item: foundry.data.fields.DocumentUUIDField<{ type: "Item" }>;
          quantity: foundry.data.fields.NumberField<{ required: true; integer: true; positive: true; nullable: false }>;
        }>;
        defenders: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.ArrayField<foundry.data.fields.DocumentUUIDField<{ type: "Actor" }>>;
          max: foundry.data.fields.NumberField<{ required: true; integer: true; positive: true }>;
        }>;
        disabled: foundry.data.fields.BooleanField<{ required: true }>;
        enlargeable: foundry.data.fields.BooleanField<{ required: true }>;
        free: foundry.data.fields.BooleanField<{ required: true }>;
        hirelings: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.ArrayField<foundry.data.fields.DocumentUUIDField<{ type: "Actor" }>>;
          max: foundry.data.fields.NumberField<{ required: true; integer: true; positive: true }>;
        }>;
        level: foundry.data.fields.NumberField<{ required: true; integer: true; positive: true }>;
        order: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Facility.Order.TypeKey, { required: true }>;
        progress: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.NumberField<{ required: true; integer: true; min: 0; nullable: false }>;
          max: foundry.data.fields.NumberField<{ required: true; integer: true; positive: true }>;
          order: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Facility.Order.TypeKey, { required: true }>;
        }>;
        size: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Facility.Size.TypeKey, { blank: false; nullable: false; required: true }>;
        trade: foundry.data.fields.SchemaField<{
          creatures: foundry.data.fields.SchemaField<{
            value: foundry.data.fields.ArrayField<foundry.data.fields.DocumentUUIDField<{ type: "Actor" }>>;
            max: foundry.data.fields.NumberField<{ required: true; integer: true; positive: true }>;
          }>;
          pending: foundry.data.fields.SchemaField<{
            creatures: foundry.data.fields.ArrayField<foundry.data.fields.DocumentUUIDField<{ type: "Actor" }>>;
            operation: dnd5e.types.fields.RestrictedStringField<"buy" | "sell", { required: true; nullable: true; initial: null }>;
            stocked: foundry.data.fields.BooleanField<{ required: true }>;
            value: foundry.data.fields.NumberField<{ required: true; min: 0; integer: true }>;
          }>;
          profit: foundry.data.fields.NumberField<{ required: true; min: 0; integer: true }>;
          stock: foundry.data.fields.SchemaField<{
            stocked: foundry.data.fields.BooleanField<{ required: true }>;
            value: foundry.data.fields.NumberField<{ required: true; min: 0; integer: true }>;
            max: foundry.data.fields.NumberField<{ required: true; integer: true; positive: true }>;
          }>;
        }>;
        // ItemTypeField({ baseItem: false }) → value + subtype only.
        // value = facility category (Facility.Type: basic/special); subtype is value-coupled.
        type: dnd5e.types.fields.ItemTypeField<{
          value: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Facility.Type.TypeKey | "", { required: true; blank: true }>;
          subtype: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Facility.Subtype.TypeKey | "", { required: true; blank: true }>;
        }>;
      }
    >;
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the facility subtype on the interface the funnel reads. */
    interface Item {
      facility: typeof import("./facility.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Item.facility {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

/** The real `ItemDataModel.mixin(...)` base: merged schema + every template's instance methods + statics. */
declare const FacilityData_base: ReturnType<
  typeof ItemDataModelMixin<FacilityData.Schema, FacilityData.Base, FacilityData.Derived, dnd5e.types.Item.Facility.Templates>
>;

declare class FacilityData extends FacilityData_base {
  static override _systemType: "facility";
  static override defineSchema(): FacilityData.Schema;

  /**
   * Create an ephemeral Order activity.
   * @param id    The static ID string for the order. Will have staticID called on it.
   * @param order The order.
   */
  protected _createOrderActivity(id: string, order: string): void;
}

declare namespace FacilityData {
  /**
   * Derived values computed in `prepareDerivedData`. `type`/`progress` exist in the schema, so a
   * top-level key here REPLACES them — intersect-preserve their initialized shapes and add new keys.
   * `price`/`squares` are NOT in the schema, so they are added outright.
   */
  interface DerivedData {
    /** Resolved label for the facility's type/subtype. */
    type: dnd5e.types.InitializedOf<dnd5e.types.Item.Facility.BaseSchema>["type"] & { label: string };
    /** Computed price for basic facilities. */
    price: { value: number; days: number; denomination: string };
    /** Number of squares occupied based on size. */
    squares: number;
    /** Progress completion percentage. */
    progress: dnd5e.types.InitializedOf<dnd5e.types.Item.Facility.BaseSchema>["progress"] & { pct: number };
  }

  /** Source schema with Seam-D `OverrideSchema` folded in (single fold point). */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Item.Facility.BaseSchema,
    dnd5e.types.DataModelConfig.Item.facility.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.Item.facility.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    FacilityData.DerivedData,
    dnd5e.types.DataModelConfig.Item.facility.OverrideDerived
  >;
}

export default FacilityData;
