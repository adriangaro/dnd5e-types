declare global {
  namespace dnd5e.types.fields {
    type SensesField = foundry.data.fields.SchemaField<{
      ranges: dnd5e.types.fields.MappingField<
        foundry.data.fields.NumberField<{ required: true; nullable: true; integer: true; min: 0; initial: null }>,
        dnd5e.types.Senses.TypeKey
      >;
      units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.MovementUnit.TypeKey, { required: true; nullable: true; blank: false; initial: null }>;
      special: foundry.data.fields.StringField<{ required: true }>;
    }>;
  }
}

/**
 * Field for storing senses data.
 */
declare class SensesField extends foundry.data.fields.SchemaField<{
  ranges: dnd5e.types.fields.MappingField<
    foundry.data.fields.NumberField<{ required: true; nullable: true; integer: true; min: 0; initial: null }>,
    dnd5e.types.Senses.TypeKey
  >;
  units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.MovementUnit.TypeKey, { required: true; nullable: true; blank: false; initial: null }>;
  special: foundry.data.fields.StringField<{ required: true }>;
}> {
  /**
   * Migrate senses into mapping field.
   * @param senses  Senses data object to shim.
   */
  static _migrate(senses?: dnd5e.types.data.shared.SensesData): void;

  /**
   * Apply shims to the senses field so old sense locations still work.
   * @param senses  Senses data object to shim.
   */
  static _shim(senses: dnd5e.types.data.shared.SensesData): void;
}

export default SensesField;
