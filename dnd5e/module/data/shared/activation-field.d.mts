import { ItemDataModel } from "../abstract.mjs"
import type BaseActivityData from "../activity/base-activity.mjs"



declare class ActivationField<
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends ActivationField.Options<
    Schema
  > = ActivationField.DefaultOptions,
  const AssignmentType = ActivationField.AssignmentType<
    Schema, Options
  >,
  const InitializedType = ActivationField.InitializedType<
    Schema, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = ActivationField.PersistedType<
    Schema, Options
  >
> extends foundry.data.fields.SchemaField<
  ActivationField.GetSchema<Schema>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)

  static prepareData(this: BaseActivityData | ItemDataModel, rollData: object, labels?: object): void
}

declare namespace ActivationField {
  type BaseFields = {
    type: foundry.data.fields.StringField<{
      initial: 'action'
    }>,
    value: foundry.data.fields.NumberField,
    condition: foundry.data.fields.StringField
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
      scaler: boolean
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

export default ActivationField