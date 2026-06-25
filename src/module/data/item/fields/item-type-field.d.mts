/**
 * A field for storing Item type data.
 *
 * A `SchemaField` describing an item's category triple `{ value, subtype, baseItem }` (each a
 * blank-allowed StringField). The runtime constructor deletes `subtype`/`baseItem` when the option is
 * `false`; model that by passing a narrowed `Fields` set, e.g.
 *   ItemTypeField<Pick<dnd5e.types.fields.ItemTypeField.Schema, "value" | "baseItem">>  // subtype:false
 */

declare global {
  namespace dnd5e.types.fields {
    namespace ItemTypeField {
      interface Schema extends foundry.data.fields.DataSchema {
        value: foundry.data.fields.StringField<{ required: true; blank: true; initial: "" }>;
        subtype: foundry.data.fields.StringField<{ required: true; blank: true; initial: "" }>;
        baseItem: foundry.data.fields.StringField<{ required: true; blank: true; initial: "" }>;
      }
    }

    type ItemTypeField<Fields extends foundry.data.fields.DataSchema = dnd5e.types.fields.ItemTypeField.Schema> =
      foundry.data.fields.SchemaField<Fields>;
  }
}

/**
 * A field for storing Item type data.
 *
 * @param options              Options to configure this field's behavior.
 * @param options.value        An initial value for the Item's type.
 * @param options.subtype      An initial value for the Item's subtype, or false to exclude it.
 * @param options.baseItem     An initial value for the Item's baseItem, or false to exclude it.
 * @param schemaOptions        Options forwarded to the SchemaField.
 */
declare class ItemTypeField<Fields extends foundry.data.fields.DataSchema = dnd5e.types.fields.ItemTypeField.Schema>
  extends foundry.data.fields.SchemaField<Fields> {}

export { ItemTypeField };
export default ItemTypeField;
export {};
