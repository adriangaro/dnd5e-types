declare global {
  namespace dnd5e.types.fields {
    type ACFormulasField = foundry.data.fields.ArrayField<dnd5e.types.fields.ACFormulasField.Element>;
    namespace ACFormulasField {
      type Element = foundry.data.fields.SchemaField<{
        armored: foundry.data.fields.BooleanField<{ nullable: true; initial: null }>;
        formula: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
        label: foundry.data.fields.StringField;
        shielded: foundry.data.fields.BooleanField<{ nullable: true; initial: null }>;
      }>;
    }
  }
}

/**
 * Field for storing AC formulas with some special handling to cast string formulas to full objects.
 */
declare class ACFormulasField
  extends foundry.data.fields.ArrayField<dnd5e.types.fields.ACFormulasField.Element> {}

export default ACFormulasField;
