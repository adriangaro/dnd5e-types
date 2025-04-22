import type { ItemDataModel } from "../abstract.mjs"
import type BaseActivityData from "../activity/base-activity.mjs"


declare class DurationField<
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends DurationField.Options<
    Schema
  > = DurationField.DefaultOptions,
  const AssignmentType = DurationField.AssignmentType<
    Schema, Options
  >,
  const InitializedType = DurationField.InitializedType<
    Schema, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = DurationField.PersistedType<
    Schema, Options
  >
> extends foundry.data.fields.SchemaField<
  DurationField.GetSchema<Schema>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)

  static prepareData(this: BaseActivityData | ItemDataModel, rollData: object, labels?: object): void
  static getEffectDuration(this: DurationField.InitializedType<{}>): ActiveEffect.DurationData
}

declare namespace DurationField {
  type BaseFields = {
    value: dnd5e.dataModels.fields.FormulaField<{
      deterministic: true
    }>
    units: foundry.data.fields.StringField<{
      initial: 'inst'
    }>,
    special: foundry.data.fields.StringField
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
    foundry.data.fields.SchemaField.Internal.InitializedType<GetSchema<Fields>, Opts>,
    {
      scalar: boolean
      getEffectData(): ActiveEffect.DurationData
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

export default DurationField