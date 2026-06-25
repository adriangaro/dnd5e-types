/**
 * Field for storing an active effects applied by an activity.
 *
 * The constructor merges extra fields (e.g. the save activity adds `onSave`) via the `<Fields>`
 * generic.  The `initialize()` override attaches an `effect` getter onto the produced object that
 * resolves to the parent item's `ActiveEffect` with the matching `_id`, so the initialized type
 * exposes `{ effect?: ActiveEffect.Implementation }` in addition to the schema data.
 */

/** Field for storing an active effects applied by an activity. */
declare class AppliedEffectField<
  Fields extends foundry.data.fields.DataSchema = {},
> extends foundry.data.fields.SchemaField<
  dnd5e.types.MergeSchemas<dnd5e.types.fields.AppliedEffectField.BaseSchema, Fields>
> {
  constructor(fields?: Fields, options?: foundry.data.fields.SchemaField.Options<
    dnd5e.types.MergeSchemas<dnd5e.types.fields.AppliedEffectField.BaseSchema, Fields>
  >);

}

declare global {
  namespace dnd5e.types.fields {
    /**
     * The type alias form — resolves to the `SchemaField` holding the merged schema.
     * Use this in data schemas that embed an applied-effect array element; access the
     * enriched initialized shape via {@link AppliedEffectField.InitializedData}.
     */
    type AppliedEffectField<Fields extends foundry.data.fields.DataSchema = {}> =
      foundry.data.fields.SchemaField<
        dnd5e.types.MergeSchemas<dnd5e.types.fields.AppliedEffectField.BaseSchema, Fields>
      >;

    namespace AppliedEffectField {
      interface BaseSchema extends foundry.data.fields.DataSchema {
        _id: foundry.data.fields.DocumentIdField;
        level: foundry.data.fields.SchemaField<{
          min: foundry.data.fields.NumberField<{ min: 0; integer: true }>;
          max: foundry.data.fields.NumberField<{ min: 0; integer: true }>;
        }>;
      }

      /**
       * The initialized data produced by `AppliedEffectField#initialize`, including the virtual
       * `effect` getter that resolves to the parent item's matching `ActiveEffect`.
       */
      type InitializedData<Fields extends foundry.data.fields.DataSchema = {}> =
        foundry.data.fields.SchemaField.InitializedData<
          dnd5e.types.MergeSchemas<dnd5e.types.fields.AppliedEffectField.BaseSchema, Fields>
        > & { effect?: globalThis.ActiveEffect.Implementation };
    }
  }
}

export { AppliedEffectField };
export {};
