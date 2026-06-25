declare global {
  namespace dnd5e.types.fields {
    /**
     * The per-type speed keys are keyed by {@link dnd5e.types.Movement.TypeKey} (the Seam-A config
     * union), NOT a hardcoded literal list, so consumers who add a movement type via
     * `dnd5e.types.Movement.OverrideTypes` automatically get `movement.<theirType>`. With no consumer
     * expansion `Movement.TypeKey` is exactly `walk | burrow | climb | fly | swim`, so the default
     * schema is identical to the runtime's hardcoded spread — faithful AND expandable (mirrors how the
     * runtime field's `...fields` injection point + the `movementTypes` config domain compose).
     */
    type MovementField = foundry.data.fields.SchemaField<
      {
        [K in dnd5e.types.Movement.TypeKey]: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
      } & {
        bonus: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
        special: foundry.data.fields.StringField;
        units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.MovementUnit.TypeKey, { required: true; nullable: true; blank: false; initial: null }>;
        hover: foundry.data.fields.BooleanField<{ required: true }>;
        ignoredDifficultTerrain: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.Movement.TypeKey, { required: true; blank: false }>
        >;
      }
    >;
  }
}

/**
 * Field for storing movement data.
 */
declare class MovementField extends foundry.data.fields.SchemaField<
  {
    [K in dnd5e.types.Movement.TypeKey]: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
  } & {
    bonus: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
    special: foundry.data.fields.StringField;
    units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.MovementUnit.TypeKey, { required: true; nullable: true; blank: false; initial: null }>;
    hover: foundry.data.fields.BooleanField<{ required: true }>;
    ignoredDifficultTerrain: foundry.data.fields.SetField<
      dnd5e.types.fields.RestrictedStringField<dnd5e.types.Movement.TypeKey, { required: true; blank: false }>
    >;
  }
> {}

export default MovementField;
