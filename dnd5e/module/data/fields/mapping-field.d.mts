declare class MappingField<
  const ElementFieldType extends foundry.data.fields.DataField.Any,
  const TypeKey extends string = string,
  const Options extends MappingField.AnyOptions = MappingField.DefaultOptions<
    MappingField.AssignmentElementType<ElementFieldType>
  >,
  const AssignmentElementType = MappingField.AssignmentElementType<ElementFieldType>,
  const InitializedElementType = MappingField.InitializedElementType<ElementFieldType>,
  const AssignmentType = MappingField.AssignmentType<AssignmentElementType, TypeKey, Options>,
  const InitializedType = MappingField.InitializedType<AssignmentElementType, InitializedElementType, TypeKey, Options>,
  const PersistedElementType = MappingField.PersistedElementType<ElementFieldType>,
  const PersistedType extends Record<TypeKey, PersistedElementType> | null | undefined = MappingField.PersistedType<
    AssignmentElementType,
    PersistedElementType,
    TypeKey,
    Options
  >,
> extends foundry.data.fields.ObjectField<
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  model: ElementFieldType
  constructor(model: ElementFieldType, options: Options)

  _getInitialValueForKey(key: TypeKey, object: object): AssignmentElementType
  _validateValues(value: object, options: object): Record<string, Error>
}

declare namespace MappingField {
  type Options<
    AssignmentElementType,
    TypeKey extends string = string
  > = fvttUtils.SimpleMerge<
    foundry.data.fields.DataField.Options<BaseAssignmentType<AssignmentElementType, TypeKey>>,
    {
      initialKeys?: string[] | null,
      initialValue?: AssignmentElementType | null,
      initialKeysOnly?: boolean,
    }
  >;
  type AnyOptions = Options<unknown>;

  type BaseAssignmentType<
    AssignmentElementType,
    TypeKey extends string = string
  > =
    | Record<TypeKey, AssignmentElementType>

  type DefaultOptions<AssignmentElementType> = fvttUtils.SimpleMerge<
    foundry.data.fields.ObjectField.DefaultOptions,
    {
      initialKeys: null,
      initialValue: null,
      initialKeysOnly: false,
      initial: () => Record<string, AssignmentElementType>
    }
  >;

  type MergedOptions<AssignmentElementType, Opts extends AnyOptions> = fvttUtils.SimpleMerge<
    DefaultOptions<AssignmentElementType>,
    Opts
  >;

  type AssignmentElementType<ElementFieldType extends foundry.data.fields.DataField.Any> =
    ElementFieldType extends foundry.data.fields.DataField<infer _1, infer Assign, infer _2, infer _3>
    ? Assign
    : never;

  type InitializedElementType<ElementFieldType extends foundry.data.fields.DataField.Any> =
    ElementFieldType extends foundry.data.fields.DataField<infer _1, infer _2, infer Init, infer _3>
    ? Init
    : never;


  type PersistedElementType<ElementFieldType extends foundry.data.fields.DataField.Any> =
    ElementFieldType extends foundry.data.fields.DataField<infer _1, infer _2, infer _3, infer Persist>
    ? Persist
    : never;

  type AssignmentType<
    AssignmentElementType,
    TypeKey extends string = string,
    Opts extends AnyOptions = AnyOptions
  > = foundry.data.fields.DataField.DerivedAssignmentType<
    BaseAssignmentType<AssignmentElementType, TypeKey>,
    MergedOptions<AssignmentElementType, Opts>
  >;

  type InitializedType<
    AssignmentElementType,
    InitializedElementType,
    TypeKey extends string = string,
    Opts extends AnyOptions = AnyOptions
  > = foundry.data.fields.DataField.DerivedInitializedType<
    Record<TypeKey, InitializedElementType>,
    MergedOptions<AssignmentElementType, Opts>
  >;

  type PersistedType<
    AssignmentElementType,
    PersistedElementType,
    TypeKey extends string = string,
    Opts extends AnyOptions = AnyOptions
  > = foundry.data.fields.DataField.DerivedInitializedType<
    Record<TypeKey, PersistedElementType>,
    MergedOptions<AssignmentElementType, Opts>
  >
}

export default MappingField;