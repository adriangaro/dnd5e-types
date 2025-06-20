declare class SourceField<
  Schema extends foundry.data.fields.DataSchema = {},
  const Options extends SourceField.Options<
    Schema
  > = SourceField.DefaultOptions,
  const AssignmentType = SourceField.AssignmentType<
    Schema, Options
  >,
  const InitializedType = SourceField.InitializedType<
    Schema, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = SourceField.PersistedType<
    Schema, Options
  >
> extends foundry.data.fields.SchemaField<
  SourceField.GetSchema<Schema>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(fields?: { [K in keyof Schema]: Schema[K] }, options?: Options)

  /**
   * Prepare the source data.
   * @param uuid  Compendium source or document UUID.
   */
  static prepareData(uuid: string): void

  /**
   * Get the module book.
   * @param pkg  Module package.
   */
  static getModuleBook(pkg: ReadyGame['world'] | ReadyGame['system'] | Module | null): string | null

  /**
   * Get the package associated with the given UUID, if any.
   * @param uuidOrCollection  The document UUID or its collection.
   */
  static getPackage(uuidOrCollection: string | foundry.documents.collections.CompendiumCollection<any>): ReadyGame['world'] | ReadyGame['system'] | Module | null
}

declare namespace SourceField {
  export type BaseFields = {
    book: foundry.data.fields.StringField,
    page: foundry.data.fields.StringField,
    custom: foundry.data.fields.StringField,
    license: foundry.data.fields.StringField,
    revision: foundry.data.fields.NumberField<{ initial: 1 }>,
    rules: foundry.data.fields.StringField<{ initial: "2024" }>,
  }

  export type GetSchema<
    Fields extends foundry.data.fields.DataSchema,
  > = dnd5e.types.FilterNever<fvttUtils.SimpleMerge<
    BaseFields,
    Fields
  >>

  export type Options<
    Fields extends foundry.data.fields.DataSchema,
  > = foundry.data.fields.SchemaField.Options<
    GetSchema<Fields>
  >

  export import DefaultOptions = foundry.data.fields.SchemaField.DefaultOptions

  type MergedOptions<
    Fields extends foundry.data.fields.DataSchema, Opts extends Options<GetSchema<Fields>>
  > = fvttUtils.SimpleMerge<DefaultOptions, Opts>;

  export type AssignmentType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<Fields> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.AssignmentType<
    GetSchema<Fields>,
    MergedOptions<Fields, Opts>
  >

  export type InitializedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<Fields> = DefaultOptions,
  > = fvttUtils.Merge<
    foundry.data.fields.SchemaField.Internal.InitializedType<
      GetSchema<Fields>,
      MergedOptions<Fields, Opts>
    >,
    {
      bookPlaceholder: string,
      book: string,
      label: string,
      value: string,
      slug: string,
      get directlyEditable(): boolean
    }
  >

  export type PersistedType<
    Fields extends foundry.data.fields.DataSchema,
    Opts extends Options<Fields> = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.PersistedType<
    GetSchema<Fields>,
    MergedOptions<Fields, Opts>
  >
}

export default SourceField