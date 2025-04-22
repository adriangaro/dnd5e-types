import type { ItemDataModel } from "../abstract.mjs"
import type BaseActivityData from "../activity/base-activity.mjs"

declare class TargetField<
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends TargetField.Options<
    Schema
  > = TargetField.DefaultOptions,
  const AssignmentType = TargetField.AssignmentType<
    Schema, Options
  >,
  const InitializedType = TargetField.InitializedType<
    Schema, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = TargetField.PersistedType<
    Schema, Options
  >
> extends foundry.data.fields.SchemaField<
  TargetField.GetSchema<Schema>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)

  static prepareData(this: BaseActivityData | ItemDataModel, rollData: object, labels?: object): void
  static templateDimensions(type: string): { size: string, width?: string, height?: string }
}

declare namespace TargetField {
  type BaseFields = {
    template: foundry.data.fields.SchemaField<{
      count: dnd5e.dataModels.fields.FormulaField<{ deterministic: true }>,
      contiguous: foundry.data.fields.BooleanField,
      type: foundry.data.fields.StringField,
      size: dnd5e.dataModels.fields.FormulaField<{ deterministic: true }>,
      width: dnd5e.dataModels.fields.FormulaField<{ deterministic: true }>,
      height: dnd5e.dataModels.fields.FormulaField<{ deterministic: true }>,
      units: foundry.data.fields.StringField
    }>,
    affects: foundry.data.fields.SchemaField<{
      count: dnd5e.dataModels.fields.FormulaField<{ deterministic: true }>,
      type: foundry.data.fields.StringField,
      choice: foundry.data.fields.BooleanField,
      special: foundry.data.fields.StringField
    }>,
  }

  type GetSchema<
    Fields extends foundry.data.fields.DataSchema,
  > = fvttUtils.SimpleMerge<
    BaseFields,
    Fields
  >

  type Options<
    Fields extends foundry.data.fields.DataSchema,
  > = foundry.data.fields.SchemaField.Options<
    GetSchema<Fields>
  >

  export import DefaultOptions = foundry.data.fields.SchemaField.DefaultOptions

  type AssignmentType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.AssignmentType<
    GetSchema<Fields>,
    Opts
  >

  type InitializedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = fvttUtils.Merge<
    foundry.data.fields.SchemaField.Internal.InitializedType<
      GetSchema<Fields>, Opts
    >,
    {
      template: {
        dimensions: ReturnType<typeof TargetField['templateDimensions']>
      },
      affects: {
        scaler: boolean
      }
    }
  >

  type PersistedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.PersistedType<
    GetSchema<Fields>,
    Opts
  >
}

export default TargetField