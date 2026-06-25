/**
 * Data model for an save activity.
 *
 * CANONICAL EXAMPLE (activity WITH derived data): overrides base `effects` (AppliedEffectField gains
 * `onSave`), adds `damage`/`save`, and computes `save.dc.value` + `labels.save` in prepareFinalData.
 * The derived overlay rides the `DerivedData` generic — a top-level `DerivedData.save` key REPLACES
 * the schema's `save`, so it must restate the full initialized `save` shape plus the new `dc.value`
 * (the actor-model Omit/intersect pattern, routed through the TypeDataModel derived generic).
 */

import BaseActivityData from "./base-activity.mjs";

declare global {
  namespace dnd5e.types.Activity.Save {
    type Schema = dnd5e.types.MergeSchemas<
      dnd5e.types.Activity.BaseSchema,
      {
        type: foundry.data.fields.StringField<
          { required: true; blank: false; readOnly: true },
          "save",
          "save",
          "save"
        >;
        damage: foundry.data.fields.SchemaField<{
          // Closed code-level enum (sheet dropdown is hardcoded none/half/full); NOT a CONFIG-driven
          // domain, so this is a literal-union StringField, not an expandable RestrictedStringField.
          /** How much damage is done on a successful save? */
          onSave: foundry.data.fields.StringField<
            { required: true; blank: false; initial: "half" },
            "none" | "half" | "full",
            "none" | "half" | "full",
            "none" | "half" | "full"
          >;
          /** Parts of damage to inflict. */
          parts: foundry.data.fields.ArrayField<dnd5e.types.fields.DamageField>;
        }>;
        // overrides base `effects` (relies on MergeSchemas last-wins).
        /** Linked effects that can be applied. */
        effects: foundry.data.fields.ArrayField<
          dnd5e.types.fields.AppliedEffectField<{
            /** Should this effect still be applied on a successful save? */
            onSave: foundry.data.fields.BooleanField;
          }>
        >;
        save: foundry.data.fields.SchemaField<{
          /** Make the saving throw with one of these abilities. */
          ability: foundry.data.fields.SetField<
            dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey, { required: true; blank: false }>
          >;
          /** Bonus added to all saves made through this activity. */
          bonus: dnd5e.types.fields.FormulaField;
          dc: foundry.data.fields.SchemaField<{
            bonus: dnd5e.types.fields.FormulaField<{ deterministic: true; persisted: false }>;
            /** Method or ability used to calculate the difficulty class. */
            calculation: foundry.data.fields.StringField<{ initial: "initial" }>;
            /** Custom DC formula or flat value. */
            formula: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
          }>;
          /** Should this save be displayed to all players? */
          visible: foundry.data.fields.BooleanField<{ initial: true }>;
        }>;
      }
    >;

    /** prepareFinalData adds `save.dc.value`; `labels.save` rides the base `labels` record. */
    interface Derived extends dnd5e.types.Activity.BaseDerived {
      save: dnd5e.types.PrettifyType<
        Omit<dnd5e.types.InitializedOf<dnd5e.types.Activity.Save.Schema>["save"], "dc"> & {
          dc: dnd5e.types.InitializedOf<dnd5e.types.Activity.Save.Schema>["save"]["dc"] & { value: number };
        }
      >;
    }
  }
}

declare class BaseSaveActivityData extends BaseActivityData<
  dnd5e.types.Activity.Save.Schema,
  fvttUtils.EmptyObject,
  dnd5e.types.Activity.Save.Derived
> {
  static override defineSchema(): dnd5e.types.Activity.Save.Schema;
}

export default BaseSaveActivityData;
