/**
 * Data definition for Feature items.
 *
 * Mixes Activities, Advancement, ItemDescription, and ItemType templates plus feature-specific
 * fields (prerequisites, enchant, cover, etc.). Follows the canonical item pattern (see loot.d.mts).
 */

import SystemDataModel, { ItemDataModel, ItemDataModelMixin } from "../abstract/system-data-model.mjs";
import type ActivitiesTemplate from "./templates/activities.mjs";
import type AdvancementTemplate from "./templates/advancement.mjs";
import type ItemDescriptionTemplate from "./templates/item-description.mjs";
import type ItemTypeTemplate from "./templates/item-type.mjs";

declare global {
  namespace dnd5e.types.Item.Feat {
    /** Templates folded by `ItemDataModel.mixin(...)`. */
    type Templates = [
      typeof ActivitiesTemplate,
      typeof AdvancementTemplate,
      typeof ItemDescriptionTemplate,
      typeof ItemTypeTemplate,
    ];

    /** Pre-Seam-D source schema: mixed template schemas + feat's own fields. */
    type BaseSchema = dnd5e.types.MergeSchemas<
      SystemDataModel.MergeTemplateSchemas<dnd5e.types.Item.Feat.Templates>,
      {
        cover: foundry.data.fields.NumberField<{ min: 0; max: 1 }>;
        crewed: foundry.data.fields.BooleanField;
        enchant: foundry.data.fields.SchemaField<{
          max: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
          period: foundry.data.fields.StringField;
        }>;
        prerequisites: foundry.data.fields.SchemaField<{
          items: foundry.data.fields.SetField<dnd5e.types.fields.IdentifierField>;
          level: foundry.data.fields.NumberField<{ integer: true; min: 0 }>;
          repeatable: foundry.data.fields.BooleanField;
        }>;
        properties: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperty.Feat.TypeKey, { required: true; blank: false }>
        >;
        requirements: foundry.data.fields.StringField<{ required: true; nullable: true }>;
        // ItemTypeField({ baseItem: false }) → value + subtype only.
        // value = feature category (FeatureType); subtype is value-coupled (see FeatureType.Config.subtypes).
        type: dnd5e.types.fields.ItemTypeField<{
          value: dnd5e.types.fields.RestrictedStringField<dnd5e.types.FeatureType.TypeKey | "", { required: true; blank: true }>;
          subtype: dnd5e.types.fields.RestrictedStringField<dnd5e.types.FeatureType.Subtype.TypeKey | "", { required: true; blank: true }>;
        }>;
      }
    >;
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the feat subtype on the interface the funnel reads. */
    interface Item {
      feat: typeof import("./feat.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Item.feat {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

/** The real `ItemDataModel.mixin(...)` base: merged schema + every template's instance methods + statics. */
declare const FeatData_base: ReturnType<
  typeof ItemDataModelMixin<FeatData.Schema, FeatData.Base, FeatData.Derived, dnd5e.types.Item.Feat.Templates>
>;

declare class FeatData extends FeatData_base {
  static override _systemType: "feat";
  static override defineSchema(): FeatData.Schema;

  /** @override Whether this feature's advancement is linked to a class. */
  get advancementClassLinked(): boolean;

  /** Properties displayed in chat. */
  get chatProperties(): string[];

  /** Properties displayed on the item card. */
  get cardProperties(): string[];

  /**
   * Does this feature represent a group of individual enchantments (e.g. the "Infuse Item" feature stores data about
   * all of the character's infusions).
   */
  get isEnchantmentSource(): boolean;

  /** The proficiency multiplier for this item. */
  get proficiencyMultiplier(): number;

  /**
   * Validate the prerequisites specified on this item.
   * @returns True if the item is valid or a list of invalid descriptions if validation failed.
   */
  validatePrerequisites(
    actor: globalThis.Actor.Implementation,
    options?: {
      added?: globalThis.Item.Implementation[];
      level?: number;
      removed?: globalThis.Item.Implementation[];
      showMessage?: boolean;
      throwError?: boolean;
    },
  ): true | string[];
}

declare namespace FeatData {
  /** Source schema with Seam-D `OverrideSchema` folded in (single fold point). */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Item.Feat.BaseSchema,
    dnd5e.types.DataModelConfig.Item.feat.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.Item.feat.OverrideBase>;

  /**
   * Derived overlay: `prepareDerivedData` augments the `type` object with `label`.
   * A top-level `type` key in DerivedData REPLACES the schema `type`, so intersect-preserve the
   * initialized schema shape and add the derived key.
   */
  interface DerivedDefault {
    type: dnd5e.types.InitializedOf<FeatData.Schema>["type"] & {
      label: string | null;
    };
  }
  type Derived = dnd5e.types.MergeData<DerivedDefault, dnd5e.types.DataModelConfig.Item.feat.OverrideDerived>;
}

export default FeatData;
