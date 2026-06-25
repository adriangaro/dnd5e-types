/**
 * Field for storing activation data.
 *
 * A `SchemaField` subclass that always injects `{ type, value, condition }` and then spreads
 * any caller-provided `fields` over them (last wins). Modeled as a generic over the extra
 * `Fields` schema, composed via `dnd5e.types.MergeSchemas` to mirror the runtime spread.
 *
 * `type` defaults to `"action"` and is keyed by `dnd5e.types.ActivityActivationType.TypeKey`,
 * covering `CONFIG.DND5E.activityActivationTypes`.
 * The `static prepareData` side-effects (`scalar`/`labels`) are runtime-only and not part of
 * the stored schema, so they are not mirrored here.
 */

declare global {
  namespace dnd5e.types.fields {
    type ActivationField<
      Fields extends foundry.data.fields.DataSchema = {},
    > = foundry.data.fields.SchemaField<
      dnd5e.types.MergeSchemas<ActivationField.BaseSchema, Fields>
    >;

    namespace ActivationField {
      interface BaseSchema extends foundry.data.fields.DataSchema {
        type: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActivityActivationType.TypeKey | "", { initial: "action" }>;
        value: foundry.data.fields.NumberField<{ min: 0; integer: true }>;
        condition: foundry.data.fields.StringField;
      }
    }
  }
}

/**
 * Field for storing activation data.
 */
declare class ActivationField<
  Fields extends foundry.data.fields.DataSchema = {},
> extends foundry.data.fields.SchemaField<
  dnd5e.types.MergeSchemas<dnd5e.types.fields.ActivationField.BaseSchema, Fields>
> {}

export { ActivationField };
export {};
