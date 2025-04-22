/**
 * A field for storing Item type data.
 *
 */

declare class ItemTypeField<
  const Options extends ItemTypeField.Options = ItemTypeField.DefaultOptions,
  const AssignmentType = ItemTypeField.AssignmentType<
    Options
  >,
  const InitializedType = ItemTypeField.InitializedType<
    Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = ItemTypeField.PersistedType<
    Options
  >
> extends foundry.data.fields.SchemaField<
  ItemTypeField.Schema,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(options?: {
    value?: string,
    subtype?: string,
    baseItem?: string
  }, schemaOptions?: Options)
}

declare namespace ItemTypeField {
  type Schema = {
    value: foundry.data.fields.StringField<{
      required: true, blank: true, initial: string, label: "DND5E.Type"
    }>,
    subtype: foundry.data.fields.StringField<{
      required: true, blank: true, initial: string, label: "DND5E.Subtype"
    }>,
    baseItem: foundry.data.fields.StringField<{
      required: true, blank: true, initial: string, label: "DND5E.BaseItem"
    }>
  }

  type Options = fvttUtils.SimpleMerge<
    foundry.data.fields.SchemaField.Options<Schema>,
    {
    }
  >;

  type DefaultOptions = fvttUtils.SimpleMerge<
    foundry.data.fields.SchemaField.DefaultOptions,
    {
    }
  >

  type AssignmentType<
    Opts extends Options = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.AssignmentType<
    Schema,
    Opts
  >

  type InitializedType<
    Opts extends Options = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.InitializedType<
    Schema,
    Opts
  >

  type PersistedType<
    Opts extends Options = DefaultOptions,
  > = foundry.data.fields.SchemaField.Internal.PersistedType<
  Schema,
    Opts
  >
}

export default ItemTypeField