/**
 * Data model for a transform activity.
 *
 * Adds the `profiles` array, an embedded `settings` (TransformationSetting) model, and the
 * `transform` config SchemaField. `applicableEffects` is overridden to `null` and
 * `prepareFinalData` only (re)assigns the existing `settings` field, so no DerivedData overlay
 * is required (the new value rides the schema-declared `settings` key).
 */

import BaseActivityData from "./base-activity.mjs";

declare global {
  namespace dnd5e.types.Activity.Transform {
    /** Embedded TransformationSetting model schema (shared with `data/settings/transformation-setting.mjs`). */
    type SettingSchema = dnd5e.types.Settings.Transformation.Schema;

    type Schema = dnd5e.types.MergeSchemas<
      dnd5e.types.Activity.BaseSchema,
      {
        type: foundry.data.fields.StringField<
          { required: true; blank: false; readOnly: true },
          "transform",
          "transform",
          "transform"
        >;
        profiles: foundry.data.fields.ArrayField<
          foundry.data.fields.SchemaField<{
            _id: foundry.data.fields.DocumentIdField;
            cr: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
            level: foundry.data.fields.SchemaField<{
              min: foundry.data.fields.NumberField<{ integer: true; min: 0 }>;
              max: foundry.data.fields.NumberField<{ integer: true; min: 0 }>;
            }>;
            movement: foundry.data.fields.SetField<
              dnd5e.types.fields.RestrictedStringField<dnd5e.types.Movement.TypeKey, { required: true; blank: false }>
            >;
            name: foundry.data.fields.StringField;
            sizes: foundry.data.fields.SetField<
              dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActorSize.TypeKey, { required: true; blank: false }>
            >;
            types: foundry.data.fields.SetField<
              dnd5e.types.fields.RestrictedStringField<dnd5e.types.Creature.TypeKey, { required: true; blank: false }>
            >;
            uuid: foundry.data.fields.DocumentUUIDField<{ type: "Actor" }>;
          }>
        >;
        settings: foundry.data.fields.EmbeddedDataField<
          typeof import("../settings/transformation-setting.mjs").default,
          { nullable: true; initial: null }
        >;
        transform: foundry.data.fields.SchemaField<{
          customize: foundry.data.fields.BooleanField;
          mode: dnd5e.types.fields.RestrictedStringField<"" | "cr", { initial: "cr"; blank: true }>;
          preset: foundry.data.fields.StringField;
        }>;
      }
    >;
  }
}

/**
 * Data model for a transform activity.
 */
declare class BaseTransformActivityData extends BaseActivityData<dnd5e.types.Activity.Transform.Schema> {
  static override defineSchema(): dnd5e.types.Activity.Transform.Schema;

  override get applicableEffects(): null;

  /**
   * Transform profiles that can be performed based on spell/character/class level.
   * @type {dnd5e.types.data.activity.TransformProfile[]}
   */
  get availableProfiles(): dnd5e.types.data.activity.TransformProfile[];
}

export default BaseTransformActivityData;
