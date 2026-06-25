/**
 * Field for storing duration data.
 *
 * A `SchemaField` subclass that always injects `{ value, units, special }` and then spreads
 * any caller-provided `fields` over them (last wins). Modeled as a generic over the extra
 * `Fields` schema, composed via `dnd5e.types.MergeSchemas` to mirror the runtime spread.
 *
 * `units` defaults to `"inst"` and is keyed by `dnd5e.types.TimePeriod.TypeKey` via
 * `RestrictedStringField`, covering `CONFIG.DND5E.timePeriods` / `CONFIG.DND5E.scalarTimePeriods`.
 * The `static prepareData`/`getEffectDuration` side-effects are runtime-only and not part of
 * the stored schema.
 */

declare global {
  namespace dnd5e.types.fields {
    type DurationField<
      Fields extends foundry.data.fields.DataSchema = {},
    > = foundry.data.fields.SchemaField<
      dnd5e.types.MergeSchemas<DurationField.BaseSchema, Fields>
    >;

    namespace DurationField {
      interface BaseSchema extends foundry.data.fields.DataSchema {
        value: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
        units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.TimePeriod.TypeKey, { required: true; blank: false; initial: "inst" }>;
        special: foundry.data.fields.StringField;
      }
    }
  }
}

/**
 * Field for storing duration data.
 */
declare class DurationField<
  Fields extends foundry.data.fields.DataSchema = {},
> extends foundry.data.fields.SchemaField<
  dnd5e.types.MergeSchemas<dnd5e.types.fields.DurationField.BaseSchema, Fields>
> {}

export { DurationField };
export {};
