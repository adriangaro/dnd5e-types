/**
 * A field for storing Item type data.
 *
 */

declare class ItemTypeField<
  const Type extends Item.SubType,
  const FieldInitials extends {
    value?: string | false,
    subtype?: string | false,
    baseItem?: string | false
  } = {},
  const Options extends ItemTypeField.Options = ItemTypeField.DefaultOptions,
  const AssignmentType = ItemTypeField.AssignmentType<
    Type, FieldInitials, Options
  >,
  const InitializedType = ItemTypeField.InitializedType<
    Type, FieldInitials, Options
  >,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = ItemTypeField.PersistedType<
    Type, FieldInitials, Options
  >
> extends foundry.data.fields.SchemaField<
  ItemTypeField.Schema,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(options?: FieldInitials, schemaOptions?: Options)
}


declare type ItemType<Type extends Item.SubType, FieldInitials extends {
  value?: string | false,
  subtype?: string | false,
  baseItem?: string | false
} = {}> = {
  [K in Type]: {
    [K2 in dnd5e.types.ItemTypes.GetItemTypeKey<K>]: {
      value: K2,
      // dnd5e tends to have items/armor be derived from some base items while 
      // other things like consumables from config declaration, they effectively have the same signature
      // except one or the other is disabled, for typing one configures dnd5e.types.ItemTypes.ItemTypeMap
      subtype: dnd5e.types.IsExactly<dnd5e.types.GetKey<FieldInitials, 'subtype'>, false> extends true
      ? never
      : dnd5e.types.ItemTypes.GetItemSubTypeKey<K, K2>
      baseItem: dnd5e.types.IsExactly<dnd5e.types.GetKey<FieldInitials, 'baseItem'>, false> extends true
      ? never
      : dnd5e.types.ItemTypes.GetItemSubTypeKey<K, K2>
    }
  }[dnd5e.types.ItemTypes.GetItemTypeKey<K>]
}[Type]

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
    Type extends Item.SubType,
    FieldInitials extends {
      value?: string | false,
      subtype?: string | false,
      baseItem?: string | false
    } = {},
    Opts extends Options = DefaultOptions,
  > = foundry.data.fields.DataField.DerivedAssignmentType<
    ItemType<Type, FieldInitials>,
    Opts
  >

  type InitializedType<
    Type extends Item.SubType,
    FieldInitials extends {
      value?: string | false,
      subtype?: string | false,
      baseItem?: string | false
    } = {},
    Opts extends Options = DefaultOptions,
  > = foundry.data.fields.DataField.DerivedInitializedType<
    ItemType<Type, FieldInitials> & { 
      label: string 
      identifier: dnd5e.types.IsExactly<dnd5e.types.GetKey<FieldInitials, 'baseItem'>, false> extends true
      ? never
      : string
    },
    Opts
  >

  type PersistedType<
    Type extends Item.SubType,
    FieldInitials extends {
      value?: string | false,
      subtype?: string | false,
      baseItem?: string | false
    } = {},
    Opts extends Options = DefaultOptions,
  > = foundry.data.fields.DataField.DerivedAssignmentType<
    ItemType<Type, FieldInitials>,
    Opts
  >
}

export default ItemTypeField