/**
 * Data definition for Consumable items.
 *
 * Structured like the canonical {@link LootData}: schema composed from mixed template schemas via
 * `SystemDataModel.MergeTemplateSchemas` (NOT `MixedSchema`, which re-enters `Item.system` and
 * cycles) plus consumable's own fields, with the Seam-D `Override*` interfaces folded at the single
 * `Schema`/`Base`/`Derived` point and Seam-C registration on `dnd5e.types.DataModelConfig.Item`.
 */

import SystemDataModel from "../abstract/system-data-model.mjs";
import ItemDataModel, { ItemDataModelMixin } from "../abstract/item-data-model.mjs";
import type ActivitiesTemplate from "./templates/activities.mjs";
import type ItemDescriptionTemplate from "./templates/item-description.mjs";
import type IdentifiableTemplate from "./templates/identifiable.mjs";
import type ItemTypeTemplate from "./templates/item-type.mjs";
import type PhysicalItemTemplate from "./templates/physical-item.mjs";
import type EquippableItemTemplate from "./templates/equippable-item.mjs";
import type InventoryElement from "../../applications/components/inventory.mjs";

declare global {
  namespace dnd5e.types.Item.Consumable {
    /** Templates folded by `ItemDataModel.mixin(...)`. */
    type Templates = [
      typeof ActivitiesTemplate,
      typeof ItemDescriptionTemplate,
      typeof IdentifiableTemplate,
      typeof ItemTypeTemplate,
      typeof PhysicalItemTemplate,
      typeof EquippableItemTemplate,
    ];

    /** Pre-Seam-D source schema: mixed template schemas + consumable's own fields. */
    type BaseSchema = dnd5e.types.MergeSchemas<
      SystemDataModel.MergeTemplateSchemas<dnd5e.types.Item.Consumable.Templates>,
      {
        damage: foundry.data.fields.SchemaField<{
          base: dnd5e.types.fields.DamageField;
          bonus: dnd5e.types.fields.FormulaField;
          replace: foundry.data.fields.BooleanField;
        }>;
        magicalBonus: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
        properties: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperty.Consumable.TypeKey, { required: true; blank: false }>
        >;
        // ItemTypeField({ baseItem: false }) → value + subtype only.
        // value = consumable category (ConsumableType); subtype is value-coupled (see ConsumableType.Config.subtypes).
        type: dnd5e.types.fields.ItemTypeField<{
          value: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ConsumableType.TypeKey | "", { required: true; blank: true }>;
          subtype: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ConsumableType.Subtype.TypeKey | "", { required: true; blank: true }>;
        }>;
        // UsesField with the constructor-injected `autoDestroy` field merged in.
        uses: foundry.data.fields.SchemaField<
          dnd5e.types.MergeSchemas<
            dnd5e.types.fields.UsesField.Schema,
            { autoDestroy: foundry.data.fields.BooleanField<{ required: true }> }
          >
        >;
      }
    >;
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the consumable subtype on the interface the funnel reads. */
    interface Item {
      consumable: typeof import("./consumable.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Item.consumable {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

/** The real `ItemDataModel.mixin(...)` base: merged schema + every template's instance methods + statics. */
declare const ConsumableData_base: ReturnType<
  typeof ItemDataModelMixin<ConsumableData.Schema, ConsumableData.Base, ConsumableData.Derived, dnd5e.types.Item.Consumable.Templates>
>;

declare class ConsumableData extends ConsumableData_base {
  static override _systemType: "consumable";
  static override defineSchema(): ConsumableData.Schema;

  /**
   * Default configuration for this item type's inventory section.
   * @returns {InventorySectionDescriptor}
   */
  static get inventorySection(): InventoryElement.InventorySectionDescriptor;

  /** Properties displayed in chat. */
  get chatProperties(): string[];

  /** The proficiency multiplier for this item. */
  get proficiencyMultiplier(): number;

  /** Does this item have base damage in `damage.base` to offer to an activity? */
  get offersBaseDamage(): boolean;
}

declare namespace ConsumableData {
  /** Source schema with Seam-D `OverrideSchema` folded in (single fold point). */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Item.Consumable.BaseSchema,
    dnd5e.types.DataModelConfig.Item.consumable.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.Item.consumable.OverrideBase>;

  /**
   * Derived overlay: `prepareDerivedData` augments the `type` object with `label`.
   * A top-level `type` key in DerivedData REPLACES the schema `type`, so intersect-preserve the
   * initialized schema shape and add the derived key.
   */
  interface DerivedDefault {
    type: dnd5e.types.InitializedOf<ConsumableData.Schema>["type"] & {
      /** Localized consumable type/subtype label, set in `prepareDerivedData`. */
      label: string;
    };
  }
  type Derived = dnd5e.types.MergeData<DerivedDefault, dnd5e.types.DataModelConfig.Item.consumable.OverrideDerived>;
}

export default ConsumableData;
