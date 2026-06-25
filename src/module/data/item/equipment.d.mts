/**
 * Data definition for Equipment items.
 *
 * Item subtype following the canonical loot pattern. Mixes Activities, ItemDescription,
 * Identifiable, ItemType, PhysicalItem, EquippableItem, and Mountable templates via
 * `ItemDataModel.mixin(...)`, plus its own `armor`/`proficient`/`properties`/`strength`/`type`
 * fields. `prepareBaseData`/`prepareDerivedData` compute the derived overlays below.
 */

import SystemDataModel, { ItemDataModel, ItemDataModelMixin } from "./../abstract/system-data-model.mjs";
import type ActivitiesTemplate from "./templates/activities.mjs";
import type ItemDescriptionTemplate from "./templates/item-description.mjs";
import type IdentifiableTemplate from "./templates/identifiable.mjs";
import type ItemTypeTemplate from "./templates/item-type.mjs";
import type PhysicalItemTemplate from "./templates/physical-item.mjs";
import type EquippableItemTemplate from "./templates/equippable-item.mjs";
import type MountableTemplate from "./templates/mountable.mjs";

declare global {
  namespace dnd5e.types.Item.Equipment {
    /** Templates folded by `ItemDataModel.mixin(...)`. */
    type Templates = [
      typeof ActivitiesTemplate,
      typeof ItemDescriptionTemplate,
      typeof IdentifiableTemplate,
      typeof ItemTypeTemplate,
      typeof PhysicalItemTemplate,
      typeof EquippableItemTemplate,
      typeof MountableTemplate,
    ];

    /** Pre-Seam-D source schema: mixed template schemas + equipment's own fields. */
    type BaseSchema = dnd5e.types.MergeSchemas<
      SystemDataModel.MergeTemplateSchemas<dnd5e.types.Item.Equipment.Templates>,
      {
        armor: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.NumberField<{ required: true; integer: true; min: 0 }>;
          magicalBonus: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
          dex: foundry.data.fields.NumberField<{ required: true; integer: true }>;
        }>;
        proficient: foundry.data.fields.NumberField<{
          required: true;
          min: 0;
          max: 1;
          integer: true;
          initial: null;
        }>;
        properties: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperty.Equipment.TypeKey, { required: true; blank: false }>
        >;
        strength: foundry.data.fields.NumberField<{ required: true; integer: true; min: 0 }>;
        // ItemTypeField({ subtype: false }) → value + baseItem only.
        // value = armor/equipment category (EquipmentType: armor classes + misc), baseItem = base armor (ArmorId).
        type: dnd5e.types.fields.ItemTypeField<{
          value: dnd5e.types.fields.RestrictedStringField<dnd5e.types.EquipmentType.TypeKey | "", { required: true; blank: true }>;
          baseItem: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ArmorId.TypeKey | "", { required: true; blank: true }>;
        }>;
      }
    >;

    /**
     * Derived overlay computed by `prepareBaseData`/`prepareDerivedData`. Top-level keys REPLACE the
     * same-named schema keys, so intersect-preserve the initialized schema shapes and add the new keys.
     */
    interface DerivedData {
      armor: dnd5e.types.InitializedOf<dnd5e.types.Item.Equipment.BaseSchema>["armor"] & {
        /** Base armor value, set from `_source.armor.value` in `prepareBaseData`. */
        base: number;
      };
      type: dnd5e.types.InitializedOf<dnd5e.types.Item.Equipment.BaseSchema>["type"] & {
        /** Localized equipment type label. */
        label: string;
        /** Resolved armor/shield identifier for the configured `baseItem`. */
        identifier: string | undefined;
      };
    }
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the equipment subtype on the interface the funnel reads. */
    interface Item {
      equipment: typeof import("./equipment.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Item.equipment {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

/** The real `ItemDataModel.mixin(...)` base: merged schema + every template's instance methods + statics. */
declare const EquipmentData_base: ReturnType<
  typeof ItemDataModelMixin<EquipmentData.Schema, EquipmentData.Base, EquipmentData.Derived, dnd5e.types.Item.Equipment.Templates>
>;

declare class EquipmentData extends EquipmentData_base {
  static override _systemType: "equipment";
  static override defineSchema(): EquipmentData.Schema;

  /** Default configuration for this item type's inventory section. */
  static get inventorySection(): Record<string, unknown>;

  /** Properties displayed in chat. */
  get chatProperties(): string[];

  /** Properties displayed on the item card. */
  get cardProperties(): string[];

  /** Is this Item any of the armor subtypes? */
  get isArmor(): boolean;

  /**
   * Is this item a separate large object like a siege engine or vehicle component that is
   * usually mounted on fixtures rather than equipped, and has its own AC and HP?
   */
  get isMountable(): boolean;

  /** The proficiency multiplier for this item. */
  get proficiencyMultiplier(): number;

  /**
   * Migrates stealth disadvantage boolean to properties.
   * @param source - The candidate source data from which the model will be constructed.
   */
  static _migrateStealth(source: fvttUtils.AnyObject): void;
}

declare namespace EquipmentData {
  /** Source schema with Seam-D `OverrideSchema` folded in (single fold point). */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Item.Equipment.BaseSchema,
    dnd5e.types.DataModelConfig.Item.equipment.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.Item.equipment.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    dnd5e.types.Item.Equipment.DerivedData,
    dnd5e.types.DataModelConfig.Item.equipment.OverrideDerived
  >;
}

export default EquipmentData;
