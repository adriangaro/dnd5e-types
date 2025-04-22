declare class MappingField<
  const ElementFieldType extends foundry.data.fields.DataField.Any,
  const KeyType extends string = string,
  const Options extends MappingField.AnyOptions = MappingField.DefaultOptions<
    MappingField.AssignmentElementType<ElementFieldType>
  >,
  const AssignmentElementType = MappingField.AssignmentElementType<ElementFieldType>,
  const InitializedElementType = MappingField.InitializedElementType<ElementFieldType>,
  const AssignmentType = MappingField.AssignmentType<AssignmentElementType, KeyType, Options>,
  const InitializedType = MappingField.InitializedType<AssignmentElementType, InitializedElementType, KeyType, Options>,
  const PersistedElementType = MappingField.PersistedElementType<ElementFieldType>,
  const PersistedType extends Record<KeyType, PersistedElementType> | null | undefined = MappingField.PersistedType<
    AssignmentElementType,
    PersistedElementType,
    KeyType,
    Options
  >,
> extends foundry.data.fields.ObjectField<
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  model: ElementFieldType
  _getInitialValueForKey(key: KeyType, object: object): AssignmentElementType
  _validateValues(value: object, options: object): Record<string, Error>
}

declare namespace MappingField {
  type Options<
    AssignmentElementType,
    KeyType extends string = string
  > = fvttUtils.SimpleMerge<
    foundry.data.fields.DataField.Options<BaseAssignmentType<AssignmentElementType, KeyType>>,
    {
      initialKeys?: string[] | null,
      initialValue?: AssignmentElementType | null,
      initialKeysOnly?: boolean,
    }
  >;
  type AnyOptions = Options<unknown>;

  type BaseAssignmentType<
    AssignmentElementType,
    KeyType extends string = string
  > =
    | Record<KeyType, AssignmentElementType>

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
    KeyType extends string = string,
    Opts extends AnyOptions = AnyOptions
  > = foundry.data.fields.DataField.DerivedAssignmentType<
    BaseAssignmentType<AssignmentElementType, KeyType>,
    MergedOptions<AssignmentElementType, Opts>
  >;

  type InitializedType<
    AssignmentElementType,
    InitializedElementType,
    KeyType extends string = string,
    Opts extends AnyOptions = AnyOptions
  > = foundry.data.fields.DataField.DerivedInitializedType<
    Record<KeyType, InitializedElementType>,
    MergedOptions<AssignmentElementType, Opts>
  >;

  type PersistedType<
    AssignmentElementType,
    PersistedElementType,
    KeyType extends string = string,
    Opts extends AnyOptions = AnyOptions
  > = foundry.data.fields.DataField.DerivedInitializedType<
    Record<KeyType, PersistedElementType>,
    MergedOptions<AssignmentElementType, Opts>
  >
}

export default MappingField;