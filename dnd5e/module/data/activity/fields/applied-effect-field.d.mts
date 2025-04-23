type _BaseFields = {
  _id: foundry.data.fields.DocumentIdField<{
    required: true,
    nullable: true
  }>
}

declare class AppliedEffectField<
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends AppliedEffectField.Options<
    Schema & _BaseFields
  > = AppliedEffectField.DefaultOptions,
  const AssignmentType = AppliedEffectField.AssignmentType<
    Schema & _BaseFields, Options
  >,
  const InitializedType = AppliedEffectField.InitializedType<
    Schema & _BaseFields, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = AppliedEffectField.PersistedType<
    Schema & _BaseFields, Options
    >
> extends foundry.data.fields.SchemaField<
  Schema & _BaseFields,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)
}


declare namespace AppliedEffectField {
  export import Options = foundry.data.fields.SchemaField.Options
  export import DefaultOptions = foundry.data.fields.SchemaField.DefaultOptions
  export import AssignmentType = foundry.data.fields.SchemaField.Internal.AssignmentType
  type InitializedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<Fields> = DefaultOptions,
  > = fvttUtils.Merge<
    foundry.data.fields.SchemaField.Internal.InitializedType<Fields, Opts>,
    {
      effect: fvttUtils.Defer<ActiveEffect.Implementation>
    }
  >
  export import PersistedType = foundry.data.fields.SchemaField.Internal.PersistedType
}

export default AppliedEffectField