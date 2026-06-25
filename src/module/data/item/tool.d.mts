/**
 * Data definition for Tool items.
 *
 * Follows the canonical item pattern (see loot.d.mts): schema composed from mixed templates via
 * `SystemDataModel.MergeTemplateSchemas` + own fields, Seam-D overrides folded at a single point,
 * Seam-C registration on `dnd5e.types.DataModelConfig.Item`.
 */

import SystemDataModel, { ItemDataModel, ItemDataModelMixin } from "./../abstract/system-data-model.mjs";
import type ActivitiesTemplate from "./templates/activities.mjs";
import type ItemDescriptionTemplate from "./templates/item-description.mjs";
import type IdentifiableTemplate from "./templates/identifiable.mjs";
import type ItemTypeTemplate from "./templates/item-type.mjs";
import type PhysicalItemTemplate from "./templates/physical-item.mjs";
import type EquippableItemTemplate from "./templates/equippable-item.mjs";

declare global {
  namespace dnd5e.types.Item.Tool {
    /** Templates folded by `ItemDataModel.mixin(...)`. */
    type Templates = [
      typeof ActivitiesTemplate,
      typeof ItemDescriptionTemplate,
      typeof IdentifiableTemplate,
      typeof ItemTypeTemplate,
      typeof PhysicalItemTemplate,
      typeof EquippableItemTemplate,
    ];

    /** Pre-Seam-D source schema: mixed template schemas + tool's own fields. */
    type BaseSchema = dnd5e.types.MergeSchemas<
      SystemDataModel.MergeTemplateSchemas<dnd5e.types.Item.Tool.Templates>,
      {
        ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey | "", { required: true; blank: true }>;
        bonus: dnd5e.types.fields.FormulaField;
        chatFlavor: foundry.data.fields.StringField<{ required: true }>;
        proficient: foundry.data.fields.NumberField<{ required: true; initial: null; min: 0; max: 2; step: 0.5 }>;
        properties: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperty.Tool.TypeKey, { required: true; blank: false }>
        >;
        // ItemTypeField({ subtype: false }) → value + baseItem only.
        // value = tool category (ToolType), baseItem = specific tool id (Tool).
        type: dnd5e.types.fields.ItemTypeField<{
          value: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ToolType.TypeKey | "", { required: true; blank: true }>;
          baseItem: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Tool.TypeKey | "", { required: true; blank: true }>;
        }>;
      }
    >;
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the tool subtype on the interface the funnel reads. */
    interface Item {
      tool: typeof import("./tool.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Item.tool {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

/** The real `ItemDataModel.mixin(...)` base: merged schema + every template's instance methods + statics. */
declare const ToolData_base: ReturnType<
  typeof ItemDataModelMixin<ToolData.Schema, ToolData.Base, ToolData.Derived, dnd5e.types.Item.Tool.Templates>
>;

declare class ToolData extends ToolData_base {
  static override _systemType: "tool";
  static override defineSchema(): ToolData.Schema;

  /** Properties displayed in chat. */
  get chatProperties(): string[];

  /** Properties displayed on the item card. */
  get cardProperties(): string[];

  /**
   * Which ability score modifier is used by this item?
   * @type {string|null}
   */
  get abilityMod(): dnd5e.types.Ability.TypeKey;

  /** The proficiency multiplier for this item. */
  get proficiencyMultiplier(): number;
}

declare namespace ToolData {
  /** Source schema with Seam-D `OverrideSchema` folded in (single fold point). */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Item.Tool.BaseSchema,
    dnd5e.types.DataModelConfig.Item.tool.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.Item.tool.OverrideBase>;

  /**
   * Derived overlay: `prepareDerivedData` augments the `type` object with `label`/`identifier`.
   * A top-level `type` key in DerivedData REPLACES the schema `type`, so intersect-preserve the
   * initialized schema shape (value/baseItem) and add the derived keys.
   */
  interface DerivedDefault {
    type: dnd5e.types.InitializedOf<ToolData.Schema>["type"] & {
      label: string;
      identifier: string;
    };
  }
  type Derived = dnd5e.types.MergeData<DerivedDefault, dnd5e.types.DataModelConfig.Item.tool.OverrideDerived>;
}

export default ToolData;
