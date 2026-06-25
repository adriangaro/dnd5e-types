declare global {
  namespace dnd5e.types.fields {
    type CreatureTypeField = foundry.data.fields.SchemaField<{
      value: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Creature.TypeKey | "custom" | "", { blank: true }>;
      subtype: foundry.data.fields.StringField;
      swarm: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActorSize.TypeKey | "", { blank: true }>;
      custom: foundry.data.fields.StringField;
    }>;
  }
}

/**
 * Field for storing creature type data.
 */
declare class CreatureTypeField extends foundry.data.fields.SchemaField<{
  value: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Creature.TypeKey | "custom" | "", { blank: true }>;
  subtype: foundry.data.fields.StringField;
  swarm: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActorSize.TypeKey | "", { blank: true }>;
  custom: foundry.data.fields.StringField;
}> {}

export default CreatureTypeField;
