declare class SimpleTraitField<
  TraitType extends string = string,
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends SimpleTraitField.Options<
    Schema,
    TraitType
  > = SimpleTraitField.DefaultOptions,
  const AssignmentType = SimpleTraitField.AssignmentType<
    Schema, TraitType, Options
  >,
  const InitializedType = SimpleTraitField.InitializedType<
    Schema, TraitType, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = SimpleTraitField.PersistedType<
    Schema, TraitType, Options
  >
> extends foundry.data.fields.SchemaField<
  SimpleTraitField.GetSchema<Schema, TraitType>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)
}

declare namespace SimpleTraitField {
  type BaseFields<TraitType extends string = string> = {
    value: foundry.data.fields.SetField<
      foundry.data.fields.StringField<{
        choices: TraitType[]
      }, TraitType, TraitType, TraitType>
    >,
    custom: foundry.data.fields.StringField<{
      required: true
    }>
  }
  type GetSchema<
    Fields extends foundry.data.fields.DataSchema,
    TraitType extends string = string,
  > = fvttUtils.SimpleMerge<
    BaseFields<TraitType>,
    Fields
  >

  type Options<
    Fields extends foundry.data.fields.DataSchema,
    TraitType extends string = string,
  > = fvttUtils.SimpleMerge<
    foundry.data.fields.SchemaField.Options<
      GetSchema<Fields, TraitType>
    >,
    {
      initialValue?: TraitType[]
    }
  >;

  type DefaultOptions = fvttUtils.SimpleMerge<
    foundry.data.fields.SchemaField.DefaultOptions,
    {
      initialUnits: []
    }
  >
  type AssignmentType<
    Fields extends foundry.data.fields.DataSchema,
    TraitType extends string,
    Opts extends Options<GetSchema<Fields, TraitType>> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.AssignmentType<
    GetSchema<Fields, TraitType>,
    Opts
  >
  type InitializedType<
    Fields extends foundry.data.fields.DataSchema,
    TraitType extends string,
    Opts extends Options<GetSchema<Fields, TraitType>> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.InitializedType<
    GetSchema<Fields, TraitType>,
    Opts
  >
  type PersistedType<
    Fields extends foundry.data.fields.DataSchema,
    TraitType extends string,
    Opts extends Options<GetSchema<Fields, TraitType>> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.PersistedType<
    GetSchema<Fields, TraitType>,
    Opts
  >
}

export default SimpleTraitField