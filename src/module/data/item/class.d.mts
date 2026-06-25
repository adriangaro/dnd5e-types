/**
 * Data definition for Class items.
 *
 * Item subtype following the canonical loot pattern. Mixes Advancement, ItemDescription, and
 * StartingEquipment templates via `ItemDataModel.mixin(...)`; carries its own `hd`, `levels`,
 * `primaryAbility`, `properties`, and `spellcasting` fields. `SpellcastingField` (a `SchemaField`
 * subclass) is inlined as its constructed schema. `prepareDerivedData`/`prepareFinalData` compute
 * additional values (tier, hit-dice maxima, spellcasting derived stats), folded via `OverrideDerived`.
 */

import SystemDataModel from "../abstract/system-data-model.mjs";
import ItemDataModel, { ItemDataModelMixin } from "../abstract/item-data-model.mjs";
import type AdvancementTemplate from "./templates/advancement.mjs";
import type ItemDescriptionTemplate from "./templates/item-description.mjs";
import type StartingEquipmentTemplate from "./templates/starting-equipment.mjs";

declare global {
  namespace dnd5e.types.Item.Class {
    /** Templates folded by `ItemDataModel.mixin(...)`. */
    type Templates = [
      typeof AdvancementTemplate,
      typeof ItemDescriptionTemplate,
      typeof StartingEquipmentTemplate,
    ];

    /** Pre-Seam-D source schema: mixed template schemas + class's own fields. */
    type BaseSchema = dnd5e.types.MergeSchemas<
      SystemDataModel.MergeTemplateSchemas<dnd5e.types.Item.Class.Templates>,
      {
        hd: foundry.data.fields.SchemaField<{
          additional: dnd5e.types.fields.FormulaField<{ deterministic: true; required: true }>;
          denomination: dnd5e.types.fields.RestrictedStringField<dnd5e.types.HitDieType.TypeKey, { required: true; initial: "d6"; blank: false }>;
          spent: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; initial: 0; min: 0 }>;
        }>;
        levels: foundry.data.fields.NumberField<{
          required: true;
          nullable: false;
          integer: true;
          min: 0;
          initial: 1;
        }>;
        primaryAbility: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.SetField<
            dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey, { required: true; blank: false }>
          >;
          all: foundry.data.fields.BooleanField<{ initial: true }>;
        }>;
        properties: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperty.Class.TypeKey, { required: true; blank: false }>
        >;
        // SpellcastingField (SchemaField subclass) inlined as its constructed schema.
        spellcasting: foundry.data.fields.SchemaField<{
          progression: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Spellcasting.Progression.TypeKey, { required: true; initial: "none"; blank: false }>;
          ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey | "", { required: true; blank: true }>;
          preparation: foundry.data.fields.SchemaField<{
            formula: dnd5e.types.fields.FormulaField;
          }>;
        }>;
      }
    >;
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the class subtype on the interface the funnel reads. */
    interface Item {
      class: typeof import("./class.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Item.class {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

/** The real `ItemDataModel.mixin(...)` base: merged schema + every template's instance methods + statics. */
declare const ClassData_base: ReturnType<
  typeof ItemDataModelMixin<ClassData.Schema, ClassData.Base, ClassData.Derived, dnd5e.types.Item.Class.Templates>
>;

declare class ClassData extends ClassData_base {
  static override _systemType: "class";
  static override defineSchema(): ClassData.Schema;

  /** Migrate the class's saves & skills into TraitAdvancements. */
  static _migrateTraitAdvancement(source: object): void;
}

declare namespace ClassData {
  /** Source schema with Seam-D `OverrideSchema` folded in (single fold point). */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Item.Class.BaseSchema,
    dnd5e.types.DataModelConfig.Item.class.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.Item.class.OverrideBase>;

  /** Values computed during `prepareDerivedData`/`prepareFinalData`. */
  interface DerivedData {
    /** Whether this is the actor's original (primary) class. */
    isOriginalClass: boolean;
    /** The class's tier, derived from its levels. */
    tier: number;
    // `hd`/`spellcasting` are schema keys, so a top-level entry REPLACES them. `hd.additional` even
    // changes type (formula-string → number), so Omit-then-readd (a plain intersect would yield
    // `never`); other schema keys (denomination/spent, progression/ability, preparation.formula) are
    // preserved.
    hd: Omit<dnd5e.types.InitializedOf<dnd5e.types.Item.Class.BaseSchema>["hd"], "additional"> & {
      /** Additional hit dice resolved from the formula. */
      additional: number;
      /** Maximum number of hit dice. */
      max: number;
      /** Remaining (unspent) hit dice. */
      value: number;
    };
    spellcasting: Omit<
      dnd5e.types.InitializedOf<dnd5e.types.Item.Class.BaseSchema>["spellcasting"],
      "preparation"
    > & {
      preparation: dnd5e.types.InitializedOf<
        dnd5e.types.Item.Class.BaseSchema
      >["spellcasting"]["preparation"] & {
        /** Number of prepared spells. */
        value: number;
        /** Maximum number of prepared spells. */
        max: number;
      };
      /** Spellcasting method (a `CONFIG.DND5E.spellcasting` id) derived from progression. */
      type: dnd5e.types.Spellcasting.Method.TypeKey;
      /** Spell slot configuration for this spellcasting type. */
      slots: unknown;
      /** Spellcaster level. */
      levels: number;
      /** Spell attack bonus. */
      attack: number;
      /** Spell save DC. */
      save: number;
    };
  }

  type Derived = dnd5e.types.MergeData<DerivedData, dnd5e.types.DataModelConfig.Item.class.OverrideDerived>;
}

export default ClassData;
