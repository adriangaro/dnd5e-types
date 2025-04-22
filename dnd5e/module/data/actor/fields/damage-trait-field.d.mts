import type SimpleTraitField from "./simple-trait-field.d.mts";

declare class DamageTraitField<
  TraitType extends string = dnd5e.types.Damage.TypeKey,
  BypassType extends string = dnd5e.types.Damage.Bypass,
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends DamageTraitField.Options<
    Schema,
    TraitType,
    BypassType
  > = DamageTraitField.DefaultOptions,
  const AssignmentType = DamageTraitField.AssignmentType<
    Schema, TraitType, BypassType, Options
  >,
  const InitializedType = DamageTraitField.InitializedType<
    Schema, TraitType, BypassType, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = DamageTraitField.PersistedType<
    Schema, TraitType, BypassType, Options
  >
> extends SimpleTraitField<
  TraitType,
  DamageTraitField.GetSchema<Schema, BypassType>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)
}

declare namespace DamageTraitField {
  type BaseFields<BypassType extends string> = {
    bypasses: foundry.data.fields.SetField<
      foundry.data.fields.StringField<{
        choices: BypassType[]
      }, BypassType, BypassType, BypassType>
    >
  }
  type GetSchema<
    Fields extends foundry.data.fields.DataSchema,
    BypassType extends string = string,
  > = fvttUtils.SimpleMerge<
    BaseFields<BypassType>,
    Fields
  >

  type Options<
    Fields extends foundry.data.fields.DataSchema,
    TraitType extends string = string,
    BypassType extends string = string
  > = fvttUtils.SimpleMerge<
    SimpleTraitField.Options<
      Fields,
      TraitType
    >,
    {
      initialBypasses?: BypassType[]
    }
  >;

  type DefaultOptions = fvttUtils.SimpleMerge<
    SimpleTraitField.DefaultOptions,
    {
      initialBypasses: []
    }
  >
  type AssignmentType<
    Fields extends foundry.data.fields.DataSchema,
    TraitType extends string,
    BypassType extends string,
    Opts extends Options<GetSchema<Fields, BypassType>, TraitType, BypassType> = DefaultOptions,
  > = SimpleTraitField.AssignmentType<
    GetSchema<Fields, BypassType>,
    TraitType,
    Opts
  >
  type InitializedType<
    Fields extends foundry.data.fields.DataSchema,
    TraitType extends string,
    BypassType extends string,
    Opts extends Options<GetSchema<Fields, BypassType>, TraitType, BypassType> = DefaultOptions,
  > = SimpleTraitField.InitializedType<
    GetSchema<Fields, BypassType>,
    TraitType,
    Opts
  >
  type PersistedType<
    Fields extends foundry.data.fields.DataSchema,
    TraitType extends string,
    BypassType extends string,
    Opts extends Options<GetSchema<Fields, BypassType>, TraitType, BypassType> = DefaultOptions,
  > = SimpleTraitField.PersistedType<
    GetSchema<Fields, BypassType>,
    TraitType,
    Opts
  >
}

export default DamageTraitField