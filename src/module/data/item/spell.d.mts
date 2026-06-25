/**
 * Data definition for Spell items.
 *
 * Item subtype mixing `ActivitiesTemplate` + `ItemDescriptionTemplate` (via `ItemDataModel.mixin`)
 * plus spell's own fields. Templates folded via `MergeTemplateSchemas`, own fields merged in
 * `BaseSchema`, and Seam-D overrides folded at the single `Schema`/`Base`/`Derived` point.
 */

import SystemDataModel, { ItemDataModel, ItemDataModelMixin } from "../abstract/system-data-model.mjs";
import type ActivitiesTemplate from "./templates/activities.mjs";
import type ItemDescriptionTemplate from "./templates/item-description.mjs";

declare global {
  namespace dnd5e.types.Item.Spell {
    /** Templates folded by `ItemDataModel.mixin(...)`. */
    type Templates = [
      typeof ActivitiesTemplate,
      typeof ItemDescriptionTemplate,
    ];

    /** Pre-Seam-D source schema: mixed template schemas + spell's own fields. */
    type BaseSchema = dnd5e.types.MergeSchemas<
      SystemDataModel.MergeTemplateSchemas<dnd5e.types.Item.Spell.Templates>,
      {
        ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey | "", { required: true; blank: true }>;
        activation: dnd5e.types.fields.ActivationField;
        duration: dnd5e.types.fields.DurationField;
        level: foundry.data.fields.NumberField<{ required: true; integer: true; initial: 1; min: 0 }>;
        materials: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.StringField<{ required: true }>;
          consumed: foundry.data.fields.BooleanField<{ required: true }>;
          cost: foundry.data.fields.NumberField<{ required: true; initial: 0; min: 0 }>;
          supply: foundry.data.fields.NumberField<{ required: true; initial: 0; min: 0 }>;
        }>;
        method: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Spellcasting.Method.TypeKey | "", { required: true; blank: true; initial: "" }>;
        prepared: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; min: 0; initial: 0 }>;
        properties: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperty.Spell.TypeKey, { required: true; blank: false }>
        >;
        range: dnd5e.types.fields.RangeField;
        school: dnd5e.types.fields.RestrictedStringField<dnd5e.types.SpellSchool.TypeKey | "", { required: true; blank: true }>;
        sourceItem: dnd5e.types.fields.IdentifierField;
        target: dnd5e.types.fields.TargetField;
      }
    >;
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the spell subtype on the interface the funnel reads. */
    interface Item {
      spell: typeof import("./spell.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Item.spell {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

/** The real `ItemDataModel.mixin(...)` base: merged schema + every template's instance methods + statics. */
declare const SpellData_base: ReturnType<
  typeof ItemDataModelMixin<SpellData.Schema, SpellData.Base, SpellData.Derived, dnd5e.types.Item.Spell.Templates>
>;

declare class SpellData extends SpellData_base {
  static override _systemType: "spell";
  static override defineSchema(): SpellData.Schema;

  /** Attack classification of this spell. */
  get attackClassification(): "spell";

  /**
   * The identifier of the spellcasting class associated with this spell, resolved through subclass
   * parentage where necessary. Empty string if not granted by a class or subclass item.
   */
  get classIdentifier(): string;

  /** Abilities that can be used with this spell. */
  get availableAbilities(): Set<dnd5e.types.Ability.TypeKey>;

  /** Whether scaling can be configured for this spell. */
  get canConfigureScaling(): boolean;

  /** Whether the spell can be prepared. */
  get canPrepare(): boolean;

  /** Whether this spell can be cast at a higher level. */
  get canScale(): boolean;

  /** Whether this spell's damage can scale. */
  get canScaleDamage(): boolean;

  /** Properties displayed in chat. */
  get chatProperties(): string[];

  /** Whether this spell counts towards a class' number of prepared spells. */
  get countsPrepared(): boolean;

  /** Default ability key defined for this type. @internal */
  get _typeAbilityMod(): dnd5e.types.Ability.TypeKey;

  /** Value on a d20 die needed to roll a critical hit. */
  get criticalThreshold(): number;

  /** Retrieve a linked activity that granted this spell using the stored `cachedFor` value. */
  get linkedActivity(): dnd5e.types.Activity.Instance | null;

  /** The proficiency multiplier for this item. */
  get proficiencyMultiplier(): number;

  /** Amount by which this spell is scaled. */
  get scalingIncrease(): number | null;

  /** Subtitle displayed in tooltips. */
  get tooltipSubtitle(): string[];
}

declare namespace SpellData {
  /** Source schema with Seam-D `OverrideSchema` folded in (single fold point). */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Item.Spell.BaseSchema,
    dnd5e.types.DataModelConfig.Item.spell.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.Item.spell.OverrideBase>;
  type Derived = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.Item.spell.OverrideDerived>;
}

export default SpellData;
