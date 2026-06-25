declare global {
  namespace dnd5e.types.fields {
    type SimpleTraitField<
      Extra extends foundry.data.fields.DataSchema = {},
      Value extends string = string,
    > = foundry.data.fields.SchemaField<
      dnd5e.types.PrettifyType<SimpleTraitField.Base<Value> & Extra>
    >;
    namespace SimpleTraitField {
      interface Base<Value extends string = string> extends foundry.data.fields.DataSchema {
        value: foundry.data.fields.SetField<dnd5e.types.fields.RestrictedStringField<Value>, { initial: [] }>;
        custom: foundry.data.fields.StringField<{ required: true }>;
      }
    }
  }
}

/**
 * Field for storing standard trait data.
 */
declare class SimpleTraitField<
  Extra extends foundry.data.fields.DataSchema = {},
  Value extends string = string,
> extends foundry.data.fields.SchemaField<
  dnd5e.types.PrettifyType<dnd5e.types.fields.SimpleTraitField.Base<Value> & Extra>
> {}

export default SimpleTraitField;
