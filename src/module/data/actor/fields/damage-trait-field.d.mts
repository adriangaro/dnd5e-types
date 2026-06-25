import SimpleTraitField from "./simple-trait-field.mjs";

declare global {
  namespace dnd5e.types.fields {
    type DamageTraitField<Value extends string = string> = dnd5e.types.fields.SimpleTraitField<
      { bypasses: foundry.data.fields.SetField<foundry.data.fields.StringField> },
      Value
    >;
  }
}

/**
 * Field for storing damage resistances, immunities, and vulnerabilities data.
 */
declare class DamageTraitField<Value extends string = string>
  extends SimpleTraitField<
    { bypasses: foundry.data.fields.SetField<foundry.data.fields.StringField> },
    Value
  > {}

export default DamageTraitField;
