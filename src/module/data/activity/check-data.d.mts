/**
 * Data model for a check activity.
 *
 * Adds a top-level `check` field and computes `check.dc.value` in prepareFinalData, so it carries a
 * `DerivedData` overlay (mirrors save-data): the top-level `check` key REPLACES the schema `check`,
 * restating the initialized shape plus the derived `dc.value`.
 */

import BaseActivityData from "./base-activity.mjs";

declare global {
  namespace dnd5e.types.Activity.Check {
    type Schema = dnd5e.types.MergeSchemas<
      dnd5e.types.Activity.BaseSchema,
      {
        type: foundry.data.fields.StringField<
          { required: true; blank: false; readOnly: true },
          "check",
          "check",
          "check"
        >;
        check: foundry.data.fields.SchemaField<{
          ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey | "", { required: true; blank: true }>;
          associated: foundry.data.fields.SetField<
            dnd5e.types.fields.RestrictedStringField<dnd5e.types.Skill.TypeKey | dnd5e.types.Tool.TypeKey, { required: true; blank: false }>
          >;
          bonus: dnd5e.types.fields.FormulaField;
          dc: foundry.data.fields.SchemaField<{
            calculation: foundry.data.fields.StringField;
            formula: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
          }>;
          visible: foundry.data.fields.BooleanField<{ initial: true }>;
        }>;
      }
    >;

    /** prepareFinalData adds `check.dc.value`. */
    interface Derived extends dnd5e.types.Activity.BaseDerived {
      check: dnd5e.types.PrettifyType<
        Omit<dnd5e.types.InitializedOf<dnd5e.types.Activity.Check.Schema>["check"], "dc"> & {
          dc: dnd5e.types.InitializedOf<dnd5e.types.Activity.Check.Schema>["check"]["dc"] & {
            value: number | null;
          };
        }
      >;
    }
  }
}

declare class BaseCheckActivityData extends BaseActivityData<
  dnd5e.types.Activity.Check.Schema,
  fvttUtils.EmptyObject,
  dnd5e.types.Activity.Check.Derived
> {
  static override defineSchema(): dnd5e.types.Activity.Check.Schema;

  /**
   * Get the ability to use with an associated value.
   * @param associated  Skill or tool ID.
   * @returns           Ability to use.
   */
  getAbility(associated: dnd5e.types.Skill.TypeKey | dnd5e.types.Tool.TypeKey): dnd5e.types.Ability.TypeKey | null;
}

export default BaseCheckActivityData;
