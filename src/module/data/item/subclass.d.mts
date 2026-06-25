/**
 * Data definition for Subclass items.
 *
 * Item subtype mixing {@link AdvancementTemplate} + {@link ItemDescriptionTemplate} and adding its own
 * `classIdentifier` (IdentifierField) and `spellcasting` (SpellcastingField → an inline SchemaField, as
 * SpellcastingField has no dedicated shim). Follows the canonical loot.d.mts structure exactly.
 */

import SystemDataModel, { ItemDataModel, ItemDataModelMixin } from "./../abstract/system-data-model.mjs";
import type AdvancementTemplate from "./templates/advancement.mjs";
import type ItemDescriptionTemplate from "./templates/item-description.mjs";

declare global {
  namespace dnd5e.types.Item.Subclass {
    /** Templates folded by `ItemDataModel.mixin(...)`. */
    type Templates = [
      typeof AdvancementTemplate,
      typeof ItemDescriptionTemplate,
    ];

    /** Pre-Seam-D source schema: mixed template schemas + subclass's own fields. */
    type BaseSchema = dnd5e.types.MergeSchemas<
      SystemDataModel.MergeTemplateSchemas<dnd5e.types.Item.Subclass.Templates>,
      {
        classIdentifier: dnd5e.types.fields.IdentifierField<{ required: true }>;
        // SpellcastingField() — an inline SchemaField (no dedicated shim).
        spellcasting: foundry.data.fields.SchemaField<{
          progression: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Spellcasting.Progression.TypeKey, { required: true; initial: "none"; blank: false }>;
          ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey | "", { required: false; blank: true }>;
          preparation: foundry.data.fields.SchemaField<{
            formula: dnd5e.types.fields.FormulaField;
          }>;
        }>;
      }
    >;
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the subclass subtype on the interface the funnel reads. */
    interface Item {
      subclass: typeof import("./subclass.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Item.subclass {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

/** The real `ItemDataModel.mixin(...)` base: merged schema + every template's instance methods + statics. */
declare const SubclassData_base: ReturnType<
  typeof ItemDataModelMixin<SubclassData.Schema, SubclassData.Base, SubclassData.Derived, dnd5e.types.Item.Subclass.Templates>
>;

declare class SubclassData extends SubclassData_base {
  static override _systemType: "subclass";
  static override defineSchema(): SubclassData.Schema;

  get tooltipSubtitle(): string[];
}

declare namespace SubclassData {
  /** Source schema with Seam-D `OverrideSchema` folded in (single fold point). */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Item.Subclass.BaseSchema,
    dnd5e.types.DataModelConfig.Item.subclass.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.Item.subclass.OverrideBase>;

  /** Values computed during `prepareBaseData`/`prepareFinalData` via `SpellcastingField.prepareData`. */
  interface DerivedData {
    spellcasting: Omit<
      dnd5e.types.InitializedOf<dnd5e.types.Item.Subclass.BaseSchema>["spellcasting"],
      "preparation"
    > & {
      preparation: dnd5e.types.InitializedOf<
        dnd5e.types.Item.Subclass.BaseSchema
      >["spellcasting"]["preparation"] & {
        /** Number of prepared spells (set to 0 in `prepareBaseData`). */
        value: number;
        /** Maximum number of prepared spells (resolved from formula in `prepareFinalData`). */
        max: number;
      };
      /** Spellcasting method (a `CONFIG.DND5E.spellcasting` id) derived from progression. */
      type: dnd5e.types.Spellcasting.Method.TypeKey;
      /** Spell slot configuration for this spellcasting type. */
      slots: unknown;
      /** Spellcaster level (falls back to parent class's levels when actor is present). */
      levels: number;
      /** Spell attack bonus. */
      attack: number;
      /** Spell save DC. */
      save: number;
    };
  }

  type Derived = dnd5e.types.MergeData<DerivedData, dnd5e.types.DataModelConfig.Item.subclass.OverrideDerived>;
}

export default SubclassData;
