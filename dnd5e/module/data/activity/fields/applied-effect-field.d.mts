

declare class AppliedEffectField<
  Schema extends foundry.data.fields.DataSchema = {},
  SubType extends ActiveEffect.SubType = ActiveEffect.SubType,
  const Options extends AppliedEffectField.Options<
    Schema
  > = AppliedEffectField.DefaultOptions,
  const AssignmentType = AppliedEffectField.AssignmentType<
    Schema, Options
  >,
  const InitializedType = AppliedEffectField.InitializedType<
    Schema, SubType, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = AppliedEffectField.PersistedType<
    Schema, Options
    >
> extends foundry.data.fields.SchemaField<
  AppliedEffectField.GetSchema<Schema>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)
}



declare namespace AppliedEffectField {
  type BaseFields = {
    _id: foundry.data.fields.DocumentIdField<{
      required: true,
      nullable: true
    }>
  }
 type GetSchema<
    Fields extends foundry.data.fields.DataSchema,
  > = fvttUtils.SimpleMerge<
    BaseFields,
    Fields
  >

  type Options<
    Fields extends foundry.data.fields.DataSchema,
  > = fvttUtils.SimpleMerge<
    foundry.data.fields.SchemaField.Options<
      GetSchema<Fields>
    >,
    {
    }
  >;

  type DefaultOptions = fvttUtils.SimpleMerge<
    foundry.data.fields.SchemaField.DefaultOptions,
    {
    }
  >
  type AssignmentType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.AssignmentType<
    GetSchema<Fields>,
    Opts
  >
  type InitializedType<
    Fields extends foundry.data.fields.DataSchema,
    SubType extends ActiveEffect.SubType = ActiveEffect.SubType,
    Opts extends Options<GetSchema<Fields>> = DefaultOptions,
  > = fvttUtils.SimpleMerge<
    foundry.data.fields.SchemaField.Internal.InitializedType<
      GetSchema<Fields>,
      Opts
    >,
    {
      get effect(): ActiveEffect.OfType<SubType>
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

export default AppliedEffectField